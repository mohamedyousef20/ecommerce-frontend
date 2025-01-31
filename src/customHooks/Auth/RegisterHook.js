import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { registerUser } from '../../redux/action/authAction';
import RegisterSchema from '../../Validation/Register';
import Notification from '../useNotification';
const RegisterHook = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Redux response and user token
    const response = useSelector((state) => state.authReducer.register);

    // Handle navigate

    const handleNavigate = ()=>{
      navigate('/login')
    }



    const handleRegister = (e) => {
        e.preventDefault();

        // Validate the form data before proceeding
        const { error } = RegisterSchema.validate({ name, email, phone, password, passwordConfirm }, { abortEarly: false });

        if (error) {
            const errorMessages = {};
            error.details.forEach((err) => errorMessages[err.path[0]] = err.message);
            setErrors(errorMessages);
            return; // Stop execution if there are validation errors
        }

        setErrors({}); // Clear previous errors

        // Start the loading state before API call
        setLoading(true);

        // Dispatch the register action
        dispatch(registerUser({ name, email, phone, password, passwordConfirm }));
        setLoading(false);

    };

    // Handle response from the registration API
    useEffect(() => {
        if (response?.data) {
            // console.log(response)
            if (response.msg === 'success') {
                Notification('You Registered Successfully...', 'success');
                navigate('/login');
            } else {
                // console.log(errors)
                Notification(response?.message || 'Error sign up', 'error');
            }
            setLoading(false); // Stop loading after receiving response
        }
    }, [response.data]);


    return [
        
        handleRegister,
        handleNavigate,
        name, setName,
        email, setEmail,
        phone,
        setPhone,
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
        showPassword,
        setShowPassword,
        errors,
        setErrors,
        loading,
        setLoading
    ]
}

export default RegisterHook
