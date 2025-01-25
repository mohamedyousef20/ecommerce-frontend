import { useEffect, useState } from 'react';
import Notification from '../../useNotification';
import { createBrand } from '../../../redux/action/brandAction';
import Joi from 'joi';
import { useDispatch } from 'react-redux/lib/exports';

const AdminAddBrandHook = () => {
    const dispatch = useDispatch();

    // State variables
    const [brandImage, setBrandImage] = useState([]);
    const [brandName, setBrandName] = useState('');
    const [loading, setLoading] = useState(true);

    // Validation schema using Joi
    const schema = Joi.object({
        brandName: Joi.string().min(2).max(50).required().messages({
            'string.empty': 'Brand name is required',
            'string.min': 'Brand name must be at least 2 characters',
            'string.max': 'Brand name must be less than 50 characters'
        }),
        brandImage: Joi.string().required().messages({
            'string.empty': 'Please upload a brand image',
            'any.required': 'Please upload a brand image'
        })

    });

    // Handle name change
    const handleName = (e) => {
        setBrandName(e.target.value);
    };

    // Convert base64 to file
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
            return null; // Return null if there's an error
        }
    };

    // Validate the form
    const validateForm = () => {
        const { error } = schema.validate({ brandName, brandImage }, { abortEarly: false });

        if (error) {
            error.details.forEach((err) => Notification(err.message, 'error'));
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const imageFile = dataURLtoFile(brandImage, 'brandImage.jpeg');

        const formData = new FormData();
        formData.append('name', brandName);
        formData.append('image', imageFile);
        console.log(imageFile)

        setLoading(true);
        await dispatch(createBrand(formData));
        setLoading(false);
    };
useEffect(()=>{setLoading(false)},[])
    // Reset form after submission
    // useEffect(() => {
    //     if (!loading) {
    //         setBrandName('');
    //         setBrandImage([]);
    //         setLoading(true);
    //         Notification('Brand added successfully', 'success');
    //     }
    // }, [loading]);

    return [brandImage, setBrandImage, brandName, setBrandName, 
        handleName, handleSubmit, loading];
};

export default AdminAddBrandHook;
