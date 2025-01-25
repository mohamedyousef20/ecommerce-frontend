import React from 'react'
import Joi from 'joi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { createSubCategory } from '../../redux/action/subCategoryAction';
import Notification from '../useNotification';

const AdminAddSubcategoryHook = () => {

    const dispatch = useDispatch();

    // State variables
    const [subcategoryName, setSubcategoryName] = useState('');
    const [cateId, setCateId] = useState('');
    const [loading, setLoading] = useState();
    const [errors, setErrors] = useState({});

    // Validation schema using Joi
    const schema = Joi.object({
        subcategoryName: Joi.string().min(2).max(50).required().messages({
            'string.empty': 'subcategoryName name is required',
            'string.min': 'subcategoryName name must be at least 2 characters',
            'string.max': 'subcategoryName name must be less than 50 characters'
        }),

    });
    const subcategory = useSelector(state => state.subcategoryReducer.subcategory);

    // Handle name change
    const handleName = (e) => {
        setSubcategoryName(e.target.value);
    };

    // Handle category change
    const handelSelectCate = (e) => {
        setCateId(e.target.value);
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        // Validate the form
        const validateForm = () => {
            const { error } = schema.validate({ subcategoryName }, { abortEarly: false });

            if (error) {
                console.log(error)
                error.details.forEach((err) => Notification(err.message, 'error'));
                return false;
            }
            return true;
        };




        setLoading(true);
        await dispatch(createSubCategory({
            name: subcategoryName,
            category: cateId
        }));
        setLoading(false);
    };

    // Handle Response & Reset Form
    useEffect(() => {
        if (loading === false) {

            if (subcategory && subcategory.msg === 'success') {
                Notification('subcategory added successfully', 'success');


            } else {
                Notification(subcategory.errors[0].msg,'error')
            }

            setLoading(false)

        }
    }, [loading]);


    return [
        loading,
        subcategoryName,
        setSubcategoryName,
        handleName,
        cateId,
        setCateId,
        handelSelectCate,
        handleSubmit

    ]

};




export default AdminAddSubcategoryHook
