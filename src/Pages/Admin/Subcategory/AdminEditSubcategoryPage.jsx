import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import AdminGetAllCategoryHook from '../../../customHooks/Category/AdminGetAllCategoryHook';
import { editSubcateOnCategory, getOneSubcateOnCategory } from '../../../redux/action/subCategoryAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { useParams } from 'react-router-dom';
import LoadingProgress from '../../../Components/LoadingProgress';
import Notification from '../../../customHooks/useNotification';
import Joi from 'joi';

const AdminEditSubcategoryPage = () => {

    const dispatch = useDispatch();

    const { id } = useParams();

    const [category] = AdminGetAllCategoryHook();
    const [subcategoryName, setSubcategoryName] = useState('');
    const [cateId, setCateId] = useState('');  // Track selected category ID
    const [loading, setLoading] = useState();
    const [errors, setErrors] = useState({});
console.log(errors)
    // Validation schema using Joi
    const schema = Joi.object({
        subcategoryName: Joi.string().min(2).max(50).required().messages({
            'string.empty': 'subcategoryName name is required',
            'string.min': 'subcategoryName name must be at least 2 characters',
            'string.max': 'subcategoryName name must be less than 50 characters'
        }),

    });
    useEffect(() => {
        dispatch(getOneSubcateOnCategory(id));
    }, [id]);

    const subcategory = useSelector((state) => state.subcategoryReducer.getOneSubcategory);
    const updatedSubcategory = useSelector((state) => state.subcategoryReducer.updateSubcategory);

    useEffect(() => {
        if (subcategory && subcategory.category) {
            // Set subcategory name and category ID when data is loaded
            setSubcategoryName(subcategory.name || '');
            setCateId(subcategory.category._id || '');  // Use category._id, not category.name
            console.log(subcategory.category.name); // Optional: Log category name for debugging
        }
    }, [subcategory]);

    const handleNameChange = (e) => setSubcategoryName(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        // Validate the form
        const validateForm = () => {
            const { error } = schema.validate({ subcategoryName }, { abortEarly: false });

            if (error) {
                console.log(error)
                error.details.forEach((err) => Notification(err.message, 'error'));
                return false;
            }
            return true;
        };

        setLoading(true);
        await dispatch(editSubcateOnCategory(id, {
            name: subcategoryName,
            category: cateId
        }));
        setLoading(false);
    };

    useEffect(() => {
        if (!loading && updatedSubcategory) {
            if (updatedSubcategory.msg === 'success') {
                Notification('successfully edit subcategory','success')
            }
            else {
                console.log(updatedSubcategory)
                Notification(updatedSubcategory.errors[0].msg, 'error')


            }

        }
    }, [updatedSubcategory])

    return (
        <>
            <LoadingProgress loading={loading} />
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
                        Edit Subcategory
                    </Typography>

                    <Stack spacing={3}>
                        {/* Subcategory Name Input */}
                        <TextField
                            fullWidth
                            label="Enter Subcategory Name"
                            variant="outlined"
                            value={subcategoryName}
                            onChange={handleNameChange}
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
                                value={cateId}  // Use cateId to select the correct category
                                onChange={(e) => setCateId(e.target.value)}  // Handle category selection
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
                            sx={{
                                backgroundColor: '#FF5722',
                                '&:hover': { backgroundColor: '#E64A19' },
                                fontWeight: 'bold',
                            }}
                            onClick={handleSubmit}  // Add click handler to submit form
                        >
                            Edit Subcategory
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}



export default AdminEditSubcategoryPage
