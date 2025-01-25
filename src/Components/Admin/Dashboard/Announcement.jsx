import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/lib/exports';
import {
    Grid, Box, Checkbox, Button, IconButton, Typography, Divider,
    Paper, CircularProgress, useMediaQuery,
    Switch
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { activeAnnouncement, deleteAnnouncement, getAllAnnouncement } from '../../../redux/action/announcementAction';
import WarningModal from '../../Utils/WarningModal';
import GetAllAnnouncementHook from '../../../customHooks/Admin/Announcement/GetAllAnnouncementHook';
import DeleteAnnouncementHook from '../../../customHooks/Admin/Announcement/DeleteAnnouncementHook';

const Announcement = () => {

    const [announcements] = GetAllAnnouncementHook();
    const [
        isModalOpen,
        setIsModalOpen,
        itemId,
        setItemId,
        handleCancelDelete,
        handleConfirmDelete] = DeleteAnnouncementHook();

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));



    const dispatch = useDispatch();


    const handleToggleActive = async (announcement) => {


        await dispatch(activeAnnouncement(announcement._id));


    };

    return (
        <Box sx={{ padding: 2, flex: 1, bgcolor: '#f4f4f4' }}>
            {/* Title */}
            <Typography
                variant="h4"
                sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, marginBottom: 2 }}
            >
                Announcement
            </Typography>

            {/* Add New Announcement Button */}
            <Link to={'/dashboard/announcement/create'}>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    color="primary"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        mb: 3,
                        width: { xs: '100%', sm: 'auto' },
                    }}
                >
                    Add New Announcement
                </Button>
            </Link>

            {/* Announcement Table */}
            <Box sx={{ overflowX: 'auto' }}>
                <Paper>
                    <Grid container spacing={2}>
                        {/* Table Header */}
                        <Grid
                            container
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                bgcolor: '#f1f1f1',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                padding: 1,
                            }}
                        >
                            {!isSmallScreen && (
                                <Grid item xs={1}>
                                    <Typography fontWeight="bold">Select</Typography>
                                </Grid>
                            )}
                            <Grid item xs={isSmallScreen ? 3 : 2}>
                                <Typography fontWeight="bold">Image</Typography>
                            </Grid>
                            <Grid item xs={isSmallScreen ? 3 : 2}>
                                <Typography fontWeight="bold">Title</Typography>
                            </Grid>
                            <Grid item xs={isSmallScreen ? 3 : 3}>
                                <Typography fontWeight="bold">Description</Typography>
                            </Grid>
                            {!isSmallScreen && (
                                <Grid item xs={2}>
                                    <Typography fontWeight="bold">Active</Typography>
                                </Grid>
                            )}
                            <Grid item xs={isSmallScreen ? 3 : 2}>
                                <Typography fontWeight="bold">Actions</Typography>
                            </Grid>
                        </Grid>

                        {/* Table Body */}
                        {announcements && announcements.data ? (
                            announcements.data.map((announcement) => (
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    key={announcement._id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 1,
                                        borderRadius: 1,
                                        justifyContent: 'flex-start',
                                        bgcolor: '#fff',
                                        borderBottom: '1px solid #ddd',
                                    }}
                                >
                                    {!isSmallScreen && (
                                        <Grid item xs={1}>
                                            <Checkbox sx={{ color: 'success', bgcolor: '#f1f1f1' }} />
                                        </Grid>
                                    )}
                                    <Grid item xs={2}>
                                        <img src={announcement.image} alt={announcement.name} style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '10px',
                                            objectFit: 'cover',
                                        }} />
                                    </Grid>
                                    <Grid item xs={isSmallScreen ? 3 : 2}>
                                        <Typography>{announcement.title}</Typography>
                                    </Grid>
                                    <Grid item xs={isSmallScreen ? 3 : 3}>
                                        <Typography>{announcement.desc}</Typography>
                                    </Grid>
                                    {!isSmallScreen && (
                                        <Grid item xs={2}>
                                            <Switch
                                                checked={announcement.isActive}
                                                onChange={() => handleToggleActive(announcement)}
                                            // announcement.isActive == true;TODO}
                                            color="success"
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={isSmallScreen ? 3 : 2} sx={{ textAlign: 'center' }}>
                                        <Link to="/#announcement-section">

                                            <IconButton>
                                                <Visibility />
                                            </IconButton>
                                        </Link>
                                        <Link to={`/dashboard/update/announcement/${announcement._id}`}>
                                            <IconButton>
                                                <Edit sx={{ color: 'blue' }} />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            onClick={() => {
                                                setItemId(announcement._id);
                                                setIsModalOpen(true);
                                            }}
                                            sx={{ color: 'red' }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <CircularProgress />
                            </Box>
                        )}
                    </Grid>
                </Paper>
            </Box>

            {/* Delete Confirmation Modal */}
            <WarningModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                message="Are you sure you want to delete this Announcement?"
            />
        </Box>
    );
};

export default Announcement;
