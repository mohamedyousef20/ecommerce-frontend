import React, { useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllAnnouncement, getAnnouncementHomePage } from '../../../redux/action/announcementAction';



const AnnouncementSection = () => {
    const dispatch = useDispatch();


    // useEffect(() => {TODO

    //     const getAnn = async () => {
    //         await dispatch(getAllAnnouncement())
    //     }

    //     getAnn();

    // }, [])


    useEffect(() => {

        const getAnn = async () => {
            await dispatch(getAnnouncementHomePage())
        }

        getAnn();

    }, [])


   
    const announcements = useSelector((state) => state.announcementReducer.getAllAnnouncementHomePage)
    return (
        <Box sx={{ backgroundColor: '#f4f4f4', py: 4 }}>
         
            {/* Static Width Announcement Cards */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    flexWrap: 'wrap', // Wrap cards to the next line on small screens
                }}
            >
                {announcements && announcements.data ? announcements.data.slice(0, 3).map((announcement) => (
                    <Card
                        key={announcement._id}
                        sx={{
                            width: '200px', // Static width for all cards
                            borderRadius: 1,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            '&:hover': {
                                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            },
                            textAlign: 'center',
                        }}
                    >
                        {/* Announcement Image */}
                        <CardMedia
                            component="img"
                            // width={'100%'}
                            // height={'50%'}
                            image={announcement.image}
                            alt={announcement.title}
                            sx={{ objectFit: 'cover' }}
                        />

                        {/* Announcement Content */}
                        <CardContent sx={{ padding: '8px' }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{ color: '#151515', mb: 1, fontSize: '0.9rem' }}
                            >
                                {announcement.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: '#555', mb: 1, fontSize: '0.8rem' }}
                            >
                                {announcement.desc}
                            </Typography>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: '#ff5722',
                                    color: '#fff',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    '&:hover': { backgroundColor: '#e64a19' },
                                }}
                            >
                                {/* {announcement.buttonText} */}
                                Shop Now
                            </Button>
                        </CardContent>
                    </Card>
                )) : <CircularProgress />}
            </Box>
        </Box>
    );
};

export default AnnouncementSection;
