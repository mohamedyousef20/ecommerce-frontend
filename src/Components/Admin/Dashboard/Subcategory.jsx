// src/components/category.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/lib/exports';
// src/components/categorys.js
import React, { useState } from 'react';
import {
    Grid, Box, Checkbox, Button, Modal,
    IconButton, Typography, Divider, Paper, CircularProgress
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import AllCatePageHook from '../../../customHooks/Category/AllCatePageHook';


const Subcategory = () => {

    const [category, loading, pagination, page] = AllCatePageHook();
    console.log(category)

    return (
        <Box sx={{ padding: 2, flex: 1, bgcolor: '#d0d0d238' }}>
            <Typography variant="h4">category</Typography>
            <Divider sx={{ marginBottom: 2 }} />

            {/* Add New Category Button */}
            <Button variant="contained"
                startIcon={<Add />}
                color="primary" sx={{
                    display: 'flex',
                    justifyContent: 'flex-start', mb: 5
                }}>
                Add New Category
            </Button>
            {/* Category Grid: This mimics the "table" layout */}
            <Paper>

                <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                    {/* Header row */}
                    <Grid container item xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#161616',
                            justifyContent: 'flex-start',
                            bgcolor: '#d0d0d238'
                        }}>


                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Name</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />

                        <Grid item xs={2} >
                            <Typography fontWeight="bold">Image</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />

                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Actions</Typography>
                        </Grid>
                    </Grid>


                    {/* Category Rows */}
                    {category.data ? category.data.map((category, index) => (
                        <Grid container item xs={12} key={category._id}

                            sx={{
                                display: 'flex', alignItems: 'center',
                                padding: 1, borderRadius: 1,
                                justifyContent: 'flex-start',
                                maxWidth:"10px",
                                overflow:'hidden'
                            }}>

                            <Grid item xs={2}>
                                <Typography>{category.name}</Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Typography>{category.image}</Typography>
                            </Grid>

                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                <IconButton sx={{ color: 'black' }}>
                                    <Visibility sx={{ color: 'black' }} />
                                </IconButton >
                                <Link to={`/admin/update-category/${category._id}}`}>
                                    <IconButton sx={{ color: 'blue' }} >
                                        <Edit sx={{ color: 'blue' }} />
                                    </IconButton>
                                </Link>
                                {/* <IconButton sx={{ color: 'red' }} key={category._id} onClick={() => handleOpenModal(category._id)} >
                  <Delete sx={{ color: 'red' }} />
                </IconButton> */}
                            </Grid>
                        </Grid>
                    )) : <CircularProgress />}
                </Grid>

            </Paper>

            {/* <Modal
        open={open}
        // onClose={onClose}
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
            outline: 'none'
          }}
        >
          <Typography id="delete-modal-title" variant="h6" component="h2">
            are you ure
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              // onClick={handleDelete}
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
                color: '#',
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
      </Modal> */}
        </Box>
    )
}

export default Subcategory



