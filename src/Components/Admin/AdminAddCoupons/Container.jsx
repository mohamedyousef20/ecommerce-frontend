import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, TextField, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { createCoupon } from '../../../redux/action/couponAction';

const CouponContainer = () => {
    const dispatch = useDispatch();

    const [couponName, setCouponName] = useState('');
    const [couponValue, setCouponValue] = useState('');
    const [couponExpireDate, setCouponExpireDate] = useState('');
    const [loading, setLoading] = useState(true);

    // Handle coupon name change
    const handleCouponName = (e) => {
        setCouponName(e.target.value);
    };

    // Handle coupon value change (ensure it's a valid number)
    const handleCouponValue = (e) => {
        setCouponValue(e.target.value);
    };

    // Handle coupon expiration date change
    const handleCouponExpireDate = (e) => {
        setCouponExpireDate(e.target.value);
        console.log('Selected Expiry Date:', e.target.value);  // Log selected expiration date
    };

    // Handle form submission
    const handleSubmit = async () => {
        // validation: Ensure all fields are filled
        if (!couponName || !couponValue || !couponExpireDate || couponExpireDate <= 0) {
            alert("Please fill all fields!");
            return;
        }
        setLoading(true)
        await dispatch(createCoupon({
            name: couponName,
            discount: couponValue,
            expireDate: couponExpireDate,
        }));
        setLoading(false)

    };
    const response = useSelector(state => state.couponReducer.createCoupon);
    console.log(response)
    console.log(response.status)

    useEffect(() => {

        if (loading === false) {
            if (response && response.status === 201) {
                Notification(" Create Coupon Successfully ", "success")
                window.location.reload(false)
            } else if (response && response.status === 500) {
                Notification("Coupon Already Exist ", "success")
            }
            else if (response && response.status === 403) {
                Notification("Need Create Coupon Permission", "success")
            }

        }

    }, [loading])
    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'center',
                my: 4,
                padding: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            {/* Title Section */}
            <Box mb={3}>
                <Typography fontSize={'1.5rem'} fontWeight={600} color="red" textAlign="center">
                    Add New Coupon
                </Typography>
            </Box>

            {/* Form Inputs */}
            <Stack direction="column" alignItems="stretch" spacing={2}>
                {/* Coupon Name Input */}
                <TextField
                    fullWidth
                    label="Enter Coupon Name"
                    variant="outlined"
                    value={couponName}
                    onChange={handleCouponName}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: 2,
                            backgroundColor: '#fafafa',
                        },
                    }}
                />

                {/* Coupon Value Input */}
                <TextField
                    fullWidth
                    label="Enter Coupon Discount Percentage"
                    variant="outlined"
                    type="number"
                    value={couponValue}
                    onChange={handleCouponValue}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: 2,
                            backgroundColor: '#fafafa',
                        },
                    }}
                />

                {/* Coupon Expiry Date Input */}
                <TextField
                    label="Enter Coupon Expire Date"
                    type="date"
                    value={couponExpireDate}  // Corrected value to bind correctly with state
                    onChange={handleCouponExpireDate}
                    InputLabelProps={{
                        shrink: true, // Ensures the label stays in place when the field is filled
                    }}
                    fullWidth
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: 2,
                            backgroundColor: '#fafafa',
                        },
                    }}
                />
            </Stack>

            {/* Submit Button */}
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    px: 2,
                    py: 1.5,
                    mt: 3,
                    backgroundColor: "#0295db",
                    fontWeight: '600',
                    color: "#fff",
                    borderRadius: "5px",
                    '&:hover': {
                        bgcolor: "#151515",
                        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                    },
                    '&:active': {
                        bgcolor: "#0277a6", // Active state for button
                    },
                }}
            >
                ADD COUPON
            </Button>
        </Container>
    );
};

export default CouponContainer
