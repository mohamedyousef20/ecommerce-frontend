import React, { useEffect, useState } from 'react';
import { TextField, Button, Stack, Typography, Box, Alert } from '@mui/material';
import { resetPassword } from '../../redux/action/authAction';
import { useSelector, useDispatch } from 'react-redux/lib/exports';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();


  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //  validation
    if (!newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    //  API to reset the password here
    setLoading(true)
    await dispatch(resetPassword({ newPassword, email: localStorage.getItem('userEmail') }))
    setLoading(false);
  }
  const response = useSelector(state => state.authReducer.resetPassword)
  useEffect(() => {
    if (loading === false) {
      if (response) {
        // console.log(response)
        // if (response.data.status === "Success") {
        //   notify("تم تغير كلمة السر بنجاح", "success")
        //   setTimeout(() => {
        //     navigate("/login")
        //   }, 1500);
        // }
        // if (response.data.status === "fail") {
        //   notify("من فضلك اطلب كود جديد", "error")
        // }
        setNewPassword('');
        setConfirmPassword('');
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
        <Stack spacing={2}>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            helperText="Password should be at least 6 characters"
          />

          <TextField
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
        </Stack>
      </form>

      {/* Footer or additional information */}
      <Box mt={3} textAlign="center">
        <Typography variant="body2">
          Remember your password? <Button color="primary">Login</Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
