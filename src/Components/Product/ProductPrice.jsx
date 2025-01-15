import React from 'react'
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import {Typography} from '@mui/material'
const ProductPrice = ({item}) => {
  return (
          <Typography variant='h6' align='left' fontWeight={600}>
              {item.price} <CurrencyPoundIcon sx={{ fontWeight: '600', color: '#151515' }} />

          </Typography>
  )
}

export default ProductPrice
