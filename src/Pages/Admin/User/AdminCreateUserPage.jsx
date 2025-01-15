import React, { useState } from 'react';
import { TextField, MenuItem,Container ,Select, Button, FormControl, InputLabel, Box, Grid, Typography, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux/lib/exports';
import { createUser } from '../../../redux/action/userAction';

const AddUserPage = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!name || !email || !password || !role) {
        //     setSnackbarMessage('Please fill in all fields');
        //     setOpenSnackbar(true);
        //     return;
        // }

        const userData = { name, email, password, role };

        try {
            // Dispatch action to add user (uncomment when backend action is available)
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
        }
    };

    return (
        <Container maxWidth="sm" sx={{ padding: 3 }}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
                Add New User
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    backgroundColor: '#f5f5f5',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 2,
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoFocus
                                helperText={!name && 'Name is required'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                helperText={!email && 'Email is required'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                helperText={!password && 'Password is required'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    label="Role"
                                    required
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="moderator">Moderator</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Add User
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

            {/* Snackbar for feedback */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Container>
    );
};

export default AddUserPage;