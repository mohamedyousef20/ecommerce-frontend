import React, { useState } from 'react';
import {
  Grid, Box, Checkbox, Button, Modal,
  IconButton, Typography, Divider, Paper, CircularProgress
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import PaginationTabs from '../../Utils/Pagination';
import AdminDeleteCategoryHook from '../../../customHooks/Admin/Category/AdminDeleteCategoryHook';
import AdminGetAllCategoryHook from '../../../customHooks/Category/AdminGetAllCategoryHook';

const Categories = () => {

  const
    [
      category,
      loading,
      pagination,
      page
    ] = AdminGetAllCategoryHook();

  const [
    open,
    setOpen,
    categoryIdToDelete,
    setCategoryIdToDelete,
    handleOpenModal,
    handleCloseModal,
    handleDelete] = AdminDeleteCategoryHook()

  return (
    <Box sx={{ padding: 2, flex: 1, bgcolor: '#f4f4f4' }}>
      <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} gutterBottom>
        Categories
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      {/* Add New Category Button */}
      <Link to={'/dashboard/category/create'}>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            mb: 5,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Add New Category
        </Button>


      </Link>
      {/* Category Grid */}
      <Paper>
        <Grid container spacing={3}>
          {/* Header Row */}
          <Grid container item xs={12} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            bgcolor: '#f1f1f1',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}>
            <Grid item xs={1}>
              <Typography fontWeight="bold">Select</Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Typography fontWeight="bold">Image</Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4}>
              <Typography fontWeight="bold">Name</Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={3}>
              <Typography fontWeight="bold">Actions</Typography>
            </Grid>
          </Grid>

          {/* Category Rows */}
          {category && category.data ?

            category.data.map((category) => (
              <Grid container item xs={12} key={category._id}
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
                <Grid item xs={1}>
                  <Checkbox
                  // checked={selectedCategories.includes(category._id)}
                  // onChange={() => handleSelectCategory(category._id)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <img src={category.image} alt={category} style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }} />
                </Grid>
                <Grid item xs={4}>
                  {/* <Typography>{category.name}</Typography> */}
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Link to={`/category`}>
                    <IconButton sx={{ color: 'black' }}>
                      <Visibility sx={{ color: 'black' }} />
                    </IconButton>
                </Link>
                  <Link to={`/dashboard/category/update/${category._id}`}>
                    <IconButton sx={{ color: 'blue' }}>
                      <Edit sx={{ color: 'blue' }} />
                    </IconButton>
                  </Link>
                  <IconButton sx={{ color: 'red' }} onClick={() => handleOpenModal(category._id)}>
                    <Delete sx={{ color: 'red' }} />
                  </IconButton>
                </Grid>
              </Grid>
            ))

            :
            <CircularProgress />
          }
        </Grid>
      </Paper>
      {/* <PaginationTabs paginationResult={category.paginationResult} /> */}

      {/* Delete Category Modal */}
      <Modal
        open={open}
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
            boxShadow: 18,
            p: 4,
            outline: 'none',
          }}
        >
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this category?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              onClick={handleDelete}
              sx={{
                fontWeight: 600,
                boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                '&:hover': {
                  backgroundColor: '#ff0000',
                  color: '#fff',
                },
              }}
            >
              Delete
            </Button>
            <Button
              onClick={handleCloseModal}
              sx={{
                fontWeight: 600,
                boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                color: '#000',
                '&:hover': {
                  backgroundColor: 'green',
                  color: '#fff',
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

export default Categories;
