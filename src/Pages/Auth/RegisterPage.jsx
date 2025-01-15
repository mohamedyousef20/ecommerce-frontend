import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/action/authAction';
import Footer from '../../Components/Utils/Footer';
import Notification from '../../customHooks/useNotification';
import NavbarUnLogged from '../../Components/Utils/NavbarUnLogged';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const handleRegister = (e) => {
        e.preventDefault();

        if (name === '' || email === '' || password === '' || passwordConfirm === '') {
            setError('All fields are required');
            return;
        }

        if (password !== passwordConfirm) {
            setError('Confirm password not match');
            return;
        }

        setError('');
        //  register logic 
        setLoading(true)

        dispatch(registerUser({
            name,
            email,
            password,
            passwordConfirm,

        }))
        setLoading(false)


        console.log('Registered:', { name, email, password });
    };

    const response = useSelector((state) => state.authReducer.register);
    console.log(response)
    console.log('response')
    console.log(loading)

    useEffect(() => {

        if (!loading && response && response.userToken) {

            localStorage.setItem("userToken", response.userToken);
            console.log(localStorage.getItem("userToken"))
            console.log('////////////////////')
            Notification('You Register Successfully', 'success')
            // window.location.href = "/"

        }


        // //   ##TODO SEND NOTE IF NOT PASSWORD OR USER IS WORNG
        // if (response.message === 'wrong password or email') {
        //     console.log('fail')
        // }


    }, [loading])


    const handelHaveAccount = () => {
        // Handle password reset (navigate to a reset password page or show a modal)
        console.log('Forgot password clicked!');
    };



    return (
        <Container component="main" maxWidth="xs">
            <NavbarUnLogged />

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
                <Typography variant="h5">Register</Typography>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleRegister} style={{ width: '100%' }}>
                    <TextField
                        label="name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
               
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, bgcolor: '#1976d2' }}
                    >
                        Register
                    </Button>
                </form>
                <Typography
                    variant="body2"
                    sx={{
                        mt: 2, textAlign: 'center',
                        cursor: 'pointer', color: 'primary.main', textDecoration: 'underline'
                    }}
                    onClick={handelHaveAccount}
                >
                    Already Have Account,Login?
                </Typography>
            </Box>
            <Footer />
        </Container>
    );
};

export default RegisterPage;
