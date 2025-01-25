// src/components/Products.js
import React, { useEffect, useState } from 'react';
import {
    Grid, Box, Checkbox, Button, Modal,
    IconButton, Typography, Divider, Paper, CircularProgress
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import PaginationTabs from '../../Utils/Pagination';
import AdminGetAllUserHook from '../../../customHooks/Admin/User/AdminGetAllUserHook';
import AdminDeleteUserHook from '../../../customHooks/Admin/User/AdminDeleteUser';
import WarningModal from '../../Utils/WarningModal';

const User = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [users] = AdminGetAllUserHook();
const [
    userIdToDelete,
    setUserIdToDelete,
    isModalOpen,
    setIsModalOpen,
    handleConfirmDelete,
    handleOpenModal,
    handleCancelDelete
] = AdminDeleteUserHook();
    return (
        <Box sx={{ padding: 2, flex: 1, bgcolor: '#f4f4f4' }}>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} gutterBottom>
                Users
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            <Link to={'/dashboard/user/create'}>
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
            </Link>

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
                    {users && users.data ? users.data.map((user) => (
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
                                <Typography>{user.active ? 'true' : 'false'}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                        
                                <IconButton
                                    onClick={() => { setUserIdToDelete(user._id); setIsModalOpen(true); }}
                                    sx={{ color: 'red' }}
                                >
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    )) : <CircularProgress />}
                </Grid>

                <PaginationTabs paginationResult={users.paginationResult} />
            </Paper>
            {/* Delete Confirmation Modal */}
            <WarningModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                message="Are you sure you want to delete this User?"
            />
        </Box>
    );
};

export default User;
