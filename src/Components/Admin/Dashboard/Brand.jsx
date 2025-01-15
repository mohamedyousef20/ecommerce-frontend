import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { deleteBrand, getAllBrand } from '../../../redux/action/brandAction';
import { Box, Button, Checkbox, CircularProgress, Divider, Grid, IconButton, Modal, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import PaginationTabs from '../../Utils/Pagination';
import AdminGetAllBrandHook from '../../../customHooks/Admin/Brand/AdminGetAllBrandHook';

const Brand = () => {

  const [
    selectedBrand,
    setSelectedBrand,
    open,
    setOpen,
    brandIdToDelete,
    setBrandIdToDelete,
    handleSelectBrand,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
    brand

  ] = AdminGetAllBrandHook();

  return (
    <Box sx={{ padding: 2, flex: 1, bgcolor: '#f4f4f4' }}>
      <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} gutterBottom>
        brand
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      {/* Add New brand Button */}
      <Link to={'/dashboard/brand/create'}>
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
          Add New brand
        </Button>


      </Link>
      {/* brand Grid */}
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

          {/* brand Rows */}
          {!brand.data ? (
            <CircularProgress />
          ) : (
            brand.data.map((brand) => (
              <Grid container item xs={12} key={brand._id}
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
                    checked={selectedBrand.includes(brand._id)}
                    onChange={() => handleSelectBrand(brand._id)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <img src={brand.image} alt={brand.name} style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }} />
                </Grid>
                <Grid item xs={4}>
                  <Typography>{brand.name}</Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <IconButton sx={{ color: 'black' }}>
                    <Visibility sx={{ color: 'black' }} />
                  </IconButton>
                  <Link to={`/dashboard/brand/update/${brand._id}`}>
                    <IconButton sx={{ color: 'blue' }}>
                      <Edit sx={{ color: 'blue' }} />
                    </IconButton>
                  </Link>
                  <IconButton sx={{ color: 'red' }} onClick={() => handleOpenModal(brand._id)}>
                    <Delete sx={{ color: 'red' }} />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          )}
        </Grid>
      </Paper>
      <PaginationTabs paginationResult={brand.paginationResult} />

      {/* Delete brand Modal */}
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
            Are you sure you want to delete this brand?
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
}

export default Brand
