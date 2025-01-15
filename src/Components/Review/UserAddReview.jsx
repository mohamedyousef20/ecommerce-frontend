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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { createReview, deleteReview, editReview, getAllReview } from '../../redux/action/reviewAction';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ReviewSection = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [editMode, setEditMode] = useState(null); // Track which review is being edited
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Track dialog visibility
    const [reviewToDelete, setReviewToDelete] = useState(null); // Track which review to delete

    const review = useSelector((state) => state.reviewReducer.getALLReview);
    console.log('review',review)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const get = async () => {
            setLoading(true);
            await dispatch(getAllReview(id));
            setLoading(false);
        };
        get();
    }, [dispatch, id]);

    // Handle edit functionality
    const handleEditClick = (review) => {
        setEditMode(review._id); // Set the review ID to be edited
        setReviewToDelete(review._id); // Set the review ID to be edited
        setComment(review.title); // Pre-fill the comment field
        setRating(review.rating); // Pre-fill the rating field
    };

    const handleSaveEdit = async (reviewId) => {
        await dispatch(editReview(reviewId, { title: comment, rating: rating }));
        setSnackbarMessage('Review updated successfully!');
        setOpenSnackbar(true);
        setEditMode(null); // Exit edit mode
        window.location.reload(true);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        if (!comment || rating === 0) {
            setSnackbarMessage('Please provide a rating and comment');
            setOpenSnackbar(true);
            return;
        }

        const newReview = { rating: rating, title: comment, product: id };
        dispatch(createReview(newReview));
        setComment('');
        setRating(0);
        setSnackbarMessage('Review submitted successfully!');
        setOpenSnackbar(true);
        window.location.reload(true)
    };

    // Handle delete functionality
    const handleDeleteClick = (reviewId) => {
        setReviewToDelete(reviewId);
        setDeleteDialogOpen(true); // Open the confirmation dialog
    };

    const handleConfirmDelete = async () => {
        if (reviewToDelete) {
            await dispatch(deleteReview(reviewToDelete));
            setSnackbarMessage('Review deleted successfully!');
            setOpenSnackbar(true);
            setDeleteDialogOpen(false); // Close the confirmation dialog
            window.location.reload(true);
        }
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false); // Close the confirmation dialog
        setReviewToDelete(null);
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            {/* Add Review Section */}
            <Paper sx={{ padding: 2, marginBottom: 3 }}>
                <Stack direction={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Typography variant="h6" gutterBottom>
                        Add a Review
                    </Typography>
                    <TextField
                        fullWidth
                        label="Your Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                    />
                    <Rating
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReviewSubmit}
                        disabled={loading}
                    >
                        Add Review
                    </Button>
                </Stack>
            </Paper>

            <Typography variant="h6" gutterBottom>
                All Reviews
            </Typography>
            {review?.data?.length
                ? review.data.map((rev, index) => (
                    <Paper
                        key={index}
                        sx={{
                            padding: 2,
                            marginBottom: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        {editMode === rev._id ? (
                            <Box sx={{ flex: 1 }}>
                                <TextField
                                    fullWidth
                                    label="Edit Comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    multiline
                                    rows={2}
                                    sx={{ mb: 2 }}
                                />
                                <Rating
                                    value={rating}
                                    onChange={(e, newValue) => setRating(newValue)}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleSaveEdit(rev._id)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setEditMode(null)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                <Avatar
                                    src={rev.user.profileImage}
                                    alt={rev.user.name}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: rev.user.profileImage ? 'transparent' : 'primary.main',
                                        color: 'white',
                                        fontSize: '1rem',
                                        marginRight: 2,
                                    }}
                                >
                                    {!rev.user.profileImage &&
                                        rev.user.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {rev.user.name}
                                    </Typography>
                                    <Rating value={rev.rating} readOnly />
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{ marginTop: 1 }}
                                    >
                                        {rev.title}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {rev.user._id && !editMode && (
                                <>
                                    <IconButton
                                        onClick={() => handleEditClick(rev)}
                                        aria-label="edit review"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDeleteClick(rev._id)}
                                        aria-label="delete review"
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    </Paper>
                ))
                : loading ? <CircularProgress /> : <Typography>No reviews yet.</Typography>}

            {/* Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
            >
                <DialogTitle>Are you sure you want to delete this review?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default ReviewSection;
