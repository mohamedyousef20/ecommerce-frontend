
import React from 'react';
import { Box, Card, CardMedia, Typography, Button, Grid } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ProductCard from './ProductCard'

const ProductGrid = ({ products }) => {
    return (
        <Grid container
            sx={{ marginTop: 4 , gap:8}}
            justifyContent={'center'}
            alignItems={'center'} 
            gap={5} >
            {/* Map over products to display them in a grid */}
            {products.slice(0,4).map((product) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
                    {/* Adjust grid layout with responsive columns */}
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};



export default ProductGrid;
