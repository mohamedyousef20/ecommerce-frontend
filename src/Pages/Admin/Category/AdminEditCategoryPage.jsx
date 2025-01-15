import React, { useEffect } from 'react';
import AddAnnouncementHook from '../../../customHooks/Admin/Announcement/AddAnnouncementHook';
import { Box, Stack, TextField, Typography, Grid, Button, CircularProgress } from '@mui/material';
import MultipleImageInput from '../../../Components/Admin/AdminAllProduct/MultipleImageInput';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { useParams } from 'react-router-dom';
import { editAnnouncement, getOneAnnouncement } from '../../../redux/action/announcementAction';
import { useState } from 'react';
import SingleImageInput from '../../../Components/Admin/AdminAllProduct/SingleImageInput';
import { editCategory, getOneCategory } from '../../../redux/action/categoryAction';

const AdminEditCategoryPage = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOneCategory(id));
    }, [dispatch, id]);

    const category = useSelector((state) => state.categoryReducer.getOneCategory);
    useEffect(() => {
        if (category) {
            setCategoryName(category.name || '');
            setCategoryImage(category.image || '');
        }
    }, [category]);

    const handleNameChange = (e) => setCategoryName(e.target.value);


    const dataURLtoFile = (dataurl, filename = 'image.jpg') => {
        try {
            if (!dataurl) throw new Error('Invalid Data URL');

            const [header, base64] = dataurl.split(',');
            if (!header || !base64) throw new Error('Malformed Data URL');

            const mimeMatch = header.match(/:(.*?);/);
            if (!mimeMatch) throw new Error('MIME type not found in Data URL');
            const mimeType = mimeMatch[1];

            const binaryStr = atob(base64);
            const len = binaryStr.length;
            const uint8Array = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                uint8Array[i] = binaryStr.charCodeAt(i);
            }

            return new File([uint8Array], filename, { type: mimeType });
        } catch (error) {
            console.error('Error converting Data URL to File:', error.message);
            return null; // Return null if there's an error
        }
    };



    const handleSubmit = async () => {


        const formData = new FormData();
        if (categoryName) formData.append('name', categoryName);

        if (categoryImage) {
            const imageFile = dataURLtoFile(categoryImage, 'categoryImage.jpeg');
            if (imageFile) {
                formData.append('image', imageFile);
            } else {
                console.error('Failed to convert Data URL to File.');
            }
        } else {
            console.warn('No image selected.');
        }
        setLoading(true);
        try {
            await dispatch(editCategory(id, formData));
            setLoading(false);
            alert('Category updated successfully!');
        } catch (error) {
            setLoading(false);
            console.error('Error updating category:', error);
            alert('Failed to update category!');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                minHeight: '100vh',
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    flex: { xs: '0 0 auto', md: '0 0 250px' },
                    borderRight: { md: '1px solid #ddd' },
                    backgroundColor: '#f9f9f9',
                }}
            >
                <AdminSideBar />
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    padding: { xs: 2, sm: 3, md: 5 },
                }}
            >
                <Typography
                    fontSize="1.5rem"
                    fontWeight={600}
                    color="red"
                    mb={3}
                >
                    Edit Category

                </Typography>


                {categoryImage ?
                    <SingleImageInput image={categoryImage} setImage={setCategoryImage} />
                    // {image && <p>Image uploaded successfully!</p>}
                    : null}




                <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Enter Announcement Name"
                            variant="outlined"
                            value={categoryName}
                            onChange={handleNameChange}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#fafafa',
                                },
                            }}
                        />
                    </Grid>
                    
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            px: 4,
                            py: 1.5,
                            backgroundColor: '#0295db',
                            fontWeight: 600,
                            borderRadius: '10px',
                            '&:hover': {
                                color: '#fff',
                                bgcolor: '#151515',
                                boxShadow: '0px 4px 16px rgba(43, 52, 69, 0.1)',
                            },
                        }}
                    >
                        Update Category
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminEditCategoryPage;
