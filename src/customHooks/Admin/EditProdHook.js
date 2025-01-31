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
    const product = useSelector((state) => state.productReducer.oneProduct);
    // get all category
    const category = useSelector(state => state.categoryReducer.allCategory);
    // get all brand
    const brand = useSelector(state => state.brandReducer.allBrand);
    // get all category

    // console.log('product comeing ', product)
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
    // console.log('productimages ', productImages)
    useEffect(() => {
        if (product) {
            
            const existingImages = product.images ?
                product.images.map(img => img.url) : [];

            setProductImages(existingImages);
            setProdName(product.name || '');
            setDesc(product.desc || '');
            setPriceBeforeDiscount(product.price || 0);
            setPriceAfterDiscount(product.priceAfterDiscount || 0);
            setQty(product.quantity || 1);
            setCateID(product.category || '');
            setColors(product.colors || []);
            setBrandID(product.brand || '');
            // console.log('existingImages', existingImages)
            

        }
    }, [product]);

    // console.log('productImages',productImages)
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

    // Helper function to check if string is base64 image
    const isBase64Image = (str) => {

        // Check if it's a data URL
        if (!str.startsWith('data:image/')) return false;

        // Check if it has the base64 marker
        if (!str.includes(';base64,')) return false;

        try {
            // Get the base64 content after the marker
            const base64Content = str.split(';base64,')[1];
            // Try to decode it - if it fails, it's not valid base64
            window.atob(base64Content);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleImageChange = (newImages) => {
        // If newImages is a FileList or from input event, convert to array of Files
        if (newImages.target && newImages.target.files) {
            const filesArray = Array.from(newImages.target.files);
            setProductImages((prevImages) => [...prevImages, ...filesArray]);
            return;
        }

        // If newImages is a string (URL or comma-separated URLs)
        if (typeof newImages === 'string') {
            const urls = newImages.split(',').map(url => url.trim());
            setProductImages((prevImages) => {
                const uniqueUrls = urls.filter(url => !prevImages.includes(url));
                return [...prevImages, ...uniqueUrls];
            });
            return;
        }

        // If newImages is an array, process each image
        if (Array.isArray(newImages)) {
            setProductImages((prevImages) => {
                // Filter out any duplicate images by comparing URLs
                const uniqueNewImages = newImages.filter(newImg => {
                    // If the new image is a File object or base64, it's always unique
                    if (newImg instanceof File || isBase64Image(newImg)) {
                        return true;
                    }
                    // For URLs, check if it already exists in prevImages
                    return !prevImages.includes(newImg);
                });

                return [...prevImages, ...uniqueNewImages];
            });
        }
    };

    // console.log('####', brandID)


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

            const formData = new FormData();
            
            // Add all form fields
            formData.append("name", prodName);
            formData.append("desc", desc);
            formData.append("quantity", Qty);
            formData.append("price", priceBeforeDiscount);
            formData.append("priceAfterDiscount", priceAfterDiscount || '');
            formData.append("category", cateID);
            formData.append("brand", brandID);

            console.log('========== FORM DATA DETAILS ==========');
            console.log('Product Name:', prodName);
            console.log('Description:', desc);
            console.log('Quantity:', Qty);
            console.log('Price Before Discount:', priceBeforeDiscount);
            console.log('Price After Discount:', priceAfterDiscount);
            console.log('Category ID:', cateID);
            console.log('Brand ID:', brandID);
            console.log('Colors:', colors);
            console.log('=====================================');

            // Handle images
            console.log('========== IMAGES DETAILS ==========');
            console.log('Total Images:', productImages.length);
            
            productImages.forEach((image, index) => {
                console.log(`\nProcessing Image ${index + 1}:`);
                if (image instanceof File) {
                    console.log(`Type: File`);
                    console.log(`Name: ${image.name}`);
                    console.log(`Size: ${(image.size / 1024).toFixed(2)} KB`);
                    console.log(`Type: ${image.type}`);
                    formData.append("images", image);
                } else if (isBase64Image(image)) {
                    console.log(`Type: Base64 Image`);
                    const imageFile = convertImageToFile(image, `image-${Date.now()}-${index}.jpeg`);
                    if (imageFile) {
                        console.log(`Converted to File: ${imageFile.name}`);
                        console.log(`Size: ${(imageFile.size / 1024).toFixed(2)} KB`);
                        formData.append("images", imageFile);
                    }
                } else if (typeof image === 'string' && !isBase64Image(image)) {
                    console.log(`Type: URL`);
                    console.log(`URL: ${image}`);
                    formData.append("images", image);
                }
            });

            // Handle cover image
            if (productImages[0]) {
                console.log('\n========== COVER IMAGE DETAILS ==========');
                const coverImage = productImages[0];
                console.log('Cover Image Type:', coverImage instanceof File ? 'File' : 
                                              isBase64Image(coverImage) ? 'Base64' : 'URL');
                
                if (coverImage instanceof File) {
                    console.log('Cover Image Name:', coverImage.name);
                    console.log('Size:', (coverImage.size / 1024).toFixed(2), 'KB');
                    formData.append("imageCover", coverImage);
                } else if (isBase64Image(coverImage)) {
                    const coverFile = convertImageToFile(coverImage, `cover-${Date.now()}.jpeg`);
                    if (coverFile) {
                        console.log('Converted Cover Image Name:', coverFile.name);
                        console.log('Size:', (coverFile.size / 1024).toFixed(2), 'KB');
                        formData.append("imageCover", coverFile);
                    }
                } else if (typeof coverImage === 'string') {
                    console.log('Cover Image URL:', coverImage);
                    formData.append("imageCover", coverImage);
                }
            }

            // Append colors
            if (colors.length > 0) {
                formData.append("colors", colors);
            }

            console.log('\n========== FINAL FORM DATA CONTENTS ==========');
            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: File - ${value.name} (${(value.size / 1024).toFixed(2)} KB)`);
                } else if (typeof value === 'string' && value.startsWith('http')) {
                    console.log(`${key}: URL - ${value}`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }
            console.log('==========================================');

            // Send to backend
            console.log('\nSending data to backend...');
            await dispatch(updateProduct(id, formData));

        } catch (err) {
            console.error('Error updating product:', err);
            Notification(err.message || "Error updating product", "error");
        } finally {
            setLoading(false);
        }
    };

    const res = useSelector((state) => state.productReducer.updateProduct)
    console.log(res)

    useEffect(() => {
        if (res && res.status === 200) {
            Notification("Product updated successfully", "success");
        } else {
            Notification("Error updating product", "error");
        }
        // if (loading === false) {
        //     setProdName('');
        //     setDesc('');
        //     setPriceBeforeDiscount(0);
        //     setPriceAfterDiscount(0);
        //     setPriceBeforeDiscount(0);
        //     setColors([])
        //     setCateID('')
        //     setQty(1)
        //     setTimeout(() => {
        //         setLoading(true)
        //     }, 1000);

        //     if (product) {

        //         Notification('Update Product Is Done Successfully..', 'success')

        //     }
        //     else {
        //         Notification('Something Went Wrong , Check Internet Connection ', 'error')

        //     }

        // }
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
