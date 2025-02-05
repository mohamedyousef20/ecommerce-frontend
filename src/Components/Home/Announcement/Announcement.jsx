import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Alert,
    useTheme,
    Grid,
} from '@mui/material';
import { getAnnouncementHomePage } from '../../../redux/action/announcementAction';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const AnnouncementSection = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [featuredAnnouncement, setFeaturedAnnouncement] = useState(null);
    const [otherAnnouncements, setOtherAnnouncements] = useState([]);

    useEffect(() => {
        dispatch(getAnnouncementHomePage());
    }, [dispatch]);

    const announcements = useSelector(state => state.announcementReducer.getAllAnnouncementHomePage);

    useEffect(() => {
        if (announcements?.data?.length > 0) {
            const shuffled = [...announcements.data].sort(() => 0.5 - Math.random());
            setFeaturedAnnouncement(shuffled[0]);
            setOtherAnnouncements(shuffled.slice(1, 6));
        }
    }, [announcements]);

    return (
        <Box sx={{
            py: 8,
            px: { xs: 2, md: 6 },
            backgroundColor: '#f5f5f5',
        }}>
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    mb: 6,
                    color: theme.palette.primary.main,
                }}
            >
                Latest Announcements
            </Typography>

            {!announcements?.data ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : announcements.data.length > 0 ? (
                <Grid container spacing={4} sx={{ maxWidth: 1280, margin: '0 auto' }}>
                    {/* Featured Announcement */}
                    {featuredAnnouncement && (
                        <Grid item xs={12} md={8}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 4,
                                    boxShadow: 3,
                                    '&:hover': {
                                        boxShadow: 6,
                                    },
                                    transition: 'all 0.3s ease',
                                }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            height: 400,
                                            objectFit: 'cover',
                                            borderTopLeftRadius: 16,
                                            borderTopRightRadius: 16,
                                        }}
                                        image={featuredAnnouncement.image || 'https://via.placeholder.com/800x400'}
                                        alt={featuredAnnouncement.title}
                                    />
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h4" gutterBottom>
                                            {featuredAnnouncement.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                            {featuredAnnouncement.date}
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            {featuredAnnouncement.desc}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                mt: 2,
                                                borderRadius: 2,
                                                px: 4,
                                                py: 1.5,
                                                textTransform: 'none',
                                            }}
                                        >
                                            Learn More
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    )}

                    {/* Other Announcements */}
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={4} sx={{ height: '100%' }}>
                            {otherAnnouncements.map((announcement, index) => (
                                <Grid item xs={12} key={announcement._id}>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card sx={{
                                            height: '100%',
                                            borderRadius: 3,
                                            boxShadow: 2,
                                            '&:hover': {
                                                boxShadow: 4,
                                            },
                                            transition: 'all 0.3s ease',
                                        }}>
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    height: 200,
                                                    objectFit: 'cover',
                                                    borderTopLeftRadius: 12,
                                                    borderTopRightRadius: 12,
                                                }}
                                                image={announcement.image || 'https://via.placeholder.com/400x300'}
                                                alt={announcement.title}
                                            />
                                            <CardContent sx={{ p: 3 }}>
                                                <Typography variant="h6" gutterBottom>
                                                    {announcement.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    {announcement.date}
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderRadius: 2,
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Alert severity="info" sx={{ width: '100%', maxWidth: 600 }}>
                        No announcements available at the moment
                    </Alert>
                </Box>
            )}
        </Box>
    );
};

export default AnnouncementSection;