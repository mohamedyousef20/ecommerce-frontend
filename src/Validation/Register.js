
import Joi from "joi";

const RegisterSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name cannot exceed 30 characters',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
    }),
    phone: Joi.string().pattern(/^01[0-9]{9}$/).required().messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone number must be a valid Egyptian number (01XXXXXXXXX)',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
    passwordConfirm: Joi.any().equal(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required',
    }),
});

export default RegisterSchema;