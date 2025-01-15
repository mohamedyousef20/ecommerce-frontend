import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getAllCategory } from '../../redux/action/categoryAction'
import { getSubcateOnCategory } from '../../redux/action/subCategoryAction'
import { createProduct, getOneProduct, updateProduct } from '../../redux/action/productAction'
import Notification from '../useNotification'
import { useParams } from 'react-router-dom'

const EditProdHook = (id) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const runFunc = async () => {
            await dispatch(getOneProduct(id))
            await dispatch(getAllCategory())
        }
        runFunc();
    }, []);


    // get one product
    const product = useSelector((state) => state.allProduct.oneProduct);
    console.log(product)
    // get all category
    const category = useSelector(state => state.categoryReducer.category);

    // get all category
    // const brand = useSelector(state => state.categoryReducer.category);


    // set loading
    const [loading, setLoading] = useState(true);


    const [productImages, setProductImages] = useState({})
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

    useEffect(() => {
        if (product) {
            setProductImages(product.image)
            setProdName(product.name);
            setDesc(product.desc);
            setPriceBeforeDiscount(product.price);
            setPriceAfterDiscount(product.priceAfterDiscount);
            setQty(product.quantity);
            setCateID(product.category);
            setColors(product.colors);
        }
    }, [product])


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

    //to convert base 64 to file
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

        // ##@@TODO MAKE A VALIDATION ON THE FORM
        // make a validation on the array
        // ##@@TODO MAKE A VALIDATION ON THE FORM

        //  image convert it to base file
        const imgBase64ToFile = dataURLtoFile(productImages[0], Math.random() + '.jpeg');
        // make array of images and convert it to base file
        const imagesItems = Array.from(Array(Object.keys(productImages).length).keys()).map(
            (item, index) => {
                return dataURLtoFile(productImages[index], Math.random() + '.jpeg');

            }
        )

        const formData = new FormData();

        formData.append('name', prodName);
        formData.append("desc", desc)
        formData.append("quantity", Qty)
        formData.append("priceAfterDiscount", priceAfterDiscount)
        formData.append("price", priceBeforeDiscount)
        colors.map((item) => formData.append("colors", item))

        imagesItems.map((img) => formData.append("image", img))

        formData.append("imageCover", imgBase64ToFile)
        // formData.append("category", cateID)
        // formData.append("subCategory",images[0])
        // formData.append("brand",images[0])
        setLoading(true)
        await dispatch(updateProduct(id, formData))
        setLoading(false)


    }


    // useEffect(() => {
    //     if (loading === false) {
    //         setProdName('');
    //         setDesc('');
    //         setPriceBeforeDiscount(0);
    //         setPriceAfterDiscount(0);
    //         setPriceBeforeDiscount(0);
    //         setColors([])
    //         setCateID('')
    //         setQty(1)
    //         setTimeout(() => {
    //             setLoading(true)
    //         }, 1000);

    //         console.log(product)
    //         if (product) {

    //             Notification('Update Product Is Done Successfully..', 'success')

    //         }
    //         else {
    //             Notification('Something Went Wrong , Check Internet Connection ', 'error')

    //         }

    //     }
    // }, [loading]
    // )


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
