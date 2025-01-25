import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const ProductImageSlider = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState({});
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Reset loading state when images change
    useEffect(() => {
        setLoading(true);
        setLoadedImages({});
    }, [images]);

    // Preload current and adjacent images
    useEffect(() => {
        const preloadImages = () => {
            const imagesToLoad = [
                currentIndex,
                (currentIndex + 1) % images.length,
                (currentIndex - 1 + images.length) % images.length
            ];

            imagesToLoad.forEach(index => {
                if (images[index] && !loadedImages[index]) {
                    const img = new Image();
                    img.src = images[index];
                    img.onload = () => {
                        setLoadedImages(prev => ({
                            ...prev,
                            [index]: true
                        }));
                        if (index === currentIndex) {
                            setLoading(false);
                        }
                    };
                }
            });
        };

        preloadImages();
    }, [currentIndex, images, loadedImages]);

    const goToPrevious = () => {
        setCurrentIndex(current => (current === 0 ? images.length - 1 : current - 1));
    };

    const goToNext = () => {
        setCurrentIndex(current => (current === images.length - 1 ? 0 : current + 1));
    };

    // Touch handlers for swipe
    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            goToNext();
        }
        if (isRightSwipe) {
            goToPrevious();
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    if (!images || images.length === 0) {
        return (
            <Box sx={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: '8px'
            }}>
                <Typography>No images available</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            position: 'relative', 
            height: '300px',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            overflow: 'hidden',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            '&:hover .MuiIconButton-root': {
                opacity: 1
            }
        }}>
            {/* Main Image with Loading State */}
            <Box
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    bgcolor: '#f5f5f5'
                }}
            >
                {loading && (
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1
                    }}>
                        <CircularProgress size={40} />
                    </Box>
                )}
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${images[currentIndex]})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                        opacity: loading ? 0 : 1,
                        cursor: 'pointer'
                    }}
                />
            </Box>

            {/* Navigation Arrows */}
            <IconButton
                onClick={goToPrevious}
                sx={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: '#000',
                    '&:hover': {
                        bgcolor: 'rgba(255,255,255,1)'
                    },
                    width: '36px',
                    height: '36px',
                    opacity: 0,
                    transition: 'opacity 0.2s ease-in-out',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
            >
                <ChevronLeft />
            </IconButton>

            <IconButton
                onClick={goToNext}
                sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: '#000',
                    '&:hover': {
                        bgcolor: 'rgba(255,255,255,1)'
                    },
                    width: '36px',
                    height: '36px',
                    opacity: 0,
                    transition: 'opacity 0.2s ease-in-out',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
            >
                <ChevronRight />
            </IconButton>

            {/* Dots Navigation */}
            <Box sx={{
                position: 'absolute',
                bottom: '15px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                padding: '5px 10px',
                borderRadius: '12px',
                bgcolor: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(4px)'
            }}>
                {images.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            bgcolor: currentIndex === index ? '#fff' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.2)',
                                bgcolor: currentIndex === index ? '#fff' : 'rgba(255,255,255,0.7)'
                            }
                        }}
                    />
                ))}
            </Box>

            {/* Image Counter */}
            <Typography
                sx={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    backdropFilter: 'blur(4px)'
                }}
            >
                {`${currentIndex + 1} / ${images.length}`}
            </Typography>
        </Box>
    );
};

export default ProductImageSlider;
