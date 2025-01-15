import React from 'react';
import GetHomeProdHook from '../../../customHooks/Product/GetHomeProdHook';
import ProductGrid from '../../Product/ProductContainer';
import { Box, Typography } from '@mui/material';
import GetMostPopularProductHook from '../../../customHooks/Product/GetMostPopularProductHook';
import GetMostOfferedProductHook from '../../../customHooks/Product/GetMostOfferedProductHook';

const HomeProduct = () => {
    // Assuming GetHomeProdHook fetches products
    const [products] = GetHomeProdHook();
    const [popularProduct] = GetMostPopularProductHook();
    const [mostOfferedProduct] = GetMostOfferedProductHook();

    // const recentLunch = products.slice(0, 4); // First 4 products
    // const popularProducts = products.slice(4, 8); // Next 4 products
    // const specialOffers = products.slice(8, 12); // Another set of 4 products

    return (
        <Box sx={{ padding: 4 }}>
            {/* Recent Lunch Section */}
            <Box sx={{ marginBottom: 6 }}>
                <Typography variant='h5' fontWeight={'bold'} sx={{ textAlign: 'left', marginBottom: 2 }}>
                    Recent Lunch
                </Typography>
                <ProductGrid products={products} />
            </Box>

            {/* Popular Product Section */}
            <Box sx={{ marginBottom: 6 }}>
                <Typography variant='h5' fontWeight={'bold'} sx={{ textAlign: 'left', marginBottom: 2 }}>
                    Popular Product
                </Typography>
                <ProductGrid products={popularProduct} />
            </Box>

            {/* Special Offer Section */}
            <Box>
                <Typography variant='h5' fontWeight={'bold'} sx={{ textAlign: 'left', marginBottom: 2 }}>
                    Special Offer
                </Typography>
                <ProductGrid products={mostOfferedProduct} />
            </Box>
        </Box>
    );
};

export default HomeProduct;
 