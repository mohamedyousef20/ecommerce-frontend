import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux/lib/exports';
import { createUser } from '../../../redux/action/userAction';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import LoadingProgress from '../../../Components/LoadingProgress';

const AddUserPage = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !role) {
            setSnackbarMessage('Please fill in all fields');
            setOpenSnackbar(true);
            return;
        }

        const userData = { name, email, password, role };

        try {
            setLoading(true);
            await dispatch(createUser(userData));
            setSnackbarMessage('User added successfully!');
            setOpenSnackbar(true);

            // Reset form
            setName('');
            setEmail('');
            setPassword('');
            setRole('');
        } catch (error) {
            setSnackbarMessage('Error adding user');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingProgress loading={loading} />
            <AdminSideBar />
            <Box
                component="main"
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    my: 4,
                    padding: 4,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 3,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    mx: 'auto', // Center the container
                }}
            >
                {/* User Header */}
                <Box mb={3} textAlign="center">
                    <Typography
                        fontSize="1.75rem"
                        fontWeight={700}
                        color="#1976D2" // Royal Blue
                    >
                        Add New User
                    </Typography>
                    <Typography
                        fontSize="0.875rem"
                        color="text.secondary"
                        mt={1}
                    >
                        Fill in the details to create a new user.
                    </Typography>
                </Box>

                {/* Form Fields */}
                <Stack direction="column" spacing={3} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#F5F5F5', // Light Gray
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#F5F5F5', // Light Gray
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#F5F5F5', // Light Gray
                            },
                        }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#F5F5F5', // Light Gray
                                },
                            }}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="moderator">Moderator</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                {/* Submit Button */}
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        mt: 4,
                        py: 1.5,
                        backgroundColor: '#1976D2', // Royal Blue
                        color: '#FFFFFF',
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0px 4px 6px rgba(25, 118, 210, 0.2)',
                        '&:hover': {
                            backgroundColor: '#1565C0', // Darker Royal Blue
                            boxShadow: '0px 6px 8px rgba(25, 118, 210, 0.3)',
                        },
                        '&:active': {
                            backgroundColor: '#0D47A1', // Even Darker Royal Blue
                        },
                    }}
                >
                    Add User
                </Button>
            </Box>
        </>
    );
};

export default AddUserPage;