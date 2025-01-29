import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingProgress from '../../Components/LoadingProgress';
import Joi from 'joi';
import RegisterHook from '../../customHooks/Auth/RegisterHook';

const RegisterPage = () => {
    const [handleRegister,
        handleNavigate, name, setName,
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
        setLoading] = RegisterHook();


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
                    onClick={handleNavigate}
                >
                    Have an Account? Log in
                </Typography>
            </Box>
        </Container>
    );
};

export default RegisterPage;
