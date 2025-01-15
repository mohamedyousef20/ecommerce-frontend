import React, { useState } from 'react';
import { useEffect } from "react";
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';  // This is used for routing (optional if you have routing)
import Navbar from '../../Components/Utils/NavbarLogged';
import Footer from '../../Components/Utils/Footer';
import { loginUser } from '../../redux/action/authAction';
import { useDispatch, useSelector } from "react-redux/lib/exports"
import { Password } from "@mui/icons-material";
import Notification from '../../customHooks/useNotification';


const LoginPage = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {

            setError('Both fields are required');

            setError('');
        }
        // Add login logic 
        setLoading(true)
        await dispatch(loginUser({ email, password }));
        setLoading(false)
    }


    const handleForgotPassword = () => {
        // Handle password reset (navigate to a reset password page )
        navigate('/user/forgetPassword')
    };


    const handleCreateNewAccount = () => {
        // Handle password reset (navigate to a reset password page or show a modal)
        console.log('Forgot password clicked!');
    };

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    // get response form server
    const response = useSelector((state) => state.authReducer.login)


    useEffect(() => {


        if (!loading) {

            if (response.message === 'success') {
                if (response.userToken) {
                    localStorage.setItem("userToken", response.userToken);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log(localStorage.getItem("user"))

                    Notification('You Logged In Successfully', 'success')

                    window.location.href = '/'
                }
                else {
                    localStorage.removeItem("userToken")
                    localStorage.removeItem("user")

                }

                setLoading(true)
            }


            else {
                Notification(response.message, 'error')

            }
            //   ##TODO SEND NOTE IF NOT PASSWORD OR USER IS WORNG
            // if (response.message === 'wrong password or email') {
            //     console.log('fail')
            // }


        }
    }, [loading]);
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        my: 4,
                        padding: 2,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <Password />
                    <Typography variant="h5">Login</Typography>
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={handleEmail}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={handlePassword}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2, bgcolor: '#0295db' }}
                        >
                            Login
                        </Button>
                    </form>

                    {/* Forgot Password Link */}
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 2, textAlign: 'center',
                            cursor: 'pointer', color: 'primary.main', textDecoration: 'underline'
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
                            cursor: 'pointer', color: 'primary.main', textDecoration: 'underline'
                        }}
                        onClick={handleCreateNewAccount}
                    >
                        Create New Account?
                    </Typography>


                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default LoginPage;
