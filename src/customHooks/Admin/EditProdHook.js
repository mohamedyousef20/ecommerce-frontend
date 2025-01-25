import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllCategory } from '../../redux/action/categoryAction'
import { getSubcateOnCategory } from '../../redux/action/subCategoryAction'
import { createProduct, getOneProduct, updateProduct } from '../../redux/action/productAction'
import Notification from '../useNotification'
import { useParams } from 'react-router-dom'
import { getAllBrand } from '../../redux/action/brandAction'
import Joi from 'joi'
const EditProdHook = (id) => {

    const dispatch = useDispatch();


    const productSchema = Joi.object({
        prodName: Joi.string().min(3).max(100).required().messages({
            "string.empty": "Product name is required.",
            "string.min": "Product name should be at least 3 characters.",
            "string.max": "Product name should not exceed 100 characters."
        }),
        desc: Joi.string().min(10).max(1000).required().messages({
            "string.empty": "Description is required.",
            "string.min": "Description should be at least 10 characters.",
            "string.max": "Description should not exceed 1000 characters."
        }),
        priceBeforeDiscount: Joi.number().positive().required().messages({
            "number.base": "Price Before Discount must be a number.",
            "number.positive": "Price Before Discount must be a positive number.",
            "any.required": "Price Before Discount is required."
        }),
        priceAfterDiscount: Joi.number().min(0).optional().messages({
            "number.base": "Price After Discount must be a number.",
            "number.min": "Price After Discount cannot be negative."
        }),
        Qty: Joi.number().integer().positive().required().messages({
            "number.base": "Quantity must be a number.",
            "number.integer": "Quantity must be an integer.",
            "number.positive": "Quantity must be greater than zero.",
            "any.required": "Quantity is required."
        }),
        cateID: Joi.string().required().messages({
            "string.empty": "Please select a valid category."
        }),
        brandID: Joi.string().required().messages({
            "string.empty": "Please select a brand."
        }),
        colors: Joi.array().min(1).required().messages({
            "array.min": "Please select at least one color."
        }),
        productImages: Joi.array().min(1).required().messages({
            "array.min": "At least one product image is required."
        }),
    });


    useEffect(() => {
        const runFunc = async () => {
            await dispatch(getOneProduct(id))
            await dispatch(getAllCategory())
            await dispatch(getAllBrand())
        }
        runFunc();
    }, []);


    // get one product
    const product = useSelector((state) => state.allProduct.oneProduct);
    // get all category
    const category = useSelector(state => state.categoryReducer.allCategory);
    // get all brand
    const brand = useSelector(state => state.brandReducer.allBrand);
    // get all category

    console.log('product comeing ', product)
    // set loading
    const [loading, setLoading] = useState();


    const [productImages, setProductImages] = useState([])
    const [prodName, setProdName] = useState('');
    const [desc, setDesc] = useState('');
    const [priceBeforeDiscount, setPriceBeforeDiscount] = useState();
    const [priceAfterDiscount, setPriceAfterDiscount] = useState();
    const [Qty, setQty] = useState();
    const [cateID, setCateID] = useState('Category');
    const [subCat, setSubCat] = useState([]);
    const [selectedSubCat, setSelectedSubCat] = useState([]);
    const [brandID, setBrandID] = useState('');
    // hide show color picker state 
    const [showColor, setShowColor] = useState(false)

    // to store color selected 
    const [colors, setColors] = useState([])
    console.log('productimages ', productImages)

    useEffect(() => {
        if (product) {
            const existingImages = product.images ? product.images.map(img => img.url) : [];
            setProductImages(existingImages);
            setProdName(product.name || '');
            setDesc(product.desc || '');
            setPriceBeforeDiscount(product.price || 0);
            setPriceAfterDiscount(product.priceAfterDiscount || 0);
            setQty(product.quantity || 1);
            setCateID(product.category || '');
            setColors(product.colors || []);
            setBrandID(product.brand || '');
        }
    }, [product]);


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
    const handleBrandChange = (e) => {
        setBrandID(e.target.value);
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

    // Helper to check if string is base64
    const isBase64Image = (str) => {
        return str && str.startsWith('data:image');
    };

    // Convert single cover image to file
    const convertImageToFile = (dataUrl, fileName) => {
        try {
            const arr = dataUrl.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], fileName, { type: mime });
        } catch (error) {
            console.error('Error converting image:', error);
            return null;
        }
    };

    const handleImageChange = (images) => {
        setProductImages((prevImages) => [...prevImages, ...images]);
    };

    console.log('####',productImages)
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { error } = productSchema.validate({
            prodName,
            desc,
            priceBeforeDiscount,
            priceAfterDiscount,
            Qty,
            cateID,
            brandID,
            colors,
            productImages,
        });

        if (error) {
            error.details.forEach((err) => Notification(err.message, "error"));
            return;
        }

        try {
            setLoading(true);

            // Convert cover image only if it's base64
            const imgBase64ToFile = productImages[0] ? 
                (isBase64Image(productImages[0]) ? 
                    convertImageToFile(productImages[0], `cover-${Date.now()}.jpeg`) : 
                    productImages[0]) : 
                null;

            // Convert only base64 images in the array, keep URLs as they are
            const imagesItems = productImages.length > 0 ? 
                productImages.map((image, index) => 
                    isBase64Image(image) ? 
                        convertImageToFile(image, `image-${Date.now()}-${index}.jpeg`) : 
                        image
                ).filter(item => item !== null) : [];

            const formData = new FormData();
            formData.append("name", prodName);
            formData.append("desc", desc);
            formData.append("quantity", Qty);
            formData.append("price", priceBeforeDiscount);
            formData.append("priceAfterDiscount", priceAfterDiscount || '');
            formData.append("category", cateID);
            formData.append("brand", brandID);
            
            // Append colors as JSON string
            if (colors.length > 0) {
                formData.append("colors", JSON.stringify(colors));
            }

            // Handle cover image
            if (imgBase64ToFile) {
                if (typeof imgBase64ToFile === 'string' && imgBase64ToFile.startsWith('http')) {
                    // It's a URL, send it as is
                    formData.append("existingImageCover", imgBase64ToFile);
                } else {
                    // It's a File object
                    formData.append("imageCover", imgBase64ToFile);
                }
            }

            // Handle additional images
            imagesItems.forEach((image, index) => {
                if (typeof image === 'string' && image.startsWith('http')) {
                    // It's a URL, send as existing image
                    formData.append(`existingImages[${index}]`, image);
                } else {
                    // It's a File object
                    formData.append("images", image);
                }
            });

         

            const res = await dispatch(updateProduct(id, formData));
            
            if (res && res.status === 200) {
                Notification("Product updated successfully", "success");
            } else {
                Notification("Error updating product", "error");
            }
        } catch (err) {
            console.error('Error updating product:', err);
            Notification(err.message || "Error updating product", "error");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (loading === false) {
            setProdName('');
            setDesc('');
            setPriceBeforeDiscount(0);
            setPriceAfterDiscount(0);
            setPriceBeforeDiscount(0);
            setColors([])
            setCateID('')
            setQty(1)
            setTimeout(() => {
                setLoading(true)
            }, 1000);

            if (product) {

                Notification('Update Product Is Done Successfully..', 'success')

            }
            else {
                Notification('Something Went Wrong , Check Internet Connection ', 'error')

            }

        }
    }, [loading]
    )

    console.log(category)
    return [
        productImages,
        setProductImages,
        handelName,
        prodName,
        handelDesc,
        desc,
        handelProductPriceBeforeDiscount,
        handelProductPriceAfterDiscount,
        priceAfterDiscount,
        Qty,
        handelSelectCate,
        removeColor,
        colors,
        cateID,
        setCateID,
        brand,
        brandID,
        setBrandID,
        handleBrandChange,
        handelQuantityInStock,
        priceBeforeDiscount,
        category,
        showColor,
        handelChangeComplete,
        handleSubmit,
        handelShowHidePicker



    ];

}

export default EditProdHook
