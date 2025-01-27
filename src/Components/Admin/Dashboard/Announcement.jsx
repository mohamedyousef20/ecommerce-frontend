
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/lib/exports';
import {
    Grid, Box, Checkbox, Button, IconButton, Typography, Divider,
    Paper, CircularProgress, useMediaQuery
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { deleteAnnouncement, getAllAnnouncement } from '../../../redux/action/announcementAction';
import WarningModal from '../../Utils/WarningModal';

const Announcement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemId, setItemId] = useState(null);

    const dispatch = useDispatch();
    const announcements = useSelector((state) => state.announcementReducer.getAllAnnouncement);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch(getAllAnnouncement());
    }, [dispatch]);

    const handleCancelDelete = () => setIsModalOpen(false);

    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        await dispatch(deleteAnnouncement(itemId));
        window.location.reload(true);
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
                                            <Typography>{announcement.isActive ? 'Yes' : 'No'}</Typography>
                                        </Grid>
                                    )}
                                    <Grid item xs={isSmallScreen ? 3 : 2} sx={{ textAlign: 'center' }}>
                                        <IconButton>
                                            <Visibility />
                                        </IconButton>
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


// // import { useEffect, useState } from 'react';
// // import { useSelector, useDispatch } from 'react-redux/lib/exports';
// // import {
// //     Grid, Box, Checkbox, Button, IconButton, Typography, Divider,
// //     Paper, CircularProgress, useMediaQuery, Card, CardContent,
// //     Switch, Stack, Container, Alert
// // } from '@mui/material';
// // import { Add, Delete, Edit, Visibility, NotificationsActive } from "@mui/icons-material";
// // import { Link } from 'react-router-dom';
// // import { activeAnnouncement, deleteAnnouncement, getAllAnnouncement } from '../../../redux/action/announcementAction';
// // import WarningModal from '../../Utils/WarningModal';
// // import GetAllAnnouncementHook from '../../../customHooks/Admin/Announcement/GetAllAnnouncementHook';
// // import DeleteAnnouncementHook from '../../../customHooks/Admin/Announcement/DeleteAnnouncementHook';

// // const Announcement = () => {
// //     const [announcements] = GetAllAnnouncementHook();
// //     const [
// //         isModalOpen,
// //         setIsModalOpen,
// //         itemId,
// //         setItemId,
// //         handleCancelDelete,
// //         handleConfirmDelete
// //     ] = DeleteAnnouncementHook();

// //     const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
// //     const dispatch = useDispatch();

// //     const handleToggleActive = async (announcement) => {
// //         await dispatch(activeAnnouncement(announcement._id));
// //     };

// //     return (
// //         <Box sx={{ 
// //             minHeight: '100vh',
// //             backgroundColor: '#F8FAFC',
// //             py: 4
// //         }}>
// //             <Container maxWidth="xl">
// //                 {/* Header Section */}
// //                 <Box sx={{
// //                     display: 'flex',
// //                     justifyContent: 'space-between',
// //                     alignItems: 'center',
// //                     mb: 4
// //                 }}>
// //                     <Stack direction="row" spacing={2} alignItems="center">
// //                         <NotificationsActive sx={{ 
// //                             color: '#1976D2',
// //                             fontSize: { xs: 28, sm: 32 }
// //                         }} />
// //                         <Typography
// //                             variant="h4"
// //                             sx={{
// //                                 fontSize: { xs: '1.5rem', sm: '2rem' },
// //                                 fontWeight: 600,
// //                                 color: '#1976D2'
// //                             }}
// //                         >
// //                             Announcements
// //                         </Typography>
// //                     </Stack>

