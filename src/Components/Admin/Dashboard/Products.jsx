import React, { useState } from 'react';
import {
    Grid, Box, Checkbox, Button, Modal,
    IconButton, Typography, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress
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
        <Box sx={{ padding: 3, bgcolor: '#f5f5f5' }}>
            <Typography variant="h4" sx={{ marginBottom: 3, color: '#333' }}>Products</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}><Typography>Select</Typography></TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}><Typography>Image</Typography></TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}><Typography>Name</Typography></TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}><Typography>Category</Typography></TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}><Typography>Price</Typography></TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}><Typography>Quantity</Typography></TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#e0e0e0' }}><Typography>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products && products.data ? products.data.map((product) => (
                            <TableRow key={product._id} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleSelectProduct(product.id)}
                                        sx={{ color: 'success', bgcolor: '#f1f1f1' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <img src={product.imageCover} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{/* Assuming category is available */}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>
                                    <Link to={`/admin/product/update/${product._id}`}>
                                        <IconButton sx={{ color: 'blue' }}>
                                            <Edit sx={{ color: 'blue' }} />
                                        </IconButton>
                                    </Link>
                                    <IconButton sx={{ color: 'red' }} onClick={() => handleOpenModal(product._id)}>
                                        <Delete sx={{ color: 'red' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell colSpan={7}><Typography>No Products Available</Typography></TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
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
