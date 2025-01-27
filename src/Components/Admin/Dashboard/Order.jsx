import React, { useEffect, useState } from 'react';
import {
    Grid, Box, Checkbox, Button, Modal,
    IconButton, Typography, Divider, Paper, CircularProgress
} from '@mui/material';
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import WarningModal from '../../Utils/WarningModal';
import { deleteOrder, updateOrderDeliver, updateOrderPay } from '../../../redux/action/orderAction';
import AdminGetAllOrderHook from '../../../customHooks/Admin/Order/AdminGetAllOrderHook';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import LoadingProgress from '../../LoadingProgress';
import Notification from '../../../customHooks/useNotification';
import AdminUpdateOrderPayment from '../../../customHooks/Admin/Order/AdminUpdateOrderPayment';

const ProductOrderManagement = () => {
    const [orders] = AdminGetAllOrderHook();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [itemId, setItemId] = useState(null);

    const [handleUpdatePayment, loading] = AdminUpdateOrderPayment(itemId)
    const handleUpdateDeliver = (id) => {
        
        dispatch(updateOrderDeliver(id));
    };



    const handleCancelDelete = () => setIsModalOpen(false);


 const handleConfirmDelete = async () => { //TODE make it work
        // setLoading(true);
        // await dispatch(deleteOrder(itemId))
        // setLoading(false)
        // Notification('Deleting order successfully....')
        // setIsModalOpen(false);
        // window.location.reload(true);

    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };


    return (
        <>
            <LoadingProgress loading={loading} />
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>Order Management</Typography>
                <Divider sx={{ marginBottom: 2 }} />

                <Paper>
                    <Grid container spacing={2}>
                        <Grid container item xs={12} sx={{ bgcolor: '#f1f1f1', padding: 1 }}>
                            <Grid item xs={2}><Typography fontWeight="bold">Customer</Typography></Grid>
                            <Grid item xs={2}><Typography fontWeight="bold">Total</Typography></Grid>
                            <Grid item xs={2}><Typography fontWeight="bold">Date</Typography></Grid>
                            <Grid item xs={2}><Typography fontWeight="bold">Paid</Typography></Grid>
                            <Grid item xs={2}><Typography fontWeight="bold">Delivered</Typography></Grid>
                            <Grid item xs={2}><Typography fontWeight="bold">Actions</Typography></Grid>
                        </Grid>

                        {orders?.data?.map((order) => (
                            <Grid container item xs={12} key={order._id} sx={{ padding: 1, borderBottom: '1px solid #ddd' }}>
                                {/* <Grid item xs={2}><Typography>{order.user.name}</Typography></Grid> */}
                                <Grid item xs={2}><Typography>${order.totalOrderPrice}</Typography></Grid>
                                <Grid item xs={2}><Typography>{formatDate(order.updatedAt)}</Typography></Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        color={order.isPaid ? "success" : "primary"}
                                        onClick={() => handleUpdatePayment(order._id)}
                                    >
                                        {order.isPaid ? formatDate(order.isPaidAt) : "Mark as Paid"}
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        color={order.isDelivered ? "success" : "secondary"}
                                        onClick={() => handleUpdateDeliver(order._id)}
                                    >
                                        {order.isDelivered ? formatDate(order.deliveredAt) : "Mark as Delivered"}
                                    </Button>
                                </Grid>
                                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                    <Link to={`/dashboard/order/${order._id}/details`}>
                                        <IconButton>
                                            <Visibility />
                                        </IconButton>
                                    </Link>
                                    <IconButton>
                                        <Delete sx={{ color: 'red' }} onClick={() => {
                                            setItemId(order._id);
                                            setIsModalOpen(true);
                                        }} />

                                    </IconButton>
                                </Grid>
                            </Grid>
                        )) || <CircularProgress />}
                    </Grid>
                </Paper>

                {/* Order Details Modal */}
                <WarningModal isOpen={isModalOpen}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    message="Are you sure you want to delete this Brand?" />
            </Box>
        </>
    );
};

export default ProductOrderManagement;
