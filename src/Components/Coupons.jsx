import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { applyCouponToCart } from "../redux/action/cartAction";
import { useDispatch } from "react-redux/lib/exports";

function Coupons() {

    const dispatch = useDispatch();

    const [coupon, setCoupon] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState("");
    const [valid, setValid] = useState(null);

    const handleCouponChange = (event) => {
        setCoupon(event.target.value);
    };


    // apply coupon to cart 

    const handleApplyCoupon = () => {
        // Example logic for coupon validation (you can replace this with real logic)
        setLoading(true);
        dispatch(applyCouponToCart({
            name: coupon

        }))
        setLoading(true);
        // const validCoupons = ["DISCOUNT10", "SAVE20", "OFFER30"];
        // if (validCoupons.includes(coupon)) {
        //     setMessage("Coupon applied successfully!");
        //     setValid(true);
        // } else {
        //     setMessage("Invalid coupon code.");
        //     setValid(false);
        // }
        // window.location.reload(true)
    };

    return (
        <Box >


            <Typography fontWeight={600}>Apply Coupons</Typography>
            <TextField
                fullWidth
                value={coupon}
                placeholder="Enter Coupon"
                size="small"
                defaultValue={'small'}
                onChange={handleCouponChange}
                sx={{ mb: 2, }}
            />
            <Button
                variant="contained"
                onClick={handleApplyCoupon}


                sx={{
                    bgcolor: '#0295db', color: "#fff", fontWeight: 600
                }}
            >
                Apply Coupon
            </Button>
            {message && (
                <Typography
                    variant="body2"
                    color={valid ? "green" : "red"}
                    sx={{ mt: 2 }}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
}

export default Coupons;