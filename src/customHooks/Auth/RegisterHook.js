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
console.log(response)
    // Handle navigate

    const handleNavigate = () => {
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
        if (!response) return;

        if (response.msg === 'success') {
            Notification('You Registered Successfully...', 'success');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
        else if (response.status === 400) {
            // Handle validation errors from the backend
            if (response.errors && response.errors.length > 0) {
                response.errors.forEach(error => {
                    Notification(error.msg, 'error'); // Display each validation error
                });
            } else {
                Notification('Validation failed. Please check your inputs.', 'error');
            }
        }
       
        else if (response.status === 403) {
            Notification('Your account is not authorized. Contact support.', 'error');
        }
        else if (response.status === 500) {
            Notification('Server error. Please try again later.', 'error');
        }

        else {
            Notification('An unknown error occurred. Please try again.', 'error');
        }
  }, [response])

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
