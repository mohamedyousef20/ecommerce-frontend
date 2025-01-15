import React, { useState } from 'react';
import {
    Grid, Box, Checkbox, Button, Modal,
    IconButton, Typography, Divider, Paper, CircularProgress
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import AdminDeleteProdHook from '../../../customHooks/Admin/AdminDeleteProdHook';
import AdminGetAllProd from '../../../customHooks/Admin/AdminGetAllProd';
import PaginationTabs from '../../Utils/Pagination';

const Products = ({ item }) => {
    const [
        productIdToDelete,
        setProductIdToDelete,
        open, setOpen,
        handleDelete,
        handleOpenModal,
        handleCloseModal
    ] = AdminDeleteProdHook();

    const [products] = AdminGetAllProd();
    console.log(products.paginationResult);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // Handle row selection/deselection
    const handleSelectProduct = (id) => {
        setSelectedProducts((prev) => {
            if (prev.includes(id)) {
                return prev.filter((productId) => productId !== id);
            }
            return [...prev, id];
        });
    };

    return (
        <Box sx={{ padding: 2, flex: 1, bgcolor: '#f4f4f4' }}>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} gutterBottom>
                Products
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            {/* Add New Product Button */}
            <Link to={'/dashboard/product/create'}>
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
                    Add New Product
                </Button>
            </Link>

            {/* Product Table Layout */}
            <Paper>
                <Grid container spacing={3}>
                    {/* Header row */}
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
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Name</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Category</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={1}>
                            <Typography fontWeight="bold">Price</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={1}>
                            <Typography fontWeight="bold">Quantity</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Actions</Typography>
                        </Grid>
                    </Grid>

                    {/* Product Rows */}
                    {products && products.data ? products.data.map((product) => (
                        <Grid container item xs={12} key={product._id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: 1,
                                borderRadius: 1,
                                justifyContent: 'flex-start',
                                bgcolor: '#fff',
                                borderBottom: '1px solid #ddd',
                            }}>
                            <Grid item xs={1}>
                                <Checkbox
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => handleSelectProduct(product.id)}
                                    sx={{ color: 'success', bgcolor: '#f1f1f1' }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <img src={product.imageCover} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{product.name}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                {/* Assuming category is available */}
                                {/* <Typography>{product.category.name}</Typography> */}
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>{product.price}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>{product.quantity}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>

                                {/* <IconButton sx={{ color: 'black' }} onClick={() => handleOpenModal(product)}>
                                    <Visibility sx={{ color: 'black' }} />
                                </IconButton> */}


                                <Link to={`/admin/product/update/${product._id}`}>
                                    <IconButton sx={{ color: 'blue' }}>
                                        <Edit sx={{ color: 'blue' }} />
                                    </IconButton>
                                </Link>
                                <IconButton sx={{ color: 'red' }} onClick={() => handleOpenModal(product._id)}>
                                    <Delete sx={{ color: 'red' }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    )) : <CircularProgress />}
                </Grid>
            </Paper>
            <PaginationTabs paginationResult={products.paginationResult} />

            {/* Delete Product Modal */}
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
                        Are you sure you want to delete this product?
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

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="order-details-modal"
                aria-describedby="order-details-description"
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
                    {selectedProduct ? (
                        <>
                            <Typography variant="h6" gutterBottom>Order Details</Typography>
                            <Typography variant="body1"><strong>Order ID:</strong> {selectedProduct.id}</Typography>
                            <Typography variant="body1"><strong>Customer:</strong> {selectedProduct.customerName}</Typography>
                            <Typography variant="body1"><strong>Total:</strong> ${selectedProduct.total}</Typography>
                            <Typography variant="body1"><strong>Date:</strong> {selectedProduct.date}</Typography>
                            <Typography variant="body1"><strong>Status:</strong> {selectedProduct.status}</Typography>
                            <Typography variant="body1"><strong>Shipping Address:</strong> {selectedProduct.shippingAddress}</Typography>
                        </>
                    ) : (
                        <CircularProgress />
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default Products;
