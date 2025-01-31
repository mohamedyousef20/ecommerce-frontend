import React from 'react';
import AddAnnouncementHook from '../../../customHooks/Admin/Announcement/AddAnnouncementHook';
import { Box, Stack, TextField, Typography, Grid, Button } from '@mui/material';
import SingleImageInput from '../../../Components/Admin/AdminAllProduct/SingleImageInput';
import LoadingProgress from '../../../Components/LoadingProgress';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';

const AdminAddAnnouncementPage = () => {
    const [
        loading,
        announcementImage,
        setAnnouncementImage,
        announcementTitle,
        handelTitle,
        handelDesc,
        announcementDesc,
        handleSubmit,
        errors,
    ] = AddAnnouncementHook();

    return (
        <>

            <LoadingProgress loading={loading} />
            <AdminSideBar />
            <Box sx={{ flex: 2, padding: { xs: 2, sm: 3, md: 5 }, minHeight: '100vh' }}>
                {/* Announcement Header */}
                <Box mb={3}>
                    <Typography fontSize={'1.5rem'} fontWeight={600} color='red'>
                        Announcement
                    </Typography>
                </Box>

                {/* Image Input */}
                <SingleImageInput
                    image={announcementImage}
                    setImage={setAnnouncementImage}

                />

                {/* Form Fields */}
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Enter Announcement Name"
                            variant="outlined"
                            value={announcementTitle}
                            onChange={handelTitle}
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
                            onChange={handelDesc}
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

                {/* Submit Button */}
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            px: 4,
                            py: 1.5,
                            backgroundColor: "#0295db",
                            fontWeight: '600',
                            borderRadius: "10px",
                            "&:hover": {
                                color: '#fff',
                                bgcolor: "#151515",
                                boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                            }
                        }}
                    >
                        ADD Announcement
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default AdminAddAnnouncementPage;
