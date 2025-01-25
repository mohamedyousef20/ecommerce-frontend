import { Box, Button, CircularProgress, FormControl, Grid2, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'

import React, { useState } from 'react';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import AdminAddBrandHook from '../../../customHooks/Admin/Brand/AdminAddBradnHook';
import SingleImageInput from '../../../Components/Admin/AdminAllProduct/SingleImageInput';
import LoadingProgress from '../../../Components/LoadingProgress';

const AdminAddBrandPage = () => {
    const [
        brandImage,
        setBrandImage,
        brandName,
        setBrandName,
        handelName,
        handleSubmit,
        loading
    ] = AdminAddBrandHook()
    return (
        <>
            <LoadingProgress loading={loading} />


            <AdminSideBar />

            <Box flex={2}>

                <Box>
                    <Typography fontSize={'1.5rem'} fontWeight={600} color='red'>
                        Add New Brand
                    </Typography>
                </Box>

                <SingleImageInput
                    image={brandImage}
                    setImage={setBrandImage} />



                <Stack direction={'row'} justifyContent={'space-around'}
                    alignItems={'flex-start'}>

                    <Box>
                        {/* category Name Input Field */}
                        <TextField
                            fullWidth
                            label="Enter Category Name"
                            variant="outlined"
                            value={brandName}
                            onChange={handelName}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#fafafa',
                                },
                            }}
                        />

                        <Button
                            variant="contained"
                            onClick={handleSubmit}

                            sx={{
                                px: 2,
                                py: 1.5,
                                mt: 2,
                                backgroundColor: "#0295db",
                                fontWeight: '600',

                                // boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                                color: "#151515",
                                borderRadius: "1px",
                                "&:hover": {
                                    color: '#fff',
                                    bgcolor: "#151515",
                                    boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                                }
                            }
                            } >
                            ADD Brand


                        </Button>
                    </Box>
                </Stack>
            </Box>
        </>

    )
}

export default AdminAddBrandPage


