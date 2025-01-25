import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAnnouncementHomePage } from '../../../redux/action/announcementAction';
import { Link } from 'react-router-dom';

const AnnouncementSection = () => {
    const dispatch = useDispatch();
    const [randomAnnouncements, setRandomAnnouncements] = useState([]);

    useEffect(() => {
        const getAnn = async () => {
            await dispatch(getAnnouncementHomePage());
        };
        getAnn();
    }, [dispatch]);

    const announcements = useSelector((state) => state.announcementReducer.getAllAnnouncementHomePage);

    useEffect(() => {
        if (announcements && announcements.data) {
            const shuffled = [...announcements.data].sort(() => 0.5 - Math.random()); // Shuffle array
            setRandomAnnouncements(shuffled.slice(0, 3)); // Pick first 3 items
        }
    }, [announcements]);

    return (
        <Box sx={{ backgroundColor: '#f4f4f4', py: 4 }} id="announcement-section">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    {randomAnnouncements.length > 0 ? (
                        randomAnnouncements.map((announcement) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={announcement._id}>
                                <Card
                                    sx={{
                                        width: '100%',
                                        borderRadius: 1,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                        },
                                        textAlign: 'center',
                                    }}
                                >
                                    <Link to={`/product`}>
                                        <CardMedia
                                            component="img"
                                            image={announcement.image}
                                            alt={announcement.title}
                                            sx={{
                                                objectFit: 'cover',
                                                height: { xs: '150px', sm: '200px', md: '250px' },
                                            }}
                                        />
                                    </Link>

                                    <CardContent sx={{ padding: '8px' }}>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                            sx={{
                                                color: '#151515',
                                                mb: 1,
                                                fontSize: { xs: '0.8rem', sm: '1rem' },
                                            }}
                                        >
                                            {announcement.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#555',
                                                mb: 1,
                                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                            }}
                                        >
                                            {announcement.desc}
                                        </Typography>
                                        <Link to={`/product`}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#ff5722',
                                                    color: '#fff',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                                    '&:hover': { backgroundColor: '#e64a19' },
                                                }}
                                            >
                                                Shop Now
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <CircularProgress sx={{ margin: 'auto' }} />
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default AnnouncementSection;
