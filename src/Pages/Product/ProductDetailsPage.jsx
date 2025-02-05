import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    IconButton,
    Stack,
    Typography,
    useTheme,
    CircularProgress,
} from "@mui/material";
import Navbar from "../../Components/Utils/NavbarLogged";
import Footer from "../../Components/Utils/Footer";
import { useNavigate, useParams } from "react-router-dom";
import GetProdDetails from "../../customHooks/Product/GetProdDetails";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Notification from "../../customHooks/useNotification";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewSection from "../../Components/Review/UserAddReview";
import { useDispatch } from "react-redux/lib/exports";
import { AddProductToCart } from "../../redux/action/cartAction";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../Pages/Admin/Utils/swiper.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const ProductDetailsPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const [item] = GetProdDetails(id);
    const [colors, setColors] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleColorClick = (color) => {
        setColors((prevColors) =>
            prevColors.includes(color)
                ? prevColors.filter(c => c !== color)
                : [...prevColors, color]
        );
    };

    const handleSubmit = async () => {
        if (item.colors?.length >= 1 && colors.length === 0) {
            Notification("Please choose a color", "warn");
            return;
        }

        setLoading(true);
         await dispatch(AddProductToCart({
            productId: id,
            color: colors,
            quantity: quantity
        }));
        setLoading(false);

        Notification("Product added to cart", "success");
        navigate('/product');
    };

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <>
            <Container maxWidth="lg" sx={{ paddingY: 3, bgcolor: theme.palette.background.default }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    justifyContent="space-between"
                >
                    {/* Product Image Section */}
                    {/* Product Image Section */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: '600px' },  // Increased width
                            height: { xs: '400px', md: '650px' }, // Adjusted height
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: 3,
                            position: 'relative', // For absolute positioning of nav buttons
                        }}
                    >
                        <Swiper
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                                renderBullet: (index, className) => {
                                    return `<span class="${className}" 
                    style="background-color: ${theme.palette.primary.main};
                    width: 12px; 
                    height: 12px;
                    margin: 0 8px !important;
                    opacity: 0.5;
                    transition: all 0.3s ease;">`;
                                },
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            autoplay={false}
                            loop
                            modules={[Pagination, Navigation, Autoplay]}
                            style={{
                                width: '100%',
                                height: '100%',
                                '--swiper-navigation-size': '32px', // Larger nav arrows
                                '--swiper-navigation-color': theme.palette.primary.main,
                            }}
                        >
                            {item.images?.map((image, index) => (
                                <SwiperSlide key={index} style={{ width: '100%', height: '100%' }}>
                                    <img
                                        src={image.url}
                                        alt={`Product Image ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain', // Changed to contain for better image display
                                            padding: '20px', // Add some spacing around images
                                        }}
                                    />
                                </SwiperSlide>
                            ))}

                            {/* Custom Navigation Buttons */}
                            <div className="swiper-button-prev"
                                style={{ left: '10px', padding: '20px' }}></div>
                            <div className="swiper-button-next"
                                style={{ right: '10px', padding: '20px' }}></div>
                        </Swiper>
                    </Box>
                    {/* Product Details Section */}
                    <Box
                        flex={1}
                        bgcolor={theme.palette.background.paper}
                        p={3}
                        borderRadius={2}
                        boxShadow={3}
                    >
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            {item.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" paragraph>
                            {item.desc}
                        </Typography>

                        {/* Price Section */}
                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                            {item.priceAfterDiscount ? (
                                <>
                                    <Typography variant="h5" fontWeight={700} color="primary">
                                        {item.priceAfterDiscount} EGP
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ textDecoration: 'line-through' }}
                                    >
                                        {item.price} EGP
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h5" fontWeight={700} color="primary">
                                    {item.price} EGP
                                </Typography>
                            )}
                        </Stack>

                        {/* Available Colors */}
                        {item.colors?.length > 0 && (
                            <Stack direction="row" spacing={2} mb={2} alignItems="center">
                                <Typography variant="h6" fontWeight={600}>
                                    Colors:
                                </Typography>
                                {item.colors.map((col, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => handleColorClick(col)}
                                        sx={{
                                            height: 30,
                                            width: 30,
                                            borderRadius: '50%',
                                            bgcolor: col,
                                            cursor: 'pointer',
                                            border: colors.includes(col) ? '3px solid #0A7DFF' : 'none',
                                            transition: 'border 0.3s ease',
                                            '&:hover': { transform: 'scale(1.1)' },
                                        }}
                                    />
                                ))}
                            </Stack>
                        )}

                        {/* Quantity Selection */}
                       
                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                            <IconButton onClick={handleDecrease} color="primary" sx={{ border: '1px solid #ddd' }}>
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                value={quantity}
                                type="number"
                                inputProps={{ min: 1, style: { textAlign: 'center' } }}
                                variant="outlined"
                                size="small"
                                sx={{ width: 80 }}
                            />
                            <IconButton onClick={handleIncrease} color="primary" sx={{ border: '1px solid #ddd' }}>
                                <AddIcon />
                            </IconButton>
                        </Stack>

                        {/* Rating Section */}
                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                            <StarOutlinedIcon sx={{ color: '#fbc500' }} />
                            <Typography variant="h6" fontWeight={600}>
                                {item.ratingsAverage} ({item.numberOfRating} Reviews)
                            </Typography>
                        </Stack>

                        {/* Add to Cart Button */}
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                fontWeight: 700,
                                padding: '12px',
                                borderRadius: '8px',
                                '&:hover': { bgcolor: '#0056b3', transform: 'scale(1.02)' },
                                transition: 'all 0.3s ease',
                            }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Add to Cart"}
                        </Button>
                    </Box>
                </Stack>

                {/* Review Section */}
                <ReviewSection />
            </Container>
            <Footer />
        </>
    );
};

export default ProductDetailsPage;