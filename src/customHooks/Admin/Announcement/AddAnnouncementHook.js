import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import Notification from '../../useNotification';
import { createAnnouncement } from '../../../redux/action/announcementAction';
import Joi from 'joi'; // Import Joi for validation

const AddAnnouncementHook = () => {
    const dispatch = useDispatch();

    // States
    const [announcementImage, setAnnouncementImage] = useState([]);
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementDesc, setAnnouncementDesc] = useState('');
    const [loading, setLoading] = useState();

    // Validation Errors
    const [errors, setErrors] = useState({});

    // Joi Schema for Validation
    const schema = Joi.object({
        announcementTitle: Joi.string().min(5).max(50).required().messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 5 characters",
            "string.max": "Title must be at most 50 characters",
        }),
        announcementDesc: Joi.string().min(10).required().messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters",
        }),
        announcementImage: Joi.string().min(1).required().messages({
            "string.empty": "At least one image is required",
            'any.required': 'Please upload a Announcement image'

        }),
    });
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

    const announcement = useSelector((state) => state.announcementReducer.createAnnouncement);
    // Handle Input Changes
    const handelTitle = (e) => {
        setAnnouncementTitle(e.target.value);
    };

    const handelDesc = (e) => {
        setAnnouncementDesc(e.target.value);
    };


    // Handle Submit
    console.log('errors', errors)
    const handleSubmit = async (e) => {
        e.preventDefault();
     
        setErrors({})

        // Reset previous errors before validating
        setErrors({});

        // Validate the form
        const validateForm = () => {
            const { error } = schema.validate(
                {
                    announcementTitle,
                    announcementDesc,
                    announcementImage,
                },
                { abortEarly: false }
            );

            if (error) {
                // If validation fails, create an error object and set it to errors state
                const errorMessages = {};
                error.details.forEach((err) => {
                    errorMessages[err.context.key] = err.message; // Set the specific error for each field
                    Notification(err.message, 'error'); // Show notification
                });
                setErrors(errorMessages); // Set error messages to state
                return false;
            }
            return true;
        };

        if (!validateForm()) {
            return;  // Stop form submission if validation fails
        }

        // Convert Image to File
        const imageFile = dataURLtoFile(announcementImage, 'announcementImage.jpeg');


        // Create FormData
        const formData = new FormData();
        formData.append('title', announcementTitle);
        formData.append('desc', announcementDesc);
        formData.append('image', imageFile);

        setLoading(true);
        await dispatch(createAnnouncement(formData));
        setLoading(false);
    };

    // Reset Form on Success
    useEffect(() => {
        if (!loading && announcement) {

            if (announcement.status === 201) {
                console.log('object')
                setAnnouncementTitle('');
                setAnnouncementDesc('');
                setAnnouncementImage([]);
                setLoading(true);
                setErrors({});
                Notification('Announcement added successfully!', 'success');
            }
            else {
                console.log(announcement)
                // Notification()

            }

        }
    }, [loading]);

    return [
        loading,
        announcementImage,
        setAnnouncementImage,
        announcementTitle,
        handelTitle,
        handelDesc,
        announcementDesc,
        handleSubmit,
        errors,
    ];
};

export default AddAnnouncementHook;
