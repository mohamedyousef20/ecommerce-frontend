import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Box, Button } from '@mui/material';
const ProductCardButton = () => {
  return (
    <Box display={'flex'} flexDirection={'column'}
        gap={1} mt={1} >
        <Button
            sx={{
                fontSize: '.4rem',
                fontWeight: '600',
                backgroundColor: "#151515",
                // boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                color: "#fff",
                borderRadius: "1px",
                "&:hover": {
                    color: '#000',
                    bgcolor: "#0295db",
                    transition: '.3'
                },
            }}
            variant="contained"
        > < ShoppingCartOutlinedIcon />add</Button>
        <Button
            sx={{
                fontSize: '.4rem',
                fontWeight: '600',
                backgroundColor: "#151515",
                // boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                color: "#fff",
                borderRadius: "1px",
                "&:hover": {
                    color: '#000',
                    bgcolor: "#0295db",
                    transition: '.3'
                },
            }}
            variant="contained"
        > < FavoriteBorderOutlinedIcon />Add To Wishlist</Button>
    </Box>
  )
}

export default ProductCardButton
