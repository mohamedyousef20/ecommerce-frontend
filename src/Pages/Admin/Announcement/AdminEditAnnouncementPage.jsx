import React, { useEffect } from 'react';
import AddAnnouncementHook from '../../../customHooks/Admin/Announcement/AddAnnouncementHook';
import { Box, Stack, TextField, Typography, Grid, Button, CircularProgress } from '@mui/material';
import MultipleImageInput from '../../../Components/Admin/AdminAllProduct/MultipleImageInput';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { useParams } from 'react-router-dom';
import { editAnnouncement, getOneAnnouncement } from '../../../redux/action/announcementAction';
import { useState } from 'react';
import SingleImageInput from '../../../Components/Admin/AdminAllProduct/SingleImageInput';
import LoadingProgress from '../../../Components/LoadingProgress';
import Notification from '../../../customHooks/useNotification';
import EditAnnouncementHook from '../../../customHooks/Admin/Announcement/EditAnnouncementHook';

const AdminEditAnnouncementPage = () => {
    const { id } = useParams();

    const [
        announcementTitle,
        setAnnouncementTitle,
        announcementDesc,
        setAnnouncementDesc,
        announcementImage,
        setAnnouncementImage,
        loading,
        setLoading,
        handleTitleChange,
        handleDescChange,
        handleSubmit
    ] = EditAnnouncementHook(id);
    return (
        <>
            <LoadingProgress loading={loading} />
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
                        Edit Announcement

                    </Typography>


                    {announcementImage ?
                        <SingleImageInput image={announcementImage} setImage={setAnnouncementImage} />
                        // {image && <p>Image uploaded successfully!</p>}
                        : null}




                    <Grid container spacing={3} sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Enter Announcement Name"
                                variant="outlined"
                                value={announcementTitle}
                                onChange={handleTitleChange}
                                sx={{
                                    mb: 3,
                                    '& .MuiInputBase-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Enter Announcement Desc"
                                variant="outlined"
                                value={announcementDesc}
                                onChange={handleDescChange}
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
                            Update Announcement
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdminEditAnnouncementPage;
