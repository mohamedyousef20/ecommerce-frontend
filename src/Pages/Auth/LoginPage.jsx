import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Joi from 'joi';  // Import Joi for validation
import Notification from '../../customHooks/useNotification';
import { loginUser } from '../../redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import LoadingProgress from '../../Components/LoadingProgress';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Joi Validation Schema
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            "string.empty": "Email is required",
            "string.email": "Invalid email format",
        }),
        password: Joi.string().min(6).required().messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters long",
        })
    });

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate Inputs
        const validation = schema.validate({ email, password }, { abortEarly: false });
        if (validation.error) {
            const validationErrors = {};
            validation.error.details.forEach((detail) => {
                validationErrors[detail.path[0]] = detail.message;
            });
            setErrors(validationErrors);
            return;
        }



        setErrors({});

        setLoading(true);
        await dispatch(loginUser({ email, password }));
        setLoading(false);
    };

    // Handle Forgot Password
    const handleForgotPassword = () => navigate('/user/forgetPassword');

    // Handle Create New Account
    const handleCreateNewAccount = () => navigate('/register');

    // Get response from server
    const response = useSelector((state) => state.authReducer.login);

    useEffect(() => {
        if (!response) return;

        if(loading === false){
            if (response.message === 'success' && response.userToken) {
                localStorage.setItem("userToken", response.userToken);
                localStorage.setItem("user", JSON.stringify(response.data));
console.log(localStorage.getItem("user"))
                Notification('You Logged In Successfully!', 'success');

                setTimeout(() => {
                    window.location.href = '/';
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
            else if (response.status === 401) {
                Notification('Wrong email or password. Please try again.', 'error');
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
        }
    }, [response]);
console.log(localStorage.getItem('userToken'))
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
                <Typography variant="h5" sx={{ color: '#1976D2', fontWeight: 'bold', mb: 1 }}>
                    Login
                </Typography>

                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    {/* Email Field */}
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
                                '&.Mui-focused fieldset': { borderColor: '#1976D2' }
                            }
                        }}
                    />

                    {/* Password Field with Visibility Toggle */}
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
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
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#1976D2' },
                                '&:hover fieldset': { borderColor: '#FF5722' },
                                '&.Mui-focused fieldset': { borderColor: '#1976D2' }
                            }
                        }}
                    />

                    {/* Remember Me Checkbox */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                sx={{
                                    color: '#1976D2',
                                    '&.Mui-checked': { color: '#FF5722' }
                                }}
                            />
                        }
                        label="Remember Me"
                        sx={{ mt: 1 }}
                    />

                    {/* Login Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, bgcolor: '#1976D2', '&:hover': { bgcolor: '#FF5722' } }}
                    >
                        Login
                    </Button>
                </form>

                {/* Forgot Password Link */}
                <Typography
                    variant="body2"
                    sx={{
                        mt: 2, textAlign: 'center',
                        cursor: 'pointer', color: '#1976D2',
                        textDecoration: 'underline',
                        '&:hover': { color: '#FF5722' }
                    }}
                    onClick={handleForgotPassword}
                >
                    Forgot Password?
                </Typography>

                {/* Create New Account */}
                <Typography
                    variant="body2"
                    sx={{
                        mt: 2, textAlign: 'center',
                        cursor: 'pointer', color: '#1976D2',
                        textDecoration: 'underline',
                        '&:hover': { color: '#FF5722' }
                    }}
                    onClick={handleCreateNewAccount}
                >
                    Create New Account?
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginPage;
