import { Typography } from '@mui/material'
import React from 'react'

const ProductName = ({ item }) => {
  return (

    <Typography fontWeight={600} variant='h6' align='left' wrap>
      {item.name}
    </Typography>
  )
}

export default ProductName
