import React, { useState } from 'react';
import { Box, Typography, Slider, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const ProductFilters = ({ categories, handleFilterChange }) => {
    const [priceRange, setPriceRange] = useState([0, 500]);  // Assuming a default price range
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSort, setSelectedSort] = useState('newest');

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        handleFilterChange('price', newValue);
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategories(value);
        handleFilterChange('category', value);
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
        handleFilterChange('sort', event.target.value);
    };

    return (
        <Box sx={{ padding: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1, backgroundColor: '#fff' }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Filters</Typography>

            {/* Color Filter */}
            <Box mb={2}>
                <Typography variant="body1" fontWeight={500}>Color</Typography>
                <FormControl fullWidth>
                    <Select
                        multiple
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        renderValue={(selected) => selected.join(', ')}
                        displayEmpty
                    >
                        <MenuItem value="White">White</MenuItem>
                        <MenuItem value="Black">Black</MenuItem>
                        <MenuItem value="Red">Red</MenuItem>
                        <MenuItem value="Blue">Blue</MenuItem>
                        <MenuItem value="Green">Green</MenuItem>
                        <MenuItem value="Yellow">Yellow</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Price Range Filter */}
            <Box mb={2}>
                <Typography variant="body1" fontWeight={500}>Price Range</Typography>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}`}
                    min={0}
                    max={1000}
                    step={10}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">${priceRange[0]}</Typography>
                    <Typography variant="body2" color="textSecondary">${priceRange[1]}</Typography>
                </Box>
            </Box>

            {/* Sort by Section */}
            <Box mb={2}>
                <Typography variant="body1" fontWeight={500}>Sort by</Typography>
                <FormControl fullWidth>
                    <Select
                        value={selectedSort}
                        onChange={handleSortChange}
                    >
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="price-asc">Price: Low to High</MenuItem>
                        <MenuItem value="price-desc">Price: High to Low</MenuItem>
                        <MenuItem value="most-rated">Most Rated</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Categories Filter */}
            <Box mb={2}>
                <Typography variant="body1" fontWeight={500}>Category</Typography>
                <FormControl fullWidth>
                    <Select
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        multiple
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Apply Button */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleFilterChange('apply')}
            >
                Apply Filters
            </Button>
        </Box>
    );
};

const SidebarFilters = ({ categories, handleFilterChange }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                width: { xs: '100%', md: '300px' }, 
                padding: 3,
                backgroundColor: '#f9f9f9',
            }}
        >
            {/* <ProductFilters categories={categories} handleFilterChange={handleFilterChange} /> */}
        </Box>
    );
};

export default SidebarFilters;
