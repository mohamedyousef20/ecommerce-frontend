import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/action/authAction';
import Notification from '../../customHooks/useNotification';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingProgress from '../../Components/LoadingProgress';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const RegisterPage = () => {
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

    // Joi Validation Schema
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters',
            'string.max': 'Name cannot exceed 30 characters',
        }),
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Invalid email format',
        }),
        phone: Joi.string().pattern(/^01[0-9]{9}$/).required().messages({
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be a valid Egyptian number (01XXXXXXXXX)',
        }),
        password: Joi.string().min(6).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
        }),
        passwordConfirm: Joi.any().equal(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Confirm password is required',
        }),
    });

    const handleRegister = (e) => {
        e.preventDefault();

        // Validate the form data before proceeding
        const { error } = schema.validate({ name, email, phone, password, passwordConfirm }, { abortEarly: false });

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
    };

    // Handle response from the registration API
    useEffect(() => {
        if (loading && response) {
            if (response.msg === 'success') {
                Notification('You Registered Successfully...', 'success');
                navigate('/login');
            } else {
                console.log(errors)
                Notification('Something went wrong, please try again...', 'error');
            }
            setLoading(false); // Stop loading after receiving response
        }
    }, [loading, response, navigate]);

    return (
        <Container component="main" maxWidth="xs">
            <LoadingProgress loading={loading} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    my: 4,
                    padding: 3,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h5" sx={{ color: '#1976D2', fontWeight: 'bold', mb: 2 }}>
                    Register
                </Typography>

                <form onSubmit={handleRegister} style={{ width: '100%' }}>
                    {/* Name */}
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#1976D2' },
                                '&:hover fieldset': { borderColor: '#FF5722' },
                                '&.Mui-focused fieldset': { borderColor: '#1976D2' },
                            }
                        }}
                    />

                    {/* Email */}
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#1976D2' },
                                '&:hover fieldset': { borderColor: '#FF5722' },
                                '&.Mui-focused fieldset': { borderColor: '#1976D2' },
                            }
                        }}
                    />

                    {/* Phone Number */}
                    <TextField
                        label="Phone Number"
                        type="tel"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#1976D2' },
                                '&:hover fieldset': { borderColor: '#FF5722' },
                                '&.Mui-focused fieldset': { borderColor: '#1976D2' },
                            }
                        }}
                    />

                    {/* Password */}
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Confirm Password */}
                    <TextField
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        error={!!errors.passwordConfirm}
                        helperText={errors.passwordConfirm}
                    />

                    {/* Register Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            bgcolor: '#1976D2',
                            '&:hover': { bgcolor: '#FF5722' },
                        }}
                    >
                        Register
                    </Button>
                </form>

                {/* Have Account? */}
                <Typography
                    variant="body2"
                    sx={{
                        mt: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        color: '#1976D2',
                        textDecoration: 'underline',
                        '&:hover': { color: '#FF5722' },
                    }}
                    onClick={() => navigate('/login')}
                >
                    Have an Account? Log in
                </Typography>
            </Box>
        </Container>
    );
};

export default RegisterPage;
