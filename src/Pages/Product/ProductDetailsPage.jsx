import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    CardMedia,
    TextField,
    IconButton,
    Stack,
    Typography,
    Snackbar,
    useTheme,

    CircularProgress,
} from "@mui/material";
import Navbar from "../../Components/Utils/NavbarLogged";
import Footer from "../../Components/Utils/Footer";
import { useParams } from "react-router-dom";
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
import '../../Pages/Admin/Utils/swiper.css'
import { Pagination } from 'swiper/modules';

const ProductDetailsPage = () => {
    const theme = useTheme();

    const { id } = useParams(); // Get product ID from URL params
    const [item] = GetProdDetails(id); // Fetch product details using custom hook
    const [colors, setColors] = useState([]); // Update state variable name to 'colors'
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    console.log(item) // Update console log to 'colors'

    const handleColorClick = (color) => {
        setColors((prevColors) => {
            if (prevColors.includes(color)) {
                return prevColors.filter(c => c !== color); // Remove color if already selected
            } else {
                return [...prevColors, color]; // Add color if not selected
            }
        });
    };

    const handleSubmit = async () => {
        if (item.colors && item.colors.length >= 1) {
            if (colors.length === 0) {
                Notification("Please choose a color", "warn");
                return;
            }
        }

        setLoading(true); // Start loading animation
        dispatch(AddProductToCart({
            productId: id,
            color: colors,
            quantity: quantity
        }))

        setLoading(false); // Stop loading animation

        Notification("Product added to cart", "success");
    };

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ paddingY: 3, bgcolor: "#f5f5f5" }}>
                <Stack
                    direction={{ xs: "column", md: "row" }} // Make it column on small screens
                    spacing={3}
                    justifyContent="space-between"
                >
                    {/* Product Image Section */}
                    <Box
                        bgcolor="#f5f5f5"
                        p={2}
                        flex={2}
                        width="100%" // Make it full width on small screens
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: { xs: 400, md: 500 }, overflow: 'hidden' }} // Adjust height
                    >
                        <Swiper
                            direction={'vertical'}
                            pagination={{
                                clickable: true,
                            }}
                            disabled={true}
                            loop={true}
                            modules={[Pagination]}
                            className="mySwiper"

                        >
                            {item.images?.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={image.url} alt={`Product Image ${index + 1}`} style={{ width: '100%', height: '98%', borderRadius: '2px' }} />
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </Box>

                    {/* Product Details Section */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        bgcolor="#fff"
                        flex={1}
                        lineHeight={2}
                        p={3}
                        borderRadius={2}
                        boxShadow={2}
                        alignItems={'center'}
                    >
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            {item.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" paragraph>
                            {item.desc}
                        </Typography>

                        {/* Price Section */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            gap={1}
                            mb={2}
                        >
                            <Typography variant="h6" fontWeight={600} color="#0A7DFF">
                                {item.price}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                EGP
                            </Typography>
                        </Stack>

                        {/* Available Colors */}
                      
                        <Stack direction="row" spacing={2} mb={2} 
                        justifyContent={'flex-start'}
                        alignItems={'center'}
                        >
                            {item.colors && item.colors.length > 0 && (
                                <Typography variant="h6" fontWeight={600} mb={2}>
                                 Colors:
                                </Typography>
                            )}
                            {item.colors && item.colors.map((col, index) => (
                                <Box
                                    key={index}
                                    onClick={() => handleColorClick(col)}
                                    height={25}
                                    width={25}
                                    borderRadius="50%"
                                    bgcolor={col}
                                    sx={{
                                        cursor: "pointer",
                                        border: colors.includes(col) ? "3px solid #0A7DFF" : "none",
                                        transition: "border 0.3s ease",
                                    }}
                                />
                            ))}
                        </Stack>

                        {/* Quantity Selection */}
                        <Typography variant="body1" fontWeight={600} mb={1}>
                            Quantity:
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                            <IconButton onClick={handleDecrease} color="primary">
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                value={quantity}
                                type="number"
                                inputProps={{
                                    min: 1,
                                    style: { textAlign: "center", fontSize: "1rem" },
                                }}
                                variant="outlined"
                                size="small"
                                sx={{ width: 60 }}
                            />
                            <IconButton onClick={handleIncrease} color="primary">
                                <AddIcon />
                            </IconButton>
                        </Stack>

                        {/* Rating Section */}
                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                            <Typography variant="h6" fontWeight={600}>
                                {item.ratingsAverage}
                            </Typography>
                            <StarOutlinedIcon sx={{ color: "#fbc500" }} />
                            <Typography variant="body2" color="textSecondary">
                                ({item.numberOfRating} Reviews)
                            </Typography>
                        </Stack>

                        {/* Add to Cart Button */}
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                fontWeight: 600,
                                padding: "12px",
                                "&:hover": { bgcolor: "#0056b3", boxShadow: 2 },
                            }}
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add to Cart"}
                        </Button>
                    </Box>
                </Stack>

                <ReviewSection />
            </Container>

            <Footer />
        </>
    );
};

export default ProductDetailsPage;
