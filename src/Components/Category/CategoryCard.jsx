import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import image from '../../Pages/image.jpg';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    console.log(category)
    return (
        // Check if category exists before rendering
        category ? (
            <Link to={`/category/${category._id}/product`}>
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
                    {/* Category Image */}
                    <img
                        src={category.image}
                        alt={category.name}
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                    />

                    {/* Overlay with Category Name */}
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
                            {category.name}
                        </Typography>
                    </Box>
                </Box>
            </Link>
        ) : (
            // Show loading spinner if category is not available
            <CircularProgress size={50} thickness={4} color="primary" />
        )
    );
};

export default CategoryCard;
