import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button, Divider, Grid, CircularProgress, Card, CardContent } from '@mui/material';
import { getOneOrders } from '../../../redux/action/orderAction';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import AdminUpdateOrderPayment from '../../../customHooks/Admin/Order/AdminUpdateOrderPayment';

const AdminOrderDetailsPage = () => {

    const { id } = useParams();
    const [handleUpdatePayment, loading] = AdminUpdateOrderPayment(id)

    const dispatch = useDispatch();
    // const { order, loading } = useSelector((state) => state.orderDetails);
    const order = useSelector((state) => state.orderReducer.getOneOrder);
    console.log(order)
    useEffect(() => {
        dispatch(getOneOrders(id));
    }, [id]);


    return (
        <Box sx={{ padding: 4, backgroundColor: '#ECEFF1', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom color="#1E88E5" align="center">
                Order Details
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 4, height: '100%', boxShadow: 3, textAlign: 'left' }}>
                        <Typography variant="h6" color="#D84315" gutterBottom>User Information</Typography>
                        <Typography><strong>Name:</strong> {order.user?.name}</Typography>
                        <Typography><strong>Email:</strong> {order.user?.email}</Typography>
                        <Typography><strong>Phone:</strong> {order.user?.phone}</Typography>
                        <Typography><strong>Address:</strong> {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 4, height: '100%', boxShadow: 3, textAlign: 'left' }}>
                        <Typography variant="h6" color="#D84315" gutterBottom>Order Information</Typography>
                        <Typography><strong>Status:</strong> {order.status}</Typography>
                        <Typography><strong>Payment:</strong> {order.isPaid ? 'Paid' : 'Pending'}</Typography>
                        <Typography><strong>Delivery:</strong> {order.isDelivered ? 'Delivered' : 'Not Delivered'}</Typography>
                        <Typography><strong>Total Price:</strong> ${order.totalOrderPrice}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{ padding: 4, marginTop: 3, boxShadow: 3, textAlign: 'left' }}>
                <Typography variant="h6" color="#D84315" gutterBottom>Ordered Products</Typography>
                <Grid container spacing={2}>
                    {order.cartItem?.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6">{item.product?.name}</Typography>
                                    <Typography><strong>Price:</strong> ${item.price}</Typography>
                                    <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                                    <Typography><strong>Color:</strong> {item.color.join(', ')}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant="contained" 
                color="primary" sx={{ boxShadow: 3 }}
                    onClick={()=>handleUpdatePayment(id)}
                >
                    Mark as Paid
                </Button>
                <Button variant="contained" color="secondary" sx={{ boxShadow: 3 }}>
                    Mark as Delivered
                </Button>
            </Box>
        </Box>
    );
};

export default AdminOrderDetailsPage;
