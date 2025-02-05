import { Box, Stack, Typography, Slider, Select, MenuItem, Grid, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import Product from "../../Components/Product/ProductContainer";
import Navbar from "../../Components/Utils/NavbarLogged";
import GetProductList from "../../customHooks/Product/GetProductList";
import GetProductSearchHook from "../../customHooks/Product/GetProductSearchHook";
import AdminGetAllCategoryHook from "../../customHooks/Category/AdminGetAllCategoryHook";
import AdminGetAllBrandHook from "../../customHooks/Admin/Brand/AdminGetAllBrandHook";
import {  FormControl, InputLabel, Button } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import SortIcon from '@mui/icons-material/Sort';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ProductPage = () => {
    const [defaultProducts] = GetProductList();
    const [
        sortOption,
        setSortOption,
        category,
        setCategory,
        brand,
        setPriceRange,
        priceRange,
        setBrand,
        handleSearch,
        searchedProducts
    ] = GetProductSearchHook();
    // const [category, setCategory] = useState("");
    // const [brand, setBrand] = useState("");
console.log(priceRange)
    const [allCategories] = AdminGetAllCategoryHook();
    const [allBrands] = AdminGetAllBrandHook();
    // Filtering logic
    let products = searchedProducts.length > 0 ? searchedProducts : defaultProducts;

    // if (category) {
    //     setCategory(category)
    //     // products = products.filter((product) => product.category === category);
    // }

    // if (brand) {
    //     setBrand(brand)
    //     // products = products.filter((product) => product.brand === brand);
    // }

    // products = products.filter(
    //     (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    // );

    // // Sorting logic
    // if (sortOption === "most-sold") {
    //     products.sort((a, b) => b.sold - a.sold);
    // } else if (sortOption === "price-low-high") {
    //     products.sort((a, b) => a.price - b.price);
    // } else if (sortOption === "price-high-low") {
    //     products.sort((a, b) => b.price - a.price);
    // } else if (sortOption === "most-rated") {
    //     products.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    // }

    console.log(sortOption)

    return (
        <>

            {/* Filters in a Row */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                gap={2}
                alignItems="center"
                mt={3}
                px={{ xs: 2, sm: 4 }}
                py={3}
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    position: "sticky",
                    top: 80,
                    zIndex: 999,
                    transition: "all 0.3s ease",
                    '&:hover': {
                        boxShadow: "0 12px 48px rgba(0, 0, 0, 0.1)"
                    }
                }}
            >
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {/* Category Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                displayEmpty
                                variant="outlined"
                                sx={{
                                    borderRadius: "12px",
                                    bgcolor: "rgba(245, 245, 245, 0.5)",
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "rgba(0, 0, 0, 0.1) !important"
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "rgba(0, 0, 0, 0.2) !important"
                                    }
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <CategoryIcon sx={{ color: "text.secondary" }} />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="" sx={{ fontSize: 14 }}>All Categories</MenuItem>
                                {allCategories?.data?.map((cat) => (
                                    <MenuItem key={cat._id} value={cat._id} sx={{ fontSize: 14, py: 1 }}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            {cat.icon && <Box component="img" src={cat.icon} sx={{ width: 20, height: 20 }} />}
                                            {cat.name}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Brand Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <Select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                displayEmpty
                                variant="outlined"
                                sx={{
                                    borderRadius: "12px",
                                    bgcolor: "rgba(245, 245, 245, 0.5)",
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "rgba(0, 0, 0, 0.1) !important"
                                    }
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BrandingWatermarkIcon sx={{ color: "text.secondary" }} />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="" sx={{ fontSize: 14 }}>All Brands</MenuItem>
                                {allBrands?.data?.map((br) => (
                                    <MenuItem key={br._id} value={br._id} sx={{ fontSize: 14, py: 1 }}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            {br.logo && <Box component="img" src={br.logo} sx={{ width: 20, height: 20 }} />}
                                            {br.name}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Price Range Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ width: "100%", px: 2 }}>
                            <Typography variant="caption" color="text.secondary" sx={{
                                display: "block",
                                mb: 1,
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.5px"
                            }}>
                                Price: ${priceRange[0]} - ${priceRange[1]}
                            </Typography>
                            <Slider
                                value={priceRange}
                                onChange={(e, newValue) => setPriceRange(newValue)}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                                sx={{
                                    color: "primary.main",
                                    height: 6,
                                    '& .MuiSlider-thumb': {
                                        width: 16,
                                        height: 16,
                                        '&:hover': {
                                            boxShadow: "0 0 0 8px rgba(63, 81, 181, 0.1)"
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Sorting Dropdown */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <Select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                displayEmpty
                                variant="outlined"
                                sx={{
                                    borderRadius: "12px",
                                    bgcolor: "rgba(245, 245, 245, 0.5)",
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "rgba(0, 0, 0, 0.1) !important"
                                    }
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SortIcon sx={{ color: "text.secondary" }} />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="" sx={{ fontSize: 14 }}>Sort by</MenuItem>
                                <MenuItem value="-sold" sx={{ fontSize: 14, py: 1 }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <WhatshotIcon fontSize="small" /> Popular
                                    </Box>
                                </MenuItem>
                                <MenuItem value="price" sx={{ fontSize: 14, py: 1 }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <TrendingUpIcon fontSize="small" /> Price: Low-High
                                    </Box>
                                </MenuItem>
                                <MenuItem value="-price" sx={{ fontSize: 14, py: 1 }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <TrendingDownIcon fontSize="small" /> Price: High-Low
                                    </Box>
                                </MenuItem>
                                <MenuItem value="-ratingsAverage" sx={{ fontSize: 14, py: 1 }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <StarBorderIcon fontSize="small" /> Top Rated
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Stack>
            {/* Products Section */}
            <Box mt={4} px={4}>
                <Typography variant="h5">{`Showing ${products.length} products`}</Typography>
                <Product products={products} />
            </Box>
        </>
    );
};

export default ProductPage;
// this is work 