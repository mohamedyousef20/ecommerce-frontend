import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Stack, Typography } from '@mui/material';
import { createCoupon } from '../../../redux/action/couponAction';
import Joi from 'joi';
import Notification from '../../../customHooks/useNotification';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import AddCouponValidation from '../../../Validation/AddCouponValidation';

const CouponContainer = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');
    const [couponValue, setCouponValue] = useState('');
    const [couponExpireDate, setCouponExpireDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

  
    // Handle Input Changes
    const handleCouponName = (e) => setCouponName(e.target.value);
    const handleCouponValue = (e) => setCouponValue(e.target.value);
    const handleCouponExpireDate = (e) => setCouponExpireDate(e.target.value);

    // Handle Submit with Joi Validation
    const handleSubmit = async () => {
        const formData = { couponName, couponValue, couponExpireDate };
        const { error } = AddCouponValidation.validate(formData, { abortEarly: false });

        if (error) {
            const errorMessages = {};
            error.details.forEach((err) => {
                errorMessages[err.path[0]] = err.message;
            });
            setErrors(errorMessages);
            Notification('Validation failed. Please check the form.', 'error');
            return;
        }

        setErrors({}); // Clear previous errors
        setLoading(true);

        await dispatch(createCoupon({
            name: couponName,
            discount: couponValue,
            expireDate: couponExpireDate,
        }));

        setLoading(false);
    };

    // Handle API Response
    const response = useSelector(state => state.couponReducer.createCoupon);

    useEffect(() => {
        if (loading === false) {
            if (response && response.status === 201) {
                Notification("Coupon created successfully!", "success");
                window.location.reload();
            } else if (response && response.status === 500) {
                Notification("Coupon already exists!", "error");
            } else if (response && response.status === 403) {
                Notification("You don't have permission to create a coupon!", "error");
            }
        }
    }, [loading]);

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
                padding: 4,
                backgroundColor: '#FFFFFF',
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Title */}
            <Box mb={3} textAlign="center">
                <Typography
                    fontSize="1.75rem"
                    fontWeight={700}
                    color="#1976D2" // Royal Blue
                >
                    Add New Coupon
                </Typography>
                <Typography
                    fontSize="0.875rem"
                    color="text.secondary"
                    mt={1}
                >
                    Fill in the details to create a new coupon.
                </Typography>
            </Box>

            {/* Form Fields */}
            <Stack direction="column" spacing={3}>
                <TextField
                    fullWidth
                    label="Coupon Name"
                    variant="outlined"
                    value={couponName}
                    onChange={handleCouponName}
                    error={!!errors.couponName}
                    helperText={errors.couponName}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#F5F5F5', // Light Gray
                        },
                    }}
                />

                <TextField
                    fullWidth
                    label="Discount Percentage"
                    variant="outlined"
                    type="number"
                    value={couponValue}
                    onChange={handleCouponValue}
                    error={!!errors.couponValue}
                    helperText={errors.couponValue}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#F5F5F5', // Light Gray
                        },
                    }}
                />

                <TextField
                    label="Expiration Date"
                    type="date"
                    value={couponExpireDate}
                    onChange={handleCouponExpireDate}
                    error={!!errors.couponExpireDate}
                    helperText={errors.couponExpireDate}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#F5F5F5', // Light Gray
                        },
                    }}
                />
            </Stack>

            {/* Submit Button */}
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    mt: 4,
                    py: 1.5,
                    backgroundColor: '#1976D2', // Royal Blue
                    color: '#FFFFFF',
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: '0px 4px 6px rgba(25, 118, 210, 0.2)',
                    '&:hover': {
                        backgroundColor: '#1565C0', // Darker Royal Blue
                        boxShadow: '0px 6px 8px rgba(25, 118, 210, 0.3)',
                    },
                    '&:active': {
                        backgroundColor: '#0D47A1', // Even Darker Royal Blue
                    },
                }}
            >
                Create Coupon
            </Button>
        </Container>
    );
};

export default CouponContainer;