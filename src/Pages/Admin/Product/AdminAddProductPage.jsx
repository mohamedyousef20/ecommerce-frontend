import React from 'react';
import {
    Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography
} from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { CompactPicker } from 'react-color';
import AddProdHook from '../../../customHooks/Admin/AddProdHook';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import LoadingProgress from '../../../Components/LoadingProgress';
import MultipleImageInput from '../../../Components/Admin/AdminAllProduct/MultipleImageInput';

const AdminAddProductPage = () => {
    const [
        productImages,
        setProductImages,
        crop,
        setCateID,
        handelName,
        prodName,
        handelDesc,
        desc,
        handelProductPriceBeforeDiscount,
        handelProductPriceAfterDiscount,
        priceAfterDiscount,
        Qty,
        handelSelectCate,
        removeColor,
        colors,
        cateID,
        handelQuantityInStock,
        priceBeforeDiscount,
        category,
        showColor,
        handelChangeComplete,
        handleSubmit,
        handelShowHidePicker,
        errors,
        handleChange,
        loading,
        brands, // Fetch brands from the custom hook
        brandID, // Selected brand ID
        handelSelectBrand, // Function to handle brand selection
    ] = AddProdHook();

    return (
        <>
            <LoadingProgress loading={loading} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                }}
            >
                <AdminSideBar />
                <Box
                    component="main"
                    maxWidth="md"
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        padding: 4,
                        my:4,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 3,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        ml: 3, // Add a gap between the sidebar and the main content
                    }}
                >
                    {/* Product Header */}
                    <Box mb={3} textAlign="center">
                        <Typography
                            fontSize="1.75rem"
                            fontWeight={700}
                            color="#1976D2" // Royal Blue
                        >
                            Add New Product
                        </Typography>
                        <Typography
                            fontSize="0.875rem"
                            color="text.secondary"
                            mt={1}
                        >
                            Fill in the details to add a new product.
                        </Typography>
                    </Box>

                    {/* Product Images */}
                    {productImages && (
                        <MultipleImageInput
                            images={productImages}
                            setImages={setProductImages}
                            error={!!errors.productImages}
                            helperText={errors.productImages}
                            max={4}
                        />
                    )}

                    {/* Form Fields */}
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {/* Left Column */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                variant="outlined"
                                value={prodName}
                                onChange={handelName}
                                error={!!errors.prodName}
                                helperText={errors.prodName}
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#F5F5F5', // Light Gray
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Product Description"
                                variant="outlined"
                                value={desc}
                                onChange={handelDesc}
                                error={!!errors.desc}
                                helperText={errors.desc}
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#F5F5F5', // Light Gray
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Quantity in Stock"
                                variant="outlined"
                                type="number"
                                value={Qty}
                                onChange={handelQuantityInStock}
                                error={!!errors.Qty}
                                helperText={errors.Qty}
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#F5F5F5', // Light Gray
                                    },
                                }}
                            />
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={12} md={6}>
                            {/* Category Selection */}
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={cateID}
                                    onChange={handelSelectCate}
                                    label="Category"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#F5F5F5', // Light Gray
                                        },
                                    }}
                                >
                                    {category && category.data ? (
                                        category.data.map((cat) => (
                                            <MenuItem key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </MenuItem>
                                        ))
                                    ) : null}
                                </Select>
                                <Typography color="error">{errors.cateID}</Typography>
                            </FormControl>

                            {/* Brand Selection */}
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Brand</InputLabel>
                                <Select
                                    value={brandID}
                                    onChange={handelSelectBrand}
                                    label="Brand"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#F5F5F5', // Light Gray
                                        },
                                    }}
                                >
                                    {brands && brands.data ? (
                                        brands.data.map((brand) => (
                                            <MenuItem key={brand._id} value={brand._id}>
                                                {brand.name}
                                            </MenuItem>
                                        ))
                                    ) : null}
                                </Select>
                                <Typography color="error">{errors.brandID}</Typography>
                            </FormControl>

                            {/* Price Inputs */}
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Price Before Discount"
                                        variant="outlined"
                                        type="number"
                                        value={priceBeforeDiscount}
                                        onChange={handelProductPriceBeforeDiscount}
                                        error={!!errors.priceBeforeDiscount}
                                        helperText={errors.priceBeforeDiscount}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: '#F5F5F5', // Light Gray
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Price After Discount"
                                        variant="outlined"
                                        type="number"
                                        value={priceAfterDiscount}
                                        onChange={handelProductPriceAfterDiscount}
                                        error={!!errors.priceAfterDiscount}
                                        helperText={errors.priceAfterDiscount}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: '#F5F5F5', // Light Gray
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Color Picker */}
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                                <Typography variant="h6" fontWeight={600}>
                                    Color:
                                </Typography>
                                {colors && colors.length >= 1 ? (
                                    colors.map((color) => (
                                        <Box
                                            key={color}
                                            height={20}
                                            width={20}
                                            borderRadius="50%"
                                            bgcolor={color}
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => removeColor(color)}
                                        />
                                    ))
                                ) : (
                                    <Typography color="error" variant="caption">
                                        Please select at least one color.
                                    </Typography>
                                )}
                                <IconButton onClick={handelShowHidePicker}>
                                    <AddOutlined
                                        sx={{
                                            color: '#151515',
                                            border: '1px solid #151515',
                                            borderRadius: '50%',
                                        }}
                                    />
                                </IconButton>
                                {showColor && <CompactPicker onChangeComplete={handelChangeComplete} />}
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            mt: 4,
                            py: 1.5,
                            backgroundColor: '#1976D2', // Royal Blue
                            color: '#FFFFFF',
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: '1rem',
                            textTransform: 'none',
                            boxShadow: '0px 4px 6px rgba(25, 118, 210, 0.2)',
                            '&:hover': {
                                backgroundColor: '#1565C0', // Darker Royal Blue
                                boxShadow: '0px 6px 8px rgba(25, 118, 210, 0.3)',
                            },
                            '&:active': {
                                backgroundColor: '#0D47A1', // Even Darker Royal Blue
                            },
                        }}
                    >
                        Add Product
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default AdminAddProductPage;