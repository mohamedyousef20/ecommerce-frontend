import React from 'react';
import { Box, Typography } from '@mui/material';
import image from '../../Pages/image.jpg'
import { Link } from 'react-router-dom';

const BrandCard = ({ brand }) => {
    console.log(brand)
    return (
        < Link to={`/brand/${brand._id}/product`}>
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                }}
            >
                {/* Brand Image */}
                <img
                    src={brand.image}
                    alt={brand.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />

                {/* Overlay with Brand Name */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        padding: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#FAFAFA',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        {brand.name}
                    </Typography>
                </Box>
            </Box>

        </Link>
    );
};

export default BrandCard;
