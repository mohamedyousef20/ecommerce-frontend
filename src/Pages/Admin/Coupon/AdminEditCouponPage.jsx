import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, TextField, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux/lib/exports';
// import { createCoupon } from '../../../redux/action/couponAction';
import { useParams } from 'react-router-dom';
import { getOneCoupon, updateCoupon } from '../../../redux/action/couponAction';
import AdminEditProductPage from '../Product/AdminEditProductPage';
// Helper function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');  // Pad single digit day with leading zero
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Pad month with leading zero
    const year = date.getFullYear().toString().slice(-2);  // Get the last two digits of the year
    return `${day}/${month}/${year}`;
};
const AdminEditCouponPage = () => {


    const dispatch = useDispatch();
    const { id } = useParams()



    const [couponName, setCouponName] = useState('');
    const [couponValue, setCouponValue] = useState();
    const [couponExpireDate, setCouponExpireDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingCouponData, setLoadingCouponData] = useState(true);

    useEffect(() => {
        const getCoupon = async () => {
            setLoadingCouponData(true)
            await dispatch(getOneCoupon(id))
            setLoadingCouponData(false)
        }
        getCoupon();
    }, [])
    const getCoupon = useSelector(state => state.couponReducer.getOneCoupon);

    // Handle coupon name change
    const handleCouponName = (e) => {
        setCouponName(e.target.value);
    };

    // Handle coupon value change (ensure it's a valid number)
    const handleCouponValue = (e) => {
        e.persist();
        setCouponValue(e.target.value);
    };

    // Handle coupon expiration date change
    const handleCouponExpireDate = (e) => {
        setCouponExpireDate(e.target.value);
    };

    useEffect(() => {
        if (!loadingCouponData && getCoupon) {
            setCouponName(getCoupon.name)
            setCouponValue(getCoupon.discount)
            setCouponExpireDate(formatDate(getCoupon.expireDate))
        }

    }, [loadingCouponData])

    // Handle form submission
    const handleSubmit = async () => {
        // validation: Ensure all fields are filled
        if (!couponName || !couponValue || !couponExpireDate || couponExpireDate <= 0) {
            alert("Please fill all fields!");
            return;
        }
        setLoading(true)
        await dispatch(updateCoupon(id, {
            name: couponName,
            discount: couponValue,
            expireDate: couponExpireDate,
        }));
        setLoading(false)

    };
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
                    Edit Coupon
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
                    label="Enter Coupon Value"
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
                    type="text"
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
                Edit COUPON
            </Button>
        </Container>
    );
};

export default AdminEditCouponPage