// //                     <Button
// //                         component={Link}
// //                         to="/dashboard/announcement/create"
// //                         variant="contained"
// //                         startIcon={<Add />}
// //                         sx={{
// //                             borderRadius: '12px',
// //                             py: 1.5,
// //                             px: { xs: 2, sm: 3 },
// //                             backgroundColor: '#1976D2',
// //                             '&:hover': {
// //                                 backgroundColor: '#1565C0'
// //                             }
// //                         }}
// //                     >
// //                         New Announcement
// //                     </Button>
// //                 </Box>

// //                 {/* Announcements Grid */}
// //                 <Grid container spacing={3}>
// //                     {announcements && announcements.data ? (
// //                         announcements.data.map((announcement) => (
// //                             <Grid item xs={12} sm={6} md={4} key={announcement._id}>
// //                                 <Card sx={{
// //                                     height: '100%',
// //                                     borderRadius: '16px',
// //                                     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
// //                                     transition: 'transform 0.2s ease-in-out',
// //                                     '&:hover': {
// //                                         transform: 'translateY(-4px)'
// //                                     }
// //                                 }}>
// //                                     <CardContent>
// //                                         <Box sx={{ position: 'relative' }}>
// //                                             <img 
// //                                                 src={announcement.image} 
// //                                                 alt={announcement.title}
// //                                                 style={{
// //                                                     width: '100%',
// //                                                     height: '200px',
// //                                                     borderRadius: '12px',
// //                                                     objectFit: 'cover',
// //                                                     marginBottom: '16px'
// //                                                 }}
// //                                             />
// //                                             <Switch
// //                                                 checked={announcement.isActive}
// //                                                 onChange={() => handleToggleActive(announcement)}
// //                                                 color="success"
// //                                                 sx={{
// //                                                     position: 'absolute',
// //                                                     top: 8,
// //                                                     right: 8,
// //                                                     bgcolor: 'rgba(255, 255, 255, 0.9)',
// //                                                     borderRadius: '12px',
// //                                                     '& .MuiSwitch-thumb': {
// //                                                         bgcolor: announcement.isActive ? '#2E7D32' : '#grey.500'
// //                                                     }
// //                                                 }}
// //                                             />
// //                                         </Box>

// //                                         <Typography 
// //                                             variant="h6" 
// //                                             sx={{ 
// //                                                 mb: 1,
// //                                                 fontWeight: 600,
// //                                                 color: '#1F2937'
// //                                             }}
// //                                         >
// //                                             {announcement.title}
// //                                         </Typography>

// //                                         <Typography 
// //                                             color="text.secondary" 
// //                                             sx={{ 
// //                                                 mb: 2,
// //                                                 display: '-webkit-box',
// //                                                 WebkitLineClamp: 3,
// //                                                 WebkitBoxOrient: 'vertical',
// //                                                 overflow: 'hidden',
// //                                                 minHeight: '4.5em'
// //                                             }}
// //                                         >
// //                                             {announcement.desc}
// //                                         </Typography>

// //                                         <Stack 
// //                                             direction="row" 
// //                                             spacing={1} 
// //                                             justifyContent="flex-end"
// //                                             sx={{ mt: 2 }}
// //                                         >
// //                                             <IconButton
// //                                                 component={Link}
// //                                                 to="/#announcement-section"
// //                                                 sx={{
// //                                                     color: '#1976D2',
// //                                                     '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
// //                                                 }}
// //                                             >
// //                                                 <Visibility />
// //                                             </IconButton>
// //                                             <IconButton
// //                                                 component={Link}
// //                                                 to={`/dashboard/update/announcement/${announcement._id}`}
// //                                                 sx={{
// //                                                     color: '#1976D2',
// //                                                     '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
// //                                                 }}
// //                                             >
// //                                                 <Edit />
// //                                             </IconButton>
// //                                             <IconButton
// //                                                 onClick={() => {
// //                                                     setItemId(announcement._id);
// //                                                     setIsModalOpen(true);
// //                                                 }}
// //                                                 sx={{
// //                                                     color: '#DC2626',
// //                                                     '&:hover': { backgroundColor: 'rgba(220, 38, 38, 0.04)' }
// //                                                 }}
// //                                             >
// //                                                 <Delete />
// //                                             </IconButton>
// //                                         </Stack>
// //                                     </CardContent>
// //                                 </Card>
// //                             </Grid>
// //                         ))
// //                     ) : (
// //                         <Grid item xs={12}>
// //                             <Box sx={{ 
// //                                 display: 'flex', 
// //                                 justifyContent: 'center',
// //                                 alignItems: 'center',
// //                                 minHeight: '200px'
// //                             }}>
// //                                 <CircularProgress sx={{ color: '#1976D2' }} />
// //                             </Box>
// //                         </Grid>
// //                     )}
// //                 </Grid>

