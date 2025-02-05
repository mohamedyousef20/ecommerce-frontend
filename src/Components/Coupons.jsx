import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { applyCouponToCart } from "../redux/action/cartAction";
import { useDispatch, useSelector } from "react-redux/lib/exports";
import Notification from "../customHooks/useNotification";

function Coupons() {
    const dispatch = useDispatch();
    const [coupon, setCoupon] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(null);
    const [valid, setValid] = useState(null);

    const response = useSelector((state) => state.cartReducer.coupon);
    console.log('ths ii', response)
    const handleCouponChange = (event) => {
        setCoupon(event.target.value);
    };

    useEffect(() => {
        if (!response) return;

        if (loading === false) {
            if (response.msg === 'success') {
             
                Notification('Coupon Applied Successfully!', 'success');
                setValid(true);
                window.location.reload(true)
            }

            else {
                Notification('Invalid Coupon.', 'error');
                setValid(false)

            }
        }
    }, [response]);


    const handleApplyCoupon = async () => {
        setLoading(true);
        setMessage("");
        try {
            await dispatch(applyCouponToCart({ name: coupon }));
        } catch (error) {
            setMessage("Failed to apply coupon. Please try again.");
            setValid(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography fontWeight={600}>Apply Coupons</Typography>
            <TextField
                fullWidth
                value={coupon}
                placeholder="Enter Coupon"
                size="small"
                onChange={handleCouponChange}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleApplyCoupon}
                disabled={loading}
                sx={{
                    bgcolor: '#0295db',
                    color: "#fff",
                    fontWeight: 600,
                    '&:disabled': {
                        bgcolor: '#cccccc'
                    }
                }}
            >
                {loading ? 'Applying...' : 'Apply Coupon'}
            </Button>

            {message && (
                <Typography
                    variant="body2"
                    sx={{
                        mt: 2,
                        color: valid ? 'success.main' : 'error.main',
                        fontWeight: valid ? 600 : 400
                    }}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
}

export default Coupons;