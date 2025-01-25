import { Box, Stack, Typography, Slider, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Product from "../../Components/Product/ProductContainer";
import Navbar from "../../Components/Utils/NavbarLogged";
import GetProductList from "../../customHooks/Product/GetProductList";
import GetProductSearchHook from "../../customHooks/Product/GetProductSearchHook";
import AdminGetAllCategoryHook from "../../customHooks/Category/AdminGetAllCategoryHook";
import AdminGetAllBrandHook from "../../customHooks/Admin/Brand/AdminGetAllBrandHook";
import {  FormControl, InputLabel, Button } from "@mui/material";

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
                direction="row"
                justifyContent="center"
                gap={1}
                alignItems="center"
                mt={2}
                px={4}
                sx={{
                    flexWrap: "wrap",
                    backgroundColor: "#f9f9f9",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                {/* Category Filter */}
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        sx={{ minWidth: 150 }}
                        renderValue={(selected) => {
                            if (!selected) {
                                return "All Category";
                            }
                            const selectedCategory = allCategories?.data?.find((cat) => cat._id === selected);
                            return selectedCategory ? selectedCategory.name : "All Category";
                        }}
                    >
                        <MenuItem value="">All Category</MenuItem>
                        {allCategories?.data &&
                            allCategories.data.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                    </Select>
                </Box>

                {/* Brand Filter */}
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        displayEmpty
                        sx={{ minWidth: 150 }}
                        renderValue={(selected) => {
                            if (!selected) {
                                return "All Brand";
                            }
                            const selectedBrand = allBrands?.data?.find((br) => br._id === selected);
                            return selectedBrand ? selectedBrand.name : "All Brand";
                        }}
                    >
                        <MenuItem value="">All Brand</MenuItem>
                        {allBrands?.data &&
                            allBrands.data.map((br) => (
                                <MenuItem key={br._id} value={br._id}>
                                    {br.name}
                                </MenuItem>
                            ))}
                    </Select>
                </Box>

                {/* Price Range Filter */}
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography fontSize="1rem" fontWeight={500} mx={2} color="#333">
                        Price:
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={(e, newValue) => setPriceRange(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                        sx={{ width: 200 }}
                    />
                    <Typography>{`$${priceRange[0]} - $${priceRange[1]}`}</Typography>
                </Box>

                {/* Sorting Dropdown */}
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography fontSize="1rem" fontWeight={500} mx={2} color="#333">
                        Sort by:
                    </Typography>
                    <Select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        displayEmpty
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">Default</MenuItem>
                        <MenuItem value="-sold">Most Sold</MenuItem>
                        <MenuItem value="price">Price: Low to High</MenuItem>
                        <MenuItem value="-price">Price: High to Low</MenuItem>
                        <MenuItem value="-ratingsAverage">Most Rated</MenuItem>
                    </Select>
                </Box>
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
