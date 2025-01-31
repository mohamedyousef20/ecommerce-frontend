import Joi from "joi";

// Joi Schema for Validation
const AddCouponValidation = Joi.object({
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

export default AddCouponValidation;