import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Divider, Paper, Checkbox, IconButton, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminGetAllSubcategoryHook from '../../../customHooks/Subcategory/AdminGetAllSubcategoryHook';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import AdminDeleteSubcategoryHook from '../../../customHooks/Subcategory/AdminDeleteSubcategoryHook';
import WarningModal from '../../../Components/Utils/WarningModal';

const AdminSubcategoryPage = () => {
    const [subcategory] = AdminGetAllSubcategoryHook();
    // console.log(subcategory)
    const [
        itemId,
        setItemId,
        isModalOpen,
        setIsModalOpen,
        handleCancelDelete,
        handleConfirmDelete] = AdminDeleteSubcategoryHook();

    const [page, setPage] = useState(1);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', bgcolor: '#F5F5F5' }}>
            {/* Admin Sidebar */}
            <Box sx={{ width: { xs: '100%', md: '250px' }, bgcolor: 'white', p: 2, boxShadow: 1 }}>
                <AdminSideBar />
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: '#FF5722' }} gutterBottom>
                    Subcategories
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />

                {/* Add New Subcategory Button */}
                <Box display="flex" justifyContent="flex-start" mb={3}>
                    <Link to="/dashboard/subcategory/create">
                        <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: '#1976D2', '&:hover': { bgcolor: '#1259A5' } }}>
                            Add New Subcategory
                        </Button>
                    </Link>
                </Box>

                {/* Subcategory List */}
                <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 2, overflowX: 'auto' }}>
                    <Grid container spacing={2} sx={{ minWidth: 600 }}>
                        {/* Header Row */}
                        <Grid container item xs={12} sx={{ bgcolor: '#E0E0E0', py: 1, px: 2, borderRadius: 1 }}>
                            <Grid item xs={2}><Typography fontWeight="bold">Select</Typography></Grid>
                            <Grid item xs={4}><Typography fontWeight="bold">Name</Typography></Grid>
                            <Grid item xs={4}><Typography fontWeight="bold">Category</Typography></Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}><Typography fontWeight="bold">Actions</Typography></Grid>
                        </Grid>

                        {/* Subcategory Rows */}
                        {subcategory ? subcategory.map((sub) => (
                            <Grid container item xs={12} key={sub._id} sx={{ alignItems: 'center', p: 2, borderBottom: '1px solid #ddd', '&:hover': { bgcolor: '#f9f9f9' } }}>
                                <Grid item xs={2}><Checkbox /></Grid>
                                <Grid item xs={4}><Typography>{sub.name}</Typography></Grid>
                                <Grid item xs={4}><Typography>{sub.category.name}</Typography></Grid>
                                <Grid item xs={2} sx={{ textAlign: 'center' }}>

                                    <Link to={`/dashboard/subcategory/update/${sub._id}`}>
                                        <IconButton sx={{ color: '#FF5722' }}>
                                            <Edit />
                                        </IconButton>
                                    </Link>


                                    <IconButton
                                        onClick={() => { setItemId(sub._id); setIsModalOpen(true); }}
                                        sx={{ color: 'red' }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )) : (
                            <CircularProgress />
                        )}
                    </Grid>
                </Paper>
            </Box>
            <WarningModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                message="Are you sure you want to delete this coupon?"
            />
        </Box>
    );
};

export default AdminSubcategoryPage;
