import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import AddCateHook from '../../../customHooks/Category/AddCateHook';
import SingleImageInput from '../../../Components/Admin/AdminAllProduct/SingleImageInput';
import LoadingProgress from '../../../Components/LoadingProgress';

const AdminAddCategoryPage = () => {
    const [
        categoryImage,
        setCategoryImage,
        handleName,
        categoryName,
        handleSubmit,
        loading,
        setLoading,
        errors
    ] = AddCateHook();

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
                {/* Category Header */}
                <Box mb={3} textAlign="center">
                    <Typography
                        fontSize="1.75rem"
                        fontWeight={700}
                        color="#1976D2" // Royal Blue
                    >
                        Add New Category
                    </Typography>
                    <Typography
                        fontSize="0.875rem"
                        color="text.secondary"
                        mt={1}
                    >
                        Fill in the details to create a new category.
                    </Typography>
                </Box>

                {/* Image Input */}
                <SingleImageInput
                    image={categoryImage}
                    setImage={setCategoryImage}
                />

                {/* Form Fields */}
                <Stack direction="column" spacing={3} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Category Name"
                        variant="outlined"
                        value={categoryName}
                        onChange={handleName}
                        error={!!errors.categoryName}
                        helperText={errors.categoryName}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#F5F5F5', // Light Gray
                            },
                        }}
                    />
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
                    Add Category
                </Button>
            </Box>
        </>
    );
};

export default AdminAddCategoryPage;