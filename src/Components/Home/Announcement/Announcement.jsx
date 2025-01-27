import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAnnouncementHomePage } from '../../../redux/action/announcementAction';
import { Link } from 'react-router-dom';

const AnnouncementSection = () => {
    const dispatch = useDispatch();
    const [randomAnnouncements, setRandomAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAnn = async () => {
            await dispatch(getAnnouncementHomePage());
        };
        getAnn();
    }, [dispatch]);

    const announcements = useSelector((state) => state.announcementReducer.getAllAnnouncementHomePage);

    useEffect(() => {
        if (announcements && announcements.data) {
            if (announcements.data.length > 0) {
                const shuffled = [...announcements.data].sort(() => 0.5 - Math.random()); // Shuffle array
                setRandomAnnouncements(shuffled.slice(0, 3)); // Pick first 3 items
            } else {
                // Stop circular progress
                setLoading(false);
            }
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
                    {loading ? (
                        <CircularProgress sx={{ margin: 'auto' }} />
                    ) : (
                        randomAnnouncements.length > 0 ? (
                            <Announcement announcements={randomAnnouncements} />
                        ) : (
                            <Typography variant="h6" sx={{ margin: 'auto' }}>
                                <Alert severity='info'>  No announcements found</Alert>
                            </Typography>
                        )
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

const Announcement = ({ announcements }) => {
    return (
        <Box sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
            <Typography variant="h4" sx={{ marginBottom: 3, color: '#333' }}>Announcements</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {announcements.map((announcement) => (
                            <TableRow key={announcement._id}>
                                <TableCell>{announcement.title}</TableCell>
                                <TableCell>{announcement.date}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary">Edit</Button>
                                    <Button variant="contained" color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AnnouncementSection;
