import { useEffect, useState } from 'react';
import Notification from '../useNotification';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { createCategory } from '../../redux/action/categoryAction';
import Joi from 'joi';

const AddCateHook = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.categoryReducer.category);

    const [categoryImage, setCategoryImage] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState();
    const [errors, setErrors] = useState({});

    const handleName = (e) => {
        setCategoryName(e.target.value);
    };

    // Convert Base64 to File
    const dataURLtoFile = (dataurl, filename = 'image.jpg') => {
        try {
            if (!dataurl) throw new Error('Invalid Data URL');

            const [header, base64] = dataurl.split(',');
            if (!header || !base64) throw new Error('Malformed Data URL');

            const mimeMatch = header.match(/:(.*?);/);
            if (!mimeMatch) throw new Error('MIME type not found in Data URL');
            const mimeType = mimeMatch[1];

            const binaryStr = atob(base64);
            const len = binaryStr.length;
            const uint8Array = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                uint8Array[i] = binaryStr.charCodeAt(i);
            }

            return new File([uint8Array], filename, { type: mimeType });
        } catch (error) {
            console.error('Error converting Data URL to File:', error.message);
            return null;
        }
    };

    // Joi Schema Validation
    const schema = Joi.object({
        categoryName: Joi.string().min(2).max(50).required().messages({
            'string.empty': 'Category name is required',
            'string.min': 'Category name must be at least 2 characters',
            'string.max': 'Category name must be less than 50 characters'
        }),
        categoryImage: Joi.string().required().messages({
            'string.empty': 'Please upload a category image',
            'any.required': 'Please upload a category image'
        })
    });

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        // Validate Data
        const formData = { categoryName, categoryImage };
        const { error } = schema.validate(formData, { abortEarly: false });

        if (error) {
            const errorMessages = {};
            error.details.forEach((err) => {
                errorMessages[err.path[0]] = err.message;
            });
            setErrors(errorMessages);
            Notification('Validation Error. Please check the form.', 'error');
            return;
        }

        // Convert Image to File
        const imageFile = dataURLtoFile(categoryImage, 'categoryImage.jpeg');

        // Create FormData
        const formDataToSend = new FormData();
        formDataToSend.append('name', categoryName);
        formDataToSend.append('image', imageFile);

        setLoading(true);
        await dispatch(createCategory(formDataToSend));
        setLoading(false);
    };

    // Handle Response & Reset Form
    useEffect(() => {
        if (loading === false) {
       
            if (category && category.status === 201) {
                setCategoryName('');
                setCategoryImage('');
                setLoading(true);
                setErrors({});
                Notification('Category added successfully', 'success');
            } else {
                Notification('Error adding category', 'error');
            }



            setLoading(false)

        }
    }, [loading]);

    return [
        categoryImage,
        setCategoryImage,
        handleName,
        categoryName,
        handleSubmit,
        loading,
        setLoading,
        errors
    ];
};

export default AddCateHook;
