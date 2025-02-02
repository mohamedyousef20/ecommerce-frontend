import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/lib/exports';
import {
  Grid, Box, Button, Modal, IconButton, Typography, Divider, Paper, CircularProgress, Stack
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import AdminAddSubcategoryHook from '../../../customHooks/Subcategory/AdminAddSubcategoryHook';

const Subcategory = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategory] = AdminAddSubcategoryHook();
  const dispatch = useDispatch();

  // Handle modal open
  const handleOpenModal = (id) => {
    setSelectedCategoryId(id);
    setOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCategoryId(null);
  };

  // Handle delete category
  const handleDelete = () => {
    if (selectedCategoryId) {
      // Dispatch delete action here
      // dispatch(deleteCategory(selectedCategoryId));
      handleCloseModal();
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        padding: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        mx: 'auto', // Center the container
        maxWidth: '1200px', // Adjust as needed
      }}
    >
      {/* Header */}
      <Box mb={3} textAlign="center">
        <Typography
          fontSize="1.75rem"
          fontWeight={700}
          color="#1976D2" // Royal Blue
        >
          Subcategories
        </Typography>
        <Typography
          fontSize="0.875rem"
          color="text.secondary"
          mt={1}
        >
          Manage your subcategories here.
        </Typography>
      </Box>

      {/* Add New Subcategory Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        color="primary"
        sx={{
          mb: 4,
          py: 1.5,
          backgroundColor: '#1976D2', // Royal Blue
          color: '#FFFFFF',
          borderRadius: 2,
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          boxShadow: '0px 4px 6px rgba(25, 118, 210, 0.2)',
          '&:hover': {
            backgroundColor: '#1565C0', // Darker Royal Blue
            boxShadow: '0px 6px 8px rgba(25, 118, 210, 0.3)',
          },
          '&:active': {
            backgroundColor: '#0D47A1', // Even Darker Royal Blue
          },
        }}
      >
        Add New Subcategory
      </Button>

      {/* Subcategory Grid */}
      <Paper sx={{ padding: 2, borderRadius: 2 }}>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          {/* Header row */}
          <Grid container item xs={12} sx={{ bgcolor: '#F5F5F5', borderRadius: 2, padding: 2 }}>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Name</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Category</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Actions</Typography>
            </Grid>
          </Grid>

          {/* Subcategory Rows */}
          {subcategory && subcategory.data ? (
            subcategory.data.map((subcategory) => (
              <Grid container item xs={12} key={subcategory._id} sx={{ padding: 2, alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Typography>{subcategory.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>{subcategory.category}</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', gap: 1 }}>
                  <IconButton sx={{ color: 'black' }}>
                    <Visibility />
                  </IconButton>
                  <Link to={`/admin/update-subcategory/${subcategory._id}`}>
                    <IconButton sx={{ color: 'blue' }}>
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton sx={{ color: 'red' }} onClick={() => handleOpenModal(subcategory._id)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          ) : (
            <CircularProgress sx={{ margin: 'auto', mt: 4 }} />
          )}
        </Grid>
      </Paper>

      {/* Delete Confirmation Modal */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: 'none',
          }}
        >
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="delete-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              onClick={handleDelete}
              sx={{
                backgroundColor: '#ff0000',
                color: '#FFFFFF',
                borderRadius: 2,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#cc0000',
                },
              }}
            >
              Delete
            </Button>
            <Button
              onClick={handleCloseModal}
              sx={{
                backgroundColor: '#1976D2',
                color: '#FFFFFF',
                borderRadius: 2,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#1565C0',
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Subcategory;