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
import { getAllOrders, getOneOrders, updateOrderPaymentMethod } from "../../redux/action/orderAction";
import { useDispatch, useSelector } from "react-redux/lib/exports";
import Notification from "../../customHooks/useNotification";

const UserOrdersPage = () => {
    const dispatch = useDispatch();
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const orders = useSelector((state) => state.orderReducer.allOrder);

    useEffect(() => {
        if (orders?.data) {
            // Initially setting the orders data and each order's payment method in state
            const updatedOrders = orders.data.map((order) => ({
                ...order,
                selectedPaymentMethod: order.paymentMethod, // Store the payment method for each order
            }));
            setOrdersData(updatedOrders);
        }
    }, [orders]);

    const handlePaymentUpdate = (orderId, selectedPaymentMethod) => {
        dispatch(getOneOrders(orderId));
        dispatch(updateOrderPaymentMethod({
            id: orderId,
            method: selectedPaymentMethod
        }));
        Notification("Payment method updated successfully!", "success");
    };

    const handleCancelOrder = (orderId) => {
        const updatedOrders = ordersData.filter((order) => order._id !== orderId);
        setOrdersData(updatedOrders); // Remove canceled order from the state
        alert("Order canceled successfully!");
    };

    // Helper function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);
        return `${day}-${month}-${year}`;
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                My Orders
            </Typography>

            {ordersData.length > 0 ? (
                ordersData.map((order) => (
                    <Paper key={order._id} sx={{ padding: 3, marginBottom: 2 }}>
                        <Grid container spacing={2}>
                            {/* Order Details */}
                            <Grid item xs={12} md={8}>
                                <Typography variant="h6">{order.productName}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ordered on: {formatDate(order.createdAt)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Payment Method: {order.paymentMethod}
                                </Typography>
                            </Grid>

                            {/* Actions */}
                            <Grid
                                item
                                xs={12}
                                md={4}
                                sx={{ textAlign: { md: "right", xs: "left" } }}
                            >
                                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Payment</InputLabel>
                                    <Select
                                        value={order.selectedPaymentMethod}
                                        onChange={(e) => {
                                            const updatedOrders = ordersData.map((o) =>
                                                o._id === order._id
                                                    ? { ...o, selectedPaymentMethod: e.target.value }
                                                    : o
                                            );
                                            setOrdersData(updatedOrders);
                                        }}
                                        label="Payment"
                                    >
                                        <MenuItem value="cash" disabled={order.paymentMethod === "cash"}>
                                            Cash
                                        </MenuItem>
                                        <MenuItem value="card" disabled={order.paymentMethod === "card"}>
                                            Card
                                        </MenuItem>
                                    </Select>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    sx={{ marginLeft: 2 }}
                                    onClick={() =>
                                        handlePaymentUpdate(order._id, order.selectedPaymentMethod)
                                    }
                                    disabled={order.selectedPaymentMethod === order.paymentMethod}
                                >
                                    Update Payment
                                </Button>
                                <Divider sx={{ my: 2 }} />
                                {order.canCancel ? (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleCancelOrder(order._id)}
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
                ))
            ) : (
                <Alert severity="info">You have no orders at the moment.</Alert>
            )}
        </Box>
    );
};

export default UserOrdersPage;
