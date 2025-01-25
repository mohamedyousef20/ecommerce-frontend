import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Stack, Typography } from '@mui/material';

import { createCoupon } from '../../../redux/action/couponAction';
import Joi from 'joi';
import Notification from '../../../customHooks/useNotification';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const CouponContainer = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');
    const [couponValue, setCouponValue] = useState('');
    const [couponExpireDate, setCouponExpireDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // Joi Schema for Validation
    const schema = Joi.object({
        couponName: Joi.string().min(2).max(50).required().messages({
            'string.empty': 'Coupon name is required',
            'string.min': 'Coupon name must be at least 2 characters',
            'string.max': 'Coupon name must be less than 50 characters',
        }),
        couponValue: Joi.number().min(1).max(100).required().messages({
            'number.base': 'Coupon value must be a valid number',
            'number.min': 'Coupon discount must be at least 1%',
            'number.max': 'Coupon discount must be at most 100%',
            'any.required': 'Coupon discount is required',
        }),
        couponExpireDate: Joi.date().min(new Date().toISOString().split("T")[0]).required().messages({
            'date.base': 'Invalid date format',
            'date.min': 'Expiration date must be in the future',
            'any.required': 'Expiration date is required',
        }),
    });

    // Handle Input Changes
    const handleCouponName = (e) => setCouponName(e.target.value);
    const handleCouponValue = (e) => setCouponValue(e.target.value);
    const handleCouponExpireDate = (e) => setCouponExpireDate(e.target.value);

    // Handle Submit with Joi Validation
    const handleSubmit = async () => {
        const formData = { couponName, couponValue, couponExpireDate };
        const { error } = schema.validate(formData, { abortEarly: false });

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
                padding: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Box mb={3}>
                <Typography fontSize={'1.5rem'} fontWeight={600} color="red" textAlign="center">
                    Add New Coupon
                </Typography>
            </Box>

            <Stack direction="column" alignItems="stretch" spacing={2}>
                <TextField
                    fullWidth
                    label="Enter Coupon Name"
                    variant="outlined"
                    value={couponName}
                    onChange={handleCouponName}
                    error={!!errors.couponName}
                    helperText={errors.couponName}
                    sx={{ '& .MuiInputBase-root': { borderRadius: 2, backgroundColor: '#fafafa' } }}
                />

                <TextField
                    fullWidth
                    label="Enter Coupon Discount Percentage"
                    variant="outlined"
                    type="number"
                    value={couponValue}
                    onChange={handleCouponValue}
                    error={!!errors.couponValue}
                    helperText={errors.couponValue}
                    sx={{ '& .MuiInputBase-root': { borderRadius: 2, backgroundColor: '#fafafa' } }}
                />

                <TextField
                    label="Enter Coupon Expire Date"
                    type="date"
                    value={couponExpireDate}
                    onChange={handleCouponExpireDate}
                    error={!!errors.couponExpireDate}
                    helperText={errors.couponExpireDate}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{ '& .MuiInputBase-root': { borderRadius: 2, backgroundColor: '#fafafa' } }}
                />
            </Stack>

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
                    '&:hover': { bgcolor: "#151515", boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)" },
                    '&:active': { bgcolor: "#0277a6" },
                }}
            >
                ADD COUPON
            </Button>
        </Container>
    );
};

export default CouponContainer;
