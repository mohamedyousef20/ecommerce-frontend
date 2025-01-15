// src/components/Products.js
import React, { useEffect, useState } from 'react';
import {
    Grid, Box, Checkbox, Button, Modal,
    IconButton, Typography, Divider, Paper, CircularProgress
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllUser } from '../../../redux/action/userAction';
import PaginationTabs from '../../Utils/Pagination';

const User = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    const response = useSelector((state) => state.userReducer.user);

    const handleSelectUser = (id) => {
        setSelectedUsers((prev) => {
            if (prev.includes(id)) {
                return prev.filter((userId) => userId !== id);
            }
            return [...prev, id];
        });
    };

    return (
        <Box sx={{ padding: 2, flex: 1, bgcolor: '#f4f4f4' }}>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} gutterBottom>
                Users
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            {/* Add New User Button */}
            <Button
                variant="contained"
                startIcon={<Add />}
                color="primary"
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    mb: 5,
                    width: { xs: '100%', sm: 'auto' },
                }}
            >
                Add New User
            </Button>

            {/* User Grid/Table */}
            <Paper>
                <Grid container spacing={3}>
                    {/* Header row */}
                    <Grid container item xs={12} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        bgcolor: '#f1f1f1',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                    }}>
                        <Grid item xs={1}>
                            <Typography fontWeight="bold">Select</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography fontWeight="bold">Image</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Name</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Email</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />
                        <Grid item xs={1}>
                            <Typography fontWeight="bold">Role</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />
                        <Grid item xs={1}>
                            <Typography fontWeight="bold">Active</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Actions</Typography>
                        </Grid>
                    </Grid>

                    {/* User Rows */}
                    {response && response.data ? response.data.map((user) => (
                        <Grid container item xs={12} key={user._id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: 1,
                                borderRadius: 1,
                                justifyContent: 'flex-start',
                                bgcolor: '#fff',
                                borderBottom: '1px solid #ddd',
                            }}>
                            <Grid item xs={1}>
                                <Checkbox
                                    checked={selectedUsers.includes(user._id)}
                                    onChange={() => handleSelectUser(user._id)}
                                    sx={{ color: 'success', bgcolor: '#f1f1f1' }}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <img src={user.profileImage} alt={user.name} style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{user.name}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{user.email}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>{user.role}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>{user.isActive ? 'Yes' : 'No'}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                <IconButton sx={{ color: 'black' }}>
                                    <Visibility sx={{ color: 'black' }} />
                                </IconButton>
                                <Link to={`/admin/update-user/${user._id}`}>
                                    <IconButton sx={{ color: 'blue' }}>
                                        <Edit sx={{ color: 'blue' }} />
                                    </IconButton>
                                </Link>
                                <IconButton sx={{ color: 'red' }}>
                                    <Delete sx={{ color: 'red' }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    )) : <CircularProgress />}
                </Grid>

                <PaginationTabs paginationResult={response.paginationResult} />
            </Paper>
        </Box>
    );
};

export default User;
