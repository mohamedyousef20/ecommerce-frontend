import React from 'react';
import GetHomeProdHook from '../../../customHooks/Product/GetHomeProdHook';
import ProductGrid from '../../Product/ProductContainer';
import { Box, Typography } from '@mui/material';
import GetMostPopularProductHook from '../../../customHooks/Product/GetMostPopularProductHook';
import GetMostOfferedProductHook from '../../../customHooks/Product/GetMostOfferedProductHook';

const HomeProduct = () => {
    const [products] = GetHomeProdHook();
    const [popularProduct] = GetMostPopularProductHook();
    const [mostOfferedProduct] = GetMostOfferedProductHook();

    return (
        <Box sx={{ padding: 4, backgroundColor: "#F5F5F5"}}>
            {/* Recent Launch Section */}
            <Box sx={{ marginBottom: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        textAlign: 'left',
                        marginBottom: 1,
                        color: "#FF5722", // Orange
                        display: "inline-block",
                        paddingBottom: "4px",
                        letterSpacing: 1.5,
                    }}
                >
                    Recent Launch
                </Typography>
                <ProductGrid products={products} />
            </Box>

            {/* Popular Product Section */}
            <Box sx={{ marginBottom: 6 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        textAlign: 'left',
                        marginBottom: 1,
                        color: "#1976D2", // Blue
                        display: "inline-block",
                        paddingBottom: "4px",
                        letterSpacing: 1.5,
                    }}
                >
                   Popular Products
                </Typography>
                <ProductGrid products={popularProduct} />
            </Box>

            {/* Special Offer Section */}
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        textAlign: 'left',
                        marginBottom: 1,
                        color: "#FF5722", // Orange
                        display: "inline-block",
                        paddingBottom: "4px",
                        letterSpacing: 1.5,
                        
                    }}
                >
                   Special Offers
                </Typography>
                <ProductGrid products={mostOfferedProduct} />
            </Box>
        </Box>
    );
};

export default HomeProduct;
// 1- done
// 2-responsive 