// //                 {/* Warning Modal */}
// //                 <WarningModal
// //                     open={isModalOpen}
// //                     onClose={handleCancelDelete}
// //                     onConfirm={handleConfirmDelete}
// //                     title="Delete Announcement"
// //                     message="Are you sure you want to delete this announcement? This action cannot be undone."
// //                 />
// //             </Container>
// //         </Box>
// //     );
// // };

// // export default Announcement;

// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux/lib/exports';
// import {
//     Grid, Box, Checkbox, Button, IconButton, Typography, Divider,
//     Paper, CircularProgress, useMediaQuery, Card, CardContent,
//     Switch, Stack, Container, Alert
// } from '@mui/material';
// import { Add, Delete, Edit, Visibility, NotificationsActive } from "@mui/icons-material";
// import { Link } from 'react-router-dom';
// import { activeAnnouncement, deleteAnnouncement, getAllAnnouncement } from '../../../redux/action/announcementAction';
// import WarningModal from '../../Utils/WarningModal';
// import GetAllAnnouncementHook from '../../../customHooks/Admin/Announcement/GetAllAnnouncementHook';
// import DeleteAnnouncementHook from '../../../customHooks/Admin/Announcement/DeleteAnnouncementHook';

// const Announcement = () => {
//     const [announcements] = GetAllAnnouncementHook();
//     const [
//         isModalOpen,
//         setIsModalOpen,
//         itemId,
//         setItemId,
//         handleCancelDelete,
//         handleConfirmDelete
//     ] = DeleteAnnouncementHook();

//     const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
//     const dispatch = useDispatch();

//     const handleToggleActive = async (announcement) => {
//         await dispatch(activeAnnouncement(announcement._id));
//     };

//     return (
//         <Box sx={{
//             minHeight: '100vh',
//             backgroundColor: '#F8FAFC',
//             py: 4
//         }}>
//             <Container maxWidth="xl">
//                 {/* Header Section */}
//                 <Box sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     mb: 4
//                 }}>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                         <NotificationsActive sx={{
//                             color: '#1976D2',
//                             fontSize: { xs: 28, sm: 32 }
//                         }} />
//                         <Typography
//                             variant="h4"
//                             sx={{
//                                 fontSize: { xs: '1.5rem', sm: '2rem' },
//                                 fontWeight: 600,
//                                 color: '#1976D2'
//                             }}
//                         >
//                             Announcements
//                         </Typography>
//                     </Stack>

//                     <Button
//                         component={Link}
//                         to="/dashboard/announcement/create"
//                         variant="contained"
//                         startIcon={<Add />}
//                         sx={{
//                             borderRadius: '12px',
//                             py: 1.5,
//                             px: { xs: 2, sm: 3 },
//                             backgroundColor: '#1976D2',
//                             '&:hover': {
//                                 backgroundColor: '#1565C0'
//                             }
//                         }}
//                     >
//                         New Announcement
//                     </Button>
//                 </Box>

