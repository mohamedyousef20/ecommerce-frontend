import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button, Divider, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { getOneOrders, updateOrderDeliver } from '../../../redux/action/orderAction';
import AdminUpdateOrderPayment from '../../../customHooks/Admin/Order/AdminUpdateOrderPayment';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

// Colors
const primaryColor = '#1976D2'; // Blue
const secondaryColor = '#FF5722'; // Orange
const neutralColor = '#F5F5F5'; // Light gray

const AdminOrderDetailsPage = () => {
    const { id } = useParams();
    const [handleUpdatePayment, paymentLoading] = AdminUpdateOrderPayment(id);
    const [deliveryLoading, setDeliveryLoading] = React.useState(false);
    const dispatch = useDispatch();
    const order = useSelector((state) => state.orderReducer.getOneOrder);

    useEffect(() => {
        dispatch(getOneOrders(id));
    }, [id]);

    // Handle update delivery status
    const handleUpdateDeliver = async () => {
        setDeliveryLoading(true);
        await dispatch(updateOrderDeliver(id));
        setDeliveryLoading(false);
        window.location.reload(); // Refresh the page to reflect the updated status
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: neutralColor, minHeight: '100vh' }}>
            {/* Page Title */}
            <Typography variant="h4" gutterBottom color={primaryColor} align="center" fontWeight={600}>
                Order Details
            </Typography>
            <Divider sx={{ marginBottom: 4 }} />

            {/* User and Order Information */}
            <Grid container spacing={3}>
                {/* User Information */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, backgroundColor: 'white' }}>
                        <Typography variant="h6" color={primaryColor} gutterBottom fontWeight={600}>
                            User Information
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography><strong>Name:</strong> {order.user?.name}</Typography>
                            <Typography><strong>Email:</strong> {order.user?.email}</Typography>
                            <Typography><strong>Phone:</strong> {order.user?.phone}</Typography>
                            <Typography>
                                <strong>Address:</strong> {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Order Information */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, backgroundColor: 'white' }}>
                        <Typography variant="h6" color={primaryColor} gutterBottom fontWeight={600}>
                            Order Information
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography><strong>Status:</strong> {order.status}</Typography>
                            <Typography><strong>Payment:</strong> {order.isPaid ? 'Paid' : 'Pending'}</Typography>
                            <Typography><strong>Delivery:</strong> {order.isDelivered ? 'Delivered' : 'Not Delivered'}</Typography>
                            <Typography><strong>Total Price:</strong> ${order.totalOrderPrice}</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Ordered Products */}
            <Paper sx={{ padding: 3, marginTop: 4, borderRadius: 2, boxShadow: 2, backgroundColor: 'white' }}>
                <Typography variant="h6" color={primaryColor} gutterBottom fontWeight={600}>
                    Ordered Products
                </Typography>
                <Grid container spacing={2}>
                    {order.cartItem?.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600}>{item.product?.name}</Typography>
                                    <Typography><strong>Price:</strong> ${item.price}</Typography>
                                    <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                                    <Typography><strong>Color:</strong> {item.color.join(', ')}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Action Buttons */}
            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                {/* Mark as Paid Button */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: primaryColor,
                        color: 'white',
                        '&:hover': { backgroundColor: '#1565C0' },
                        minWidth: 150,
                    }}
                    onClick={() => handleUpdatePayment(id)}
                    disabled={paymentLoading || order.isPaid} // Disable if already paid or loading
                >
                    {paymentLoading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : order.isPaid ? (
                        `Paid on ${new Date(order.isPaidAt).toLocaleDateString()}`
                    ) : (
                        'Mark as Paid'
                    )}
                </Button>

                {/* Mark as Delivered Button */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: secondaryColor,
                        color: 'white',
                        '&:hover': { backgroundColor: '#E64A19' },
                        minWidth: 150,
                    }}
                    onClick={handleUpdateDeliver}
                    disabled={deliveryLoading || order.isDelivered} // Disable if already delivered or loading
                >
                    {deliveryLoading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : order.isDelivered ? (
                        `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}`
                    ) : (
                        'Mark as Delivered'
                    )}
                </Button>
            </Box>
        </Box>
    );
};

export default AdminOrderDetailsPage;