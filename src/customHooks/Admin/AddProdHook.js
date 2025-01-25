import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllCategory } from '../../redux/action/categoryAction'
import { getSubcateOnCategory } from '../../redux/action/subCategoryAction'
import { createProduct } from '../../redux/action/productAction'
import Notification from '../useNotification'
import Joi from 'joi'

const AddProdHook = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory())
    }, []);


    // get all category
    const category = useSelector(state => state.categoryReducer.allCategory);
    console.log('category', category)
    // get all category
    const product = useSelector(state => state.allProduct.product);
    console.log(product)
    // get all brands
    // const brand = useSelector(state => state.categoryReducer.category);
    const crop = {
        unit: '%',
        aspect: 4 / 3,
        width: '100',
    }

    // set loading
    const [loading, setLoading] = useState();


    const [productImages, setProductImages] = useState([]);
    const [prodName, setProdName] = useState('');
    const [desc, setDesc] = useState('');
    const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
    const [Qty, setQty] = useState(1);
    const [cateID, setCateID] = useState('Category');
    const [subCat, setSubCat] = useState([]);
    const [selectedSubCat, setSelectedSubCat] = useState([]);
    const [brandID, setBrandID] = useState('');
    // hide show color picker state 
    const [showColor, setShowColor] = useState(false);
    const [errors, setErrors] = useState({});


    // to store color selected 
    const [colors, setColors] = useState([])

    // Joi Schema for Validation
    const schema = Joi.object({
        prodName: Joi.string().min(2).max(50).required().messages({
            'string.empty': 'Product name is required',
            'string.min': 'Product name must be at least 2 characters',
            'string.max': 'Product name must be less than 50 characters',
        }),
        desc: Joi.string().min(10).required().messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 10 characters',
        }),
        priceBeforeDiscount: Joi.number().positive().required().messages({
            'number.base': 'Price must be a valid number',
            'number.positive': 'Price must be greater than 0',
            'any.required': 'Price before discount is required',
        }),
        priceAfterDiscount: Joi.number().min(0).allow('').messages({
            'number.base': 'Discounted price must be a valid number',
            'number.min': 'Discounted price cannot be negative',
        }),
        Qty: Joi.number().integer().min(1).required().messages({
            'number.base': 'Quantity must be a number',
            'number.integer': 'Quantity must be an integer',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required',
        }),
        cateID: Joi.string().invalid('Category').required().messages({
            'any.invalid': 'Please select a valid category',
            'any.required': 'Category is required',
        }),
        colors: Joi.array().min(1).messages({
            'array.min': 'At least one color must be selected',
        }),
        productImages: Joi.array().min(1).messages({
            'array.min': 'At least one image is required',
        }),
    });

    // Handle field changes and validate live
    const handleChange = (field, value) => {
        if (field === 'colors') {
            setColors([...colors, value]);
        } else {
            switch (field) {
                case 'prodName': setProdName(value); break;
                case 'desc': setDesc(value); break;
                case 'priceBeforeDiscount': setPriceBeforeDiscount(value); break;
                case 'priceAfterDiscount': setPriceAfterDiscount(value); break;
                case 'Qty': setQty(value); break;
                case 'cateID': setCateID(value); break;
                default: break;
            }
        }


        // Validate live
        const obj = { prodName, desc, priceBeforeDiscount, priceAfterDiscount, Qty, cateID, colors, productImages, [field]: value };
        const { error } = schema.validate(obj, { abortEarly: false });

        if (error) {
            const errorMessages = {};
            error.details.forEach(err => errorMessages[err.path[0]] = err.message);
            setErrors(errorMessages);
        } else {
            setErrors({});
        }
    };
    // Handle Product Name
    const handelName = (e) => {
        setProdName(e.target.value);
    }

    // Handle Product Description
    const handelDesc = (e) => {
        setDesc(e.target.value);
    }

    // Handle Product Price Before Discount
    const handelProductPriceBeforeDiscount = (e) => {
        setPriceBeforeDiscount(e.target.value);
    }


    // Handle Product Price After Discount
    const handelProductPriceAfterDiscount = (e) => {
        setPriceAfterDiscount(e.target.value);
    }


    // Handle Product handelQuantityInStock
    const handelQuantityInStock = (e) => {
        setQty(e.target.value);
    }


    // Handle select category 
    const handelSelectCate = (e) => {
        // if (e.target.value != 0) {
        //     dispatch(getSubcateOnCategory(e.target.value))

        // }
        setCateID(e.target.value);
    }

    // hide show color picker handler
    const handelShowHidePicker = () => {
        setShowColor(!showColor);
    }

    // get color selected handler
    const handelChangeComplete = (selectedColor) => {
        setColors([...colors, selectedColor.hex])
        setShowColor(!showColor)
    }

    const removeColor = (color) => {
        const newColors = colors.filter((e) => e !== color);
        setColors(newColors)

    }

    // to convert base 64 to file
    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }




    // handle submit data sending to DB
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        setErrors({})

        // Final validation before submission
        const obj = { prodName, desc, priceBeforeDiscount, priceAfterDiscount, Qty, cateID, colors, productImages };
        const { error } = schema.validate(obj, { abortEarly: false });

        if (error) {
            const errorMessages = {};
            error.details.forEach(err => errorMessages[err.path[0]] = err.message);
            setErrors(errorMessages);
            Notification('Validation failed. Please check the form.', 'error');
            setLoading(false);
            return;
        }

        //  image convert it to base file
        const imgBase64ToFile = dataURLtoFile(productImages[0], Math.random() + '.jpeg');
        // make array of images and convert it to base file
        const imagesItems = Array.from(Array(Object.keys(productImages).length).keys()).map(
            (item, index) => {
                return dataURLtoFile(productImages[index], Math.random() + '.jpeg');
            }
        );

        const formData = new FormData();
        formData.append('name', prodName);
        formData.append("desc", desc);
        formData.append("quantity", Qty);
        formData.append("priceAfterDiscount", priceAfterDiscount);
        formData.append("price", priceBeforeDiscount);
        formData.append("category", cateID);
        colors.map((item) => formData.append("colors", item));
        imagesItems.map((img) => formData.append("images", img));
        formData.append("imageCover", imgBase64ToFile);

        setLoading(true);
        await dispatch(createProduct(formData));
        setLoading(false);

    }
    useEffect(() => {
        if (loading === false) {

            if (product && product.status === 201) {
                Notification('Add Product Is Done Successfully..', 'success')
                setProdName('');
                setDesc('');
                setPriceAfterDiscount();
                setPriceBeforeDiscount();
                setProductImages([])
                setColors([])
                setCateID('category')
                setQty(1)

            }
            else {
                Notification(product?.message || 'Error adding product', 'error');

            }

            setLoading(false)
        }
    }, [loading]
    )

    console.log(errors)
    return [

        productImages,
        setProductImages,
        crop,
        setCateID,
        handelName, prodName,
        handelDesc, desc,
        handelProductPriceBeforeDiscount,
        handelProductPriceAfterDiscount,
        priceAfterDiscount,
        Qty,
        handelSelectCate,
        removeColor,
        colors,
        cateID,
        handelQuantityInStock,
        priceBeforeDiscount,
        category,
        showColor,
        handelChangeComplete,
        handleSubmit,
        handelShowHidePicker,
        errors,
        handleChange,
        loading

    ];

}

export default AddProdHook
