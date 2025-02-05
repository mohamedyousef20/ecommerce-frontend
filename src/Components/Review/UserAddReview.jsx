import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Rating,
    Snackbar,
    CircularProgress,
    Paper,
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogActions,
    Stack,
    useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { createReview, deleteReview, editReview, getAllReview } from '../../redux/action/reviewAction';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const ReviewSection = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const theme = useTheme();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const [user, setUser] = useState("");

    const review = useSelector((state) => state.reviewReducer.getAllReview);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("user") != null) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    useEffect(() => {
        const get = async () => {
            setLoading(true);
            await dispatch(getAllReview(id));
            setLoading(false);
        };
        get();
    }, [dispatch, id]);

    const handleEditClick = (review) => {
        setEditMode(review._id);
        setComment(review.title);
        setRating(review.rating);
    };

    const handleSaveEdit = async (reviewId) => {
        await dispatch(editReview(reviewId, { title: comment, rating: rating }));
        setSnackbarMessage('Review updated successfully!');
        setOpenSnackbar(true);
        setEditMode(null);
        window.location.reload(true);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        if (!user || user.active === false) {
            setSnackbarMessage('You are not allowed to add a review.');
            setOpenSnackbar(true);
            return;
        }

        if (review?.data?.some((rev) => rev?.user?._id === user._id)) {
            setSnackbarMessage('You have already submitted a review.');
            setOpenSnackbar(true);
            return;
        }

        if (!comment || rating === 0) {
            setSnackbarMessage('Please provide a rating and comment.');
            setOpenSnackbar(true);
            return;
        }

        const newReview = { rating, title: comment, product: id };
        dispatch(createReview(newReview));
        setComment('');
        setRating(0);
        setSnackbarMessage('Review submitted successfully!');
        setOpenSnackbar(true);
        window.location.reload(true);
    };

    const handleDeleteClick = (reviewId) => {
        setReviewToDelete(reviewId);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (reviewToDelete) {
            await dispatch(deleteReview(reviewToDelete));
            setSnackbarMessage('Review deleted successfully!');
            setOpenSnackbar(true);
            setDeleteDialogOpen(false);
            window.location.reload(true);
        }
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setReviewToDelete(null);
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            {/* Add Review Section */}
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    marginBottom: 4,
                    borderRadius: 4,
                    background: theme.palette.background.paper,
                }}
            >
                <Stack direction={'column'} alignItems={'center'} spacing={2}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Add a Review
                    </Typography>
                    <TextField
                        fullWidth
                        label="Your Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        multiline
                        rows={3}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Rating
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        size="large"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReviewSubmit}
                        disabled={loading}
                        sx={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': { transform: 'scale(1.05)' },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Add Review"}
                    </Button>
                </Stack>
            </Paper>

            {/* All Reviews Section */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                All Reviews
            </Typography>
            {review?.data?.length
                ? review.data.map((rev, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Paper
                            elevation={2}
                            sx={{
                                padding: 3,
                                marginBottom: 2,
                                borderRadius: 4,
                                background: theme.palette.background.paper,
                                '&:hover': { boxShadow: 6 },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <Avatar
                                        src={rev?.user?.profileImage || null}
                                        alt={rev?.user?.name || 'User'}
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            bgcolor: rev?.user?.profileImage ? 'transparent' : 'primary.main',
                                            color: 'white',
                                            fontSize: '1.2rem',
                                            marginRight: 2,
                                        }}
                                    >
                                        {!rev?.user?.profileImage && rev?.user?.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Box>

                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {rev?.user?.name || 'Anonymous User'}
                                        </Typography>

                                        <Rating value={rev.rating} readOnly size="small" />
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{ marginTop: 1 }}
                                        >
                                            {rev.title}
                                        </Typography>
                                    </Box>
                                </Box>
                                {rev?.user?._id === user?._id && !editMode && (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton
                                            onClick={() => handleEditClick(rev)}
                                            aria-label="edit review"
                                            sx={{ '&:hover': { color: theme.palette.primary.main } }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDeleteClick(rev._id)}
                                            aria-label="delete review"
                                            color="error"
                                            sx={{ '&:hover': { color: theme.palette.error.dark } }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        </Paper>
                    </motion.div>
                ))
                : loading ? <CircularProgress /> : <Typography>No reviews yet.</Typography>}

            {/* Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                PaperProps={{ sx: { borderRadius: 4 } }}
            >
                <DialogTitle fontWeight="bold">Are you sure you want to delete this review?</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={handleCancelDelete}
                        color="secondary"
                        sx={{ textTransform: 'none', borderRadius: '8px' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        sx={{ textTransform: 'none', borderRadius: '8px' }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{ borderRadius: 4 }}
            />
        </Box>
    );
};

export default ReviewSection;