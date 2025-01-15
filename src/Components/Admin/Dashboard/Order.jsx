import React, { useEffect, useState } from 'react';
import {
    Grid, Box, Checkbox, Button, Modal,
    IconButton, Typography, Divider, Paper, CircularProgress
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import WarningModal from '../../Utils/WarningModal';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllOrders } from '../../../redux/action/orderAction';

const ProductOrderManagement = () => {
    const dispatch = useDispatch()
    // State for orders and selected orders
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [itemId, setItemId] = useState(null);

    // Fetching orders (simulating a data fetch)
    useEffect(() => {
        dispatch(getAllOrders())
    }, []);

    const order = useSelector((state) => state.orderReducer.allOrder);
    // Handle selecting/deselecting orders
    const handleSelectOrder = (id) => {
        setSelectedOrders((prev) => {
            if (prev.includes(id)) {
                return prev.filter((orderId) => orderId !== id);
            }
            return [...prev, id];
        });
    };

    const handleCancelDelete = () => {
        setOpenModal(false);
    };
    // Handle opening and closing modal
    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedOrder(null);
    };

    // Handle deleting an order
    const handleDeleteOrder = (orderId) => {
        setOpenModal(true);
        // setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
    };

    const handleConfirmDelete = async () => {
        setOpenModal(false);
        // await dispatch(deleteCoupon(itemId));
        // window.location.reload(true);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Product/Order Management</Typography>
            <Divider sx={{ marginBottom: 2 }} />

            {/* Add New Product/Order Button */}
            <Button
                variant="contained"
                startIcon={<Add />}
                color="primary"
                sx={{ marginBottom: 3 }}
            >
                Add New Order
            </Button>

            {/* Orders Table Layout */}
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
                        zIndex: 1
                    }}>
                        <Grid item xs={1}>
                            <Typography fontWeight="bold">Select</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Customer</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Total</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Date</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Status</Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={2}>
                            <Typography fontWeight="bold">Actions</Typography>
                        </Grid>
                    </Grid>

                    {/* Orders Rows */}
                    {orders.length > 0 ? orders.map((order) => (
                        <Grid container item xs={12} key={order.id} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 1,
                            borderRadius: 1,
                            justifyContent: 'flex-start',
                            bgcolor: '#fff',
                            borderBottom: '1px solid #ddd'
                        }}>
                            <Grid item xs={1}>
                                <Checkbox
                                    checked={selectedOrders.includes(order.id)}
                                    onChange={() => handleSelectOrder(order.id)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{order.customerName}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>${order.total}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{order.date}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{order.status}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                <IconButton sx={{ color: 'black' }} onClick={() => handleOpenModal(order)}>
                                    <Visibility sx={{ color: 'black' }} />
                                </IconButton>
                                <Link to={`/admin/update-order/${order.id}`}>
                                    <IconButton sx={{ color: 'blue' }}>
                                        <Edit sx={{ color: 'blue' }} />
                                    </IconButton>
                                </Link>
                                <IconButton sx={{ color: 'red' }} onClick={() => { setItemId(order._id); setOpenModal(true); }}>
                                    <Delete sx={{ color: 'red' }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    )) : <CircularProgress />}
                </Grid>
            </Paper>

            <WarningModal
                isOpen={openModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                message="Are you sure you want to delete this Order?"
            />

            {/* Order Details Modal
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
                    {selectedOrder ? (
                        <>
                            <Typography variant="h6" gutterBottom>Order Details</Typography>
                            <Typography variant="body1"><strong>Order ID:</strong> {selectedOrder.id}</Typography>
                            <Typography variant="body1"><strong>Customer:</strong> {selectedOrder.customerName}</Typography>
                            <Typography variant="body1"><strong>Total:</strong> ${selectedOrder.total}</Typography>
                            <Typography variant="body1"><strong>Date:</strong> {selectedOrder.date}</Typography>
                            <Typography variant="body1"><strong>Status:</strong> {selectedOrder.status}</Typography>
                            <Typography variant="body1"><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</Typography>
                        </>
                    ) : (
                        <CircularProgress />
                    )}
                </Box>
            </Modal> */}
        </Box>
    );
};

export default ProductOrderManagement;
