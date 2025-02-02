import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Box, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetCode } from '../../redux/action/authAction';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // Handle email change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        //  email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email) {
            setError('Email is required');
        } else if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
        } else {


            // store email in locale storage
            localStorage.setItem("userEmail", email)

            // send the reset code to the email

            await dispatch(sendPasswordResetCode({
                email,
            }))

            // Simulate successful email sending
            setSuccessMessage('A password reset code has been sent to your email.');
            setEmail(''); // Reset email field
            navigate('/verifyResetCode')

        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Forgot Password
            </Typography>

            {/* Display error message */}
            {error && <Alert severity="error">{error}</Alert>}

            {/* Display success message */}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                        type="email"
                        required
                        helperText="Please enter your email address"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ padding: '10px' }}
                    >
                        Send Reset Code
                    </Button>
                </Stack>
            </form>

            {/* Footer or additional information */}
            <Box mt={3} textAlign="center">
                <Typography variant="body2">
                    Remember your password? <Link to={'/login'}><Button color="primary">Login</Button></Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default ForgotPasswordPage;
