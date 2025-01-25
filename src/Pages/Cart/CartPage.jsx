import { IconButton, TextField, Box, Button, CardMedia, Stack, Typography, Grid, Divider, Paper, CircularProgress } from '@mui/material';
import Navbar from '../../Components/Utils/NavbarLogged';
import Footer from '../../Components/Utils/Footer';
import Coupons from '../../Components/Coupons';
import { Delete } from '@mui/icons-material';
import GetUserCartHook from '../../customHooks/Cart/get-user-cart-hook';
import WarningModal from '../../Components/Utils/WarningModal';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useState, useRef } from 'react';

const CartPage = () => {
    const [
        itemsNum,
        cartId,
        isModalOpen,
        setIsModalOpen,
        itemId,
        setItemId,
        loading,
        setLoading,
        quantities,
        setQuantities,
        response,
        handleQuantityChange,
        handleUpdateQuantity,
        handleCancelDelete,
        handleConfirmDelete
    ] = GetUserCartHook();

    const isCartEmpty = !response?.data?.cartItem?.length;

    const [imagesLoaded, setImagesLoaded] = useState({});
    const sliderRefs = useRef({});  // Store slider references for each item

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: false,  // Disable infinite loop
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,  // Disable autoplay
        fade: false,     // Disable fade effect for better control
        cssEase: 'ease-out',
        lazyLoad: 'ondemand',
        arrows: false,    // Hide default arrows
        dotsClass: 'slick-dots custom-dots',
        customPaging: (i) => (
            <Box
                sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    bgcolor: 'rgba(0,0,0,0.3)',
                    '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.5)'
                    }
                }}
            />
        )
    };

    // Custom navigation functions
    const goToNextSlide = (itemId) => {
        if (sliderRefs.current[itemId]) {
            sliderRefs.current[itemId].slickNext();
        }
    };

    const goToPrevSlide = (itemId) => {
        if (sliderRefs.current[itemId]) {
            sliderRefs.current[itemId].slickPrev();
        }
    };

    // Function to get all product images
    const getProductImages = (item) => {
        const images = [];
        if (item.imageCover) {
            images.push(item.imageCover);
        }
        if (item.images && Array.isArray(item.images)) {
            images.push(...item.images.map(img => img.url || img));
        }
        return images;
    };

    // Handle image load
    const handleImageLoad = (itemId, index) => {
        setImagesLoaded(prev => ({
            ...prev,
            [`${itemId}-${index}`]: true
        }));
    };

    return (
        <Box>
            {/* Shopping Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} m={2} gap={2} justifyContent={'center'} alignItems={'center'}>
                <Link to={'/product'}>
                    <Box>
                        <Button sx={{ bgcolor: '#151515', color: '#fff', textTransform: 'none', width: '100%' }}>
                            Continue Shopping
                        </Button>
                    </Box>
                </Link>
                <Box>
                    <Link to={`${cartId}/payment`}>
                        <Button sx={{ bgcolor: '#0295db', color: '#fff', textTransform: 'none', width: '100%' }}>
                            Checkout Now
                        </Button>
                    </Link>
                </Box>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" m={2} spacing={3}>
                {/* Cart Items Section */}
                <Stack bgcolor={'#fff'} direction={'column'} justifyContent={'flex-start'} spacing={3} sx={{ flex: 1 }}>
                    {response.data && response.data.cartItem ? (
                        response.data.cartItem.map((item) => (
                            <Grid container spacing={2} sx={{ padding: 1 }} key={item._id}>
                                {/* Image Section with Slider */}
                                <Grid item xs={12} sm={4} md={3}>
                                    <Box sx={{ 
                                        width: '100%', 
                                        maxWidth: 200,
                                        margin: '0 auto',
                                        position: 'relative',
                                        minHeight: '200px',
                                        '& .slick-slide': {
                                            visibility: 'hidden',
                                            '&.slick-active': {
                                                visibility: 'visible'
                                            }
                                        },
                                        '& .slick-slide img': {
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease-in-out'
                                        },
                                        '& .slick-slide.slick-active img.loaded': {
                                            opacity: 1
                                        },
                                        '& .custom-dots': {
                                            bottom: '-30px',
                                            '& li': {
                                                margin: '0 4px',
                                                '& button': {
                                                    padding: 0,
                                                    width: '10px',
                                                    height: '10px',
                                                    '&:before': {
                                                        display: 'none'
                                                    }
                                                },
                                                '&.slick-active button': {
                                                    '& > div': {
                                                        bgcolor: '#0295db'
                                                    }
                                                }
                                            }
                                        }
                                    }}>
                                        {/* Loading indicator */}
                                        {!Object.values(imagesLoaded).some(Boolean) && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    zIndex: 1
                                                }}
                                            >
                                                <CircularProgress size={40} />
                                            </Box>
                                        )}
                                        <Slider 
                                            {...sliderSettings} 
                                            ref={slider => sliderRefs.current[item._id] = slider}
                                        >
                                            {getProductImages(item).map((image, index) => (
                                                <div key={index}>
                                                    <img 
                                                        src={image} 
                                                        alt={`Product ${index + 1}`}
                                                        className={imagesLoaded[`${item._id}-${index}`] ? 'loaded' : ''}
                                                        onLoad={() => handleImageLoad(item._id, index)}
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            maxHeight: '200px',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </Slider>

                                        {/* Custom Navigation Controls */}
                                        <Stack 
                                            direction="row" 
                                            spacing={2} 
                                            justifyContent="center" 
                                            sx={{ mt: 4, mb: 2 }}
                                        >
                                            <Button
                                                onClick={() => goToPrevSlide(item._id)}
                                                variant="contained"
                                                size="small"
                                                startIcon={<ChevronLeft />}
                                                sx={{
                                                    minWidth: '40px',
                                                    bgcolor: 'rgba(0,0,0,0.6)',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(0,0,0,0.8)'
                                                    }
                                                }}
                                            >
                                                Prev
                                            </Button>
                                            <Button
                                                onClick={() => goToNextSlide(item._id)}
                                                variant="contained"
                                                size="small"
                                                endIcon={<ChevronRight />}
                                                sx={{
                                                    minWidth: '40px',
                                                    bgcolor: 'rgba(0,0,0,0.6)',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(0,0,0,0.8)'
                                                    }
                                                }}
                                            >
                                                Next
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Grid>

                                {/* Product Details */}
                                <Grid item xs={12} sm={8} md={7}>
                                    <Stack direction="column" spacing={1} sx={{ padding: { xs: 2, md: 3 }, fontSize: '0.9rem' }}>
                                        <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Brand: {item.brand}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Category: {item.category}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0295db' }}>
                                            ${item.price}
                                        </Typography>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <TextField
                                                type="number"
                                                size="small"
                                                value={quantities[item._id] || item.quantity}
                                                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                                onBlur={() => handleUpdateQuantity(item._id)}
                                                inputProps={{ min: 1 }}
                                                sx={{ width: '80px' }}
                                            />
                                            <IconButton
                                                onClick={() => {
                                                    setItemId(item._id);
                                                    setIsModalOpen(true);
                                                }}
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} sm={12} md={2}>
                                    <Stack
                                        direction="column"
                                        alignItems={{ xs: 'flex-start', md: 'flex-end' }}
                                        spacing={1}
                                        sx={{ padding: 2 }}
                                    >
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            ${(item.price * (quantities[item._id] || item.quantity)).toFixed(2)}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                        ))
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="h6">Your cart is empty</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Add items to get started
                            </Typography>
                        </Box>
                    )}
                </Stack>

                {/* Order Summary Section */}
                <Box sx={{ width: { xs: '100%', md: '300px' } }}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#fff' }}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Stack spacing={2}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Items ({itemsNum})</Typography>
                                <Typography variant="body2">
                                    $
                                    {response.data?.cartItem
                                        ?.reduce(
                                            (total, item) =>
                                                total + item.price * (quantities[item._id] || item.quantity),
                                            0
                                        )
                                        .toFixed(2)}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box>
                                <Coupons />
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Total
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    $
                                    {response.data?.cartItem
                                        ?.reduce(
                                            (total, item) =>
                                                total + item.price * (quantities[item._id] || item.quantity),
                                            0
                                        )
                                        .toFixed(2)}
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>

            {/* Delete Confirmation Modal */}
            <WarningModal
                open={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Delete Item"
                message="Are you sure you want to remove this item from your cart?"
            />
        </Box>
    );
};

export default CartPage;
