import { Alert, Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { CompactPicker } from 'react-color';
import React, { useEffect, useState } from 'react';
import EditProdHook from '../../../customHooks/Admin/EditProdHook';
import { useParams } from 'react-router-dom';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import MultipleImageInput from '../../../Components/Admin/AdminAllProduct/MultipleImageInput';

const AdminEditProductPage = () => {
    const { id } = useParams();

    const [
        productImages,
        setProductImages,
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
        setCateID,
        brand,
        brandID,
        setBrandID,
        handleBrandChange,
        handelQuantityInStock,
        priceBeforeDiscount,
        category,
        showColor,
        handelChangeComplete,
        handleSubmit,
        handelShowHidePicker
    ] = EditProdHook(id);

 
    return (
        <div>
            <Stack direction={'row'} justifyContent={'space-between'} gap={1}>
                <AdminSideBar />
                <Box flex={2}>
                    <Typography fontSize={'1.5rem'} fontWeight={600} color='#1976d2'>
                        Edit Product
                    </Typography>

                    {productImages?.length ? (
                        <MultipleImageInput images={productImages} setImages={setProductImages} max={4} />
                    ) : (
                        <Alert severity='info'>No Images Found</Alert>
                    )}

                    <Stack direction={'row'} justifyContent={'space-around'} alignItems={'flex-start'}>
                        <Box>
                            {/* Product Name Input */}
                            <TextField
                                fullWidth
                                label="Enter Product Name"
                                variant="outlined"
                                value={prodName}
                                onChange={handelName}
                                sx={{ mb: 3, backgroundColor: '#fafafa' }}
                            />

                            {/* Product Description Input */}
                            <TextField
                                fullWidth
                                label="Add Product Description"
                                variant="outlined"
                                value={desc}
                                onChange={handelDesc}
                                sx={{ mb: 3, backgroundColor: '#fafafa' }}
                            />
                        </Box>

                        <Box>
                            <TextField
                                fullWidth
                                label="Enter Quantity"
                                variant="outlined"
                                type="number"
                                value={Qty}
                                onChange={handelQuantityInStock}
                                sx={{ mb: 3, backgroundColor: '#fafafa' }}
                            />

                            {/* Category Select Input */}
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Category</InputLabel>
                                <Select value={cateID} onChange={handelSelectCate} label="Category">
                                    {category?.data?.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Brand Select Input */}
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Brand</InputLabel>
                                <Select value={brandID} onChange={handleBrandChange} label="Brand">
                                    {brand?.data?.map((brand) => (
                                        <MenuItem key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box>
                            {/* Price Inputs */}
                            <Grid container spacing={3} sx={{ mb: 3 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Price Before Discount"
                                        variant="outlined"
                                        type="number"
                                        value={priceBeforeDiscount}
                                        onChange={handelProductPriceBeforeDiscount}
                                        sx={{ backgroundColor: '#fafafa' }}
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
                                        sx={{ backgroundColor: '#fafafa' }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Color Selection */}
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'left'} gap={1}>
                                <Typography variant='h6' fontWeight={'600'}>Color:</Typography>
                                {Array.isArray(colors) && colors.length > 0 ? (
                                    colors.map((color, index) => (
                                        <Box
                                            key={index}
                                            height={20}
                                            width={20}
                                            borderRadius={'50%'}
                                            bgcolor={color}
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => removeColor(color)}
                                        />
                                    ))
                                ) : null}


                                <IconButton onClick={handelShowHidePicker}>
                                    <AddOutlined sx={{ color: '#151515', border: '1px solid #151515', borderRadius: '50%' }} />
                                </IconButton>
                                {showColor && <CompactPicker onChangeComplete={handelChangeComplete} />}
                            </Stack>
                        </Box>
                    </Stack>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            px: 2, py: 1.5, mt: 2, backgroundColor: "#1976d2", fontWeight: '600',
                            color: "#fff", borderRadius: "1px",
                            "&:hover": { color: '#fff', bgcolor: "#151515" }
                        }}>
                        EDIT PRODUCT
                    </Button>
                </Box>
            </Stack>
        </div>
    );
};

export default AdminEditProductPage;
