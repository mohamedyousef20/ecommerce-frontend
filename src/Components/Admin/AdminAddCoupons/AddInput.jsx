import React from 'react'
import { Box, Grid2, Stack, TextField } from '@mui/material'

const AddInput = () => {
    return (
        <Stack direction={'column'} alignItems={'stretch'}>
            {/* Price Inputs */}
     

                  
                        {/* Coupon Name Input Field */}
                        <TextField
                            fullWidth
                            label="Enter Coupon Name"
                            variant="outlined"
                            // value={prodName}
                            // onChange={handelName}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#fafafa',
                                },
                            }}
                        />
             

      

                    <TextField
                        fullWidth
                        label="Enter Coupon Value"
                        variant="outlined"
                        type="number"
                        // value={priceAfterDiscount}
                        // onChange={handelProductPriceAfterDiscount}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 2,
                                backgroundColor: '#fafafa',
                            },
                        }}
                    />
        
        </Stack>
    )
}

export default AddInput