//                 {/* Announcements Grid */}
//                 <Grid container spacing={3}>
//                     {announcements && announcements.data ? (
//                         announcements.data.map((announcement) => (
//                             <Grid item xs={12} sm={6} md={4} key={announcement._id}>
//                                 <Card sx={{
//                                     height: '100%',
//                                     borderRadius: '16px',
//                                     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
//                                     transition: 'transform 0.2s ease-in-out',
//                                     '&:hover': {
//                                         transform: 'translateY(-4px)'
//                                     }
//                                 }}>
//                                     <CardContent>
//                                         <Box sx={{ position: 'relative' }}>
//                                             <img
//                                                 src={announcement.image}
//                                                 alt={announcement.title}
//                                                 style={{
//                                                     width: '100%',
//                                                     height: '200px',
//                                                     borderRadius: '12px',
//                                                     objectFit: 'cover',
//                                                     marginBottom: '16px'
//                                                 }}
//                                             />
//                                             <Switch
//                                                 checked={announcement.isActive}
//                                                 onChange={() => handleToggleActive(announcement)}
//                                                 color="success"
//                                                 sx={{
//                                                     position: 'absolute',
//                                                     top: 8,
//                                                     right: 8,
//                                                     bgcolor: 'rgba(255, 255, 255, 0.9)',
//                                                     borderRadius: '12px',
//                                                     '& .MuiSwitch-thumb': {
//                                                         bgcolor: announcement.isActive ? '#2E7D32' : '#grey.500'
//                                                     }
//                                                 }}
//                                             />
//                                         </Box>

//                                         <Typography
//                                             variant="h6"
//                                             sx={{
//                                                 mb: 1,
//                                                 fontWeight: 600,
//                                                 color: '#1F2937'
//                                             }}
//                                         >
//                                             {announcement.title}
//                                         </Typography>

//                                         <Typography
//                                             color="text.secondary"
//                                             sx={{
//                                                 mb: 2,
//                                                 display: '-webkit-box',
//                                                 WebkitLineClamp: 3,
//                                                 WebkitBoxOrient: 'vertical',
//                                                 overflow: 'hidden',
//                                                 minHeight: '4.5em'
//                                             }}
//                                         >
//                                             {announcement.desc}
//                                         </Typography>

//                                         <Stack
//                                             direction="row"
//                                             spacing={1}
//                                             justifyContent="flex-end"
//                                             sx={{ mt: 2 }}
//                                         >
//                                             <IconButton
//                                                 component={Link}
//                                                 to="/#announcement-section"
//                                                 sx={{
//                                                     color: '#1976D2',
//                                                     '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
//                                                 }}
//                                             >
//                                                 <Visibility />
//                                             </IconButton>
//                                             <IconButton
//                                                 component={Link}
//                                                 to={`/dashboard/update/announcement/${announcement._id}`}
//                                                 sx={{
//                                                     color: '#1976D2',
//                                                     '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
//                                                 }}
//                                             >
//                                                 <Edit />
//                                             </IconButton>
//                                             <IconButton
//                                                 onClick={() => {
//                                                     setItemId(announcement._id);
//                                                     setIsModalOpen(true);
//                                                 }}
//                                                 sx={{
//                                                     color: '#DC2626',
//                                                     '&:hover': { backgroundColor: 'rgba(220, 38, 38, 0.04)' }
//                                                 }}
//                                             >
//                                                 <Delete />
//                                             </IconButton>
//                                         </Stack>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         ))
//                     ) : (
//                         <Grid item xs={12}>
//                             <Box sx={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 minHeight: '200px'
//                             }}>
//                                 <CircularProgress sx={{ color: '#1976D2' }} />
//                             </Box>
//                         </Grid>
//                     )}
//                 </Grid>

//                 {/* Warning Modal */}
//                 <WarningModal
//                     open={isModalOpen}
//                     onClose={handleCancelDelete}
//                     onConfirm={handleConfirmDelete}
//                     title="Delete Announcement"
//                     message="Are you sure you want to delete this announcement? This action cannot be undone."
//                 />
//             </Container>
//         </Box>
//     );
// };

// export default Announcement;
