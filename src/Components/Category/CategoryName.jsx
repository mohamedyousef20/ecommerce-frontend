import React from 'react'
import { Typography } from '@mui/material'
const CategoryName = ({item}) => {
    return (
        <Typography variant={{ xs: 'h5', md: 'h2' }}
            align="center" color='#fff'>
            {item.name}

        </Typography>
    )
}

export default CategoryName
