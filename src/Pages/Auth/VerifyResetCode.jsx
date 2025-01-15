import React, { useEffect, useState } from 'react';
import { TextField, Button, Stack, Typography, Box, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { useNavigate } from 'react-router-dom';
import { verifyResetCode } from '../../redux/action/authAction';

const VerifyResetCode = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [resetCode, setResetCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleResetCodeChange = (e) => {
        setResetCode(e.target.value);
        setError('');
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        //  validation
        if (!resetCode) {
            setError('resetCode field are required');
            return;
        }


        //  API to reset the password here
        setLoading(true)
        await dispatch(verifyResetCode({
            resetCode
        }))
        setLoading(false)

    };

    const response = useSelector((state) => state.authReducer.verifyRestCode)

    useEffect(() => {
        if (loading === false) {
            if (response) {
                console.log(response)
                // if (response.data.status === "Success") {
                //     setSuccessMessage('Correct Reset Code')
                //     setTimeout(() => {
                //         navigate("/user/resetPassword")
                //     }, 1500);
                // }
                // if (response.data.status === "fail") {
                //     Notification("الكود خاطئ او انتهت صلاحيته", "error")
                // }
                navigate('/user/resetPassword')
            }
        }
    }, [loading])

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Password Reset Code
            </Typography>

            {/* Display error message */}
            {error && <Alert severity="error">{error}</Alert>}

            {/* Display success message */}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Reset Code"
                    variant="outlined"
                    fullWidth
                    value={resetCode}
                    onChange={handleResetCodeChange}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ padding: '10px' }}
                >
                    Reset Password
                </Button>
            </form>
        </Box>
    )
}

export default VerifyResetCode
