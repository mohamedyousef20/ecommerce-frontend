import {
    Box, FormControl, InputLabel, MenuItem,
    Select, Stack, TextField, Typography, Button, Paper
} from '@mui/material';
import React from 'react';
import AdminAddSubcategoryHook from '../../../customHooks/Subcategory/AdminAddSubcategoryHook';
import AdminGetAllCategoryHook from '../../../customHooks/Category/AdminGetAllCategoryHook';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import LoadingProgress from '../../../Components/LoadingProgress';

const AdminAddSubcategoryPage = () => {
    const [
        loading,
        subcategoryName,
        setSubcategoryName,
        handleName,
        cateId,
        setCateId,
        handelSelectCate,
        handleSubmit
    ] = AdminAddSubcategoryHook();

    const [category] = AdminGetAllCategoryHook();

    return (
        <>
            <LoadingProgress loading={loading}/>

            <AdminSideBar />

            <Box flex={2} sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh', padding: 4 }}>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        maxWidth: '600px',
                        margin: 'auto',
                    }}
                >
                    {/* Page Title */}
                    <Typography fontSize={'1.8rem'} fontWeight={600} color="#1976D2" textAlign="center" mb={3}>
                        Add New Subcategory
                    </Typography>

                    <Stack spacing={3}>
                        {/* Subcategory Name Input */}
                        <TextField
                            fullWidth
                            label="Enter Subcategory Name"
                            variant="outlined"
                            value={subcategoryName}
                            onChange={handleName}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#fafafa',
                                },
                            }}
                        />

                        {/* Category Select Input */}
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={cateId}
                                onChange={handelSelectCate}
                                label="Category"
                            >
                                {category && category.data
                                    ? category.data.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))
                                    : null
                                }
                            </Select>
                        </FormControl>

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: '#FF5722',
                                '&:hover': { backgroundColor: '#E64A19' },
                                fontWeight: 'bold',
                            }}
                        >
                            Add Subcategory
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </>
    );
};

export default AdminAddSubcategoryPage;
