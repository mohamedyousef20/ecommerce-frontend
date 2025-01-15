import { CardMedia } from '@mui/material'
import React from 'react'

const ProductCardMedia = ({ item }) => {
    return (
        <CardMedia
            component="img"
            width={'100%'}
            height={'75%'}
            objectFit={'cover'}
            image={item.imageCover}
            alt={item.name}
            sx={{
                transition: '.3s',
                "&:hover": {
                    transform: 'scale(1.2)',

                }
            }}
        />

    )
}

export default ProductCardMedia
