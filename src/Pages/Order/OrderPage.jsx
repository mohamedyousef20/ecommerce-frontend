import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Divider,
    Alert,
} from "@mui/material";
import { getAllOrders } from "../../redux/action/orderAction";
import { useDispatch, useSelector } from "react-redux/lib/exports";

const UserOrdersPage = () => {
    const dispatch = useDispatch();
    const [order, setOrder] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    // Mock Orders Data
    useEffect(() => {
        // Fetching orders 
        dispatch(getAllOrders())


    }, []);
    const orders = useSelector((state) => state.orderReducer.allOrder);
    console.log(orders)

    const handlePaymentUpdate = (orderId) => {
        setOrder((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId
                    ? { ...order, paymentMethod: selectedPaymentMethod }
                    : order
            )
        );
        alert("Payment method updated successfully!");
    };

    const handleCancelOrder = (orderId) => {
        setOrder((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        alert("Order canceled successfully!");
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                My Orders
            </Typography>

            {orders?.data?.length > 0 ? orders.map((order) => (
                <Paper key={order.id} sx={{ padding: 3, marginBottom: 2 }}>
                    <Grid container spacing={2}>
                        {/* Order Details */}
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6">{order.productName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ordered on: {order.orderDate.toDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Payment Method: {order.paymentMethod}
                            </Typography>
                        </Grid>

                        {/* Actions */}
                        <Grid item xs={12} md={4} sx={{ textAlign: { md: "right", xs: "left" } }}>
                            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Payment</InputLabel>
                                <Select
                                    value={selectedPaymentMethod}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    label="Payment"
                                >
                                    <MenuItem value="Cash">Cash</MenuItem>
                                    <MenuItem value="Visa">Visa</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                sx={{ marginLeft: 2 }}
                                onClick={() => handlePaymentUpdate(order.id)}
                            >
                                Update Payment
                            </Button>
                            <Divider sx={{ my: 2 }} />
                            {order.canCancel ? (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleCancelOrder(order.id)}
                                >
                                    Cancel Order
                                </Button>
                            ) : (
                                <Typography variant="body2" color="error">
                                    Cannot cancel order after 2 days.
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            )) : <Alert severity="info">You have no orders at the moment.</Alert>
            }

           
        </Box>
    );
};

export default UserOrdersPage;
