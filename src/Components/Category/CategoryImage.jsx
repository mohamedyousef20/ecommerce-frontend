import React from 'react'
import { CardMedia } from '@mui/material'
// import img from '../Home/—Pngtree—casual shoes_5626652.png'
const CategoryImage = ({ item }) => {
  return (
    <div>
      <CardMedia
        component="img"
        width={'100%'}
        height={'100%'}
        objectFit={'cover'}
        image={item.image}
        alt={item.title}


      />
    </div>
  )
}

export default CategoryImage
