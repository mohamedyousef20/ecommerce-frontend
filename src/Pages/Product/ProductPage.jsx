import { Box, Stack, Typography, Slider, Select, MenuItem, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import Product from "../../Components/Product/ProductContainer";
import GetProductList from "../../customHooks/Product/GetProductList";
import AdminGetAllCategoryHook from "../../customHooks/Category/AdminGetAllCategoryHook";
import AdminGetAllBrandHook from "../../customHooks/Admin/Brand/AdminGetAllBrandHook";
import PaginationTabs from "../../Components/Utils/Pagination";

const ProductPage = () => {
    const [
        products,
        paginationResult,
        onPageChange,
        onSearch,
        onSort,
        onCategoryChange,
        onBrandChange,
        onPriceRangeChange,
        filters,
    ] = GetProductList();

    const [allCategories] = AdminGetAllCategoryHook();
    const [allBrands] = AdminGetAllBrandHook();

    return (
        <>
            {/* Filters in a Row */}
            <Stack direction="row" justifyContent="center" gap={2} alignItems="center" mt={2} px={4}>
                {/* Category Filter */}
                <Select
                    value={filters.category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="">All Category</MenuItem>
                    {allCategories?.data?.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                    ))}
                </Select>

                {/* Brand Filter */}
                <Select
                    value={filters.brand}
                    onChange={(e) => onBrandChange(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="">All Brand</MenuItem>
                    {allBrands?.data?.map((br) => (
                        <MenuItem key={br._id} value={br._id}>{br.name}</MenuItem>
                    ))}
                </Select>

                {/* Price Range Filter */}
                <Box sx={{ width: 300 }}>
                    <Typography>Price Range</Typography>
                    <Slider
                        value={filters.priceRange}
                        onChange={(e, newValue) => onPriceRangeChange(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                    />
                </Box>

                {/* Sorting Dropdown */}
                <Select
                    value={filters.sort}
                    onChange={(e) => onSort(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="most-sold">Most Sold</MenuItem>
                    <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                    <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                    <MenuItem value="most-rated">Most Rated</MenuItem>
                </Select>
            </Stack>

            {/* Products Section */}
            <Box mt={4} px={4}>
                <Typography variant="h5">{`Showing ${products.length} products`}</Typography>
                <Product products={products} />
            </Box>

            {/* Pagination */}
            <PaginationTabs paginationResult={paginationResult} onPageChange={onPageChange} />
        </>
    );
};

export default ProductPage;