import { Box, Button, CircularProgress, FormControl, Grid2, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import MultiImageInput from 'react-multiple-image-input'
import { AddOutlined, LocalDiningOutlined } from '@mui/icons-material'
import { CompactPicker } from 'react-color'
import React, { useState } from 'react';
import AddProdHook from '../../../customHooks/Admin/AddProdHook';
import { ChromePicker } from 'react-color';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import MultipleImageInput from '../../../Components/Admin/AdminAllProduct/MultipleImageInput'
import EditProdHook from '../../../customHooks/Admin/EditProdHook';
import { useParams } from 'react-router-dom';


const AdminEditProductPage = () => {
    const { id } = useParams()

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
        handelQuantityInStock,
        priceBeforeDiscount,
        category,
        showColor,
        handelChangeComplete,
        handleSubmit,
        handelShowHidePicker



    ] = EditProdHook(id);


    // Example category, brand, and subcategory options
    const categories = ['Electronics', 'Fashion', 'Home Appliances'];
    const brands = ['Apple', 'Samsung', 'Nike'];
    const subcategories = ['Smartphones', 'Laptops', 'Headphones', 'Shoes', 'Washing Machines'];


    return (
        <div>

            <Stack direction={'row'} justifyContent={'space-between'} gap={1}>

                <AdminSideBar />

                <Box flex={2}>

                    <Box>
                        <Typography fontSize={'1.5rem'} fontWeight={600} color='#1976d2'>
                            Edit Product
                        </Typography>
                    </Box>

                    {productImages ? <MultipleImageInput
                        images={productImages}
                        setImages={setProductImages}
                        max={5}
                    /> : <CircularProgress />}





                    <Stack direction={'row'} justifyContent={'space-around'}
                        alignItems={'flex-start'}>

                        <Box>
                            {/* Product Name Input Field */}
                            <TextField
                                fullWidth
                                label="Enter Product Name"
                                variant="outlined"
                                value={prodName}
                                onChange={handelName}
                                sx={{
                                    mb: 3,
                                    '& .MuiInputBase-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa',
                                    },
                                }}
                            />

                            {/* Product desc Input Field */}
                            <TextField
                                fullWidth
                                label="Add Product Description"
                                variant="outlined"
                                value={desc}
                                onChange={handelDesc}
                                sx={{
                                    mb: 3,
                                    '& .MuiInputBase-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa',
                                    },
                                }}
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
                                sx={{
                                    mb: 3,
                                    '& .MuiInputBase-root': {
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa',
                                    },
                                }}
                            />

                            {/* Category Select Input */}

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Category</InputLabel>
                                <Select value={cateID} onChange={handelSelectCate} label="Category">
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* Subcategory Multi-select Input  */}


                            {/* 
                            {/* Brand Select Input */}
                            <Typography variant="h5" sx={{ mb: 1 }}>
                                Brand
                            </Typography>


                        </Box>
                        <Box>

                            {/* Price Inputs */}
                            <Grid2 container spacing={3} sx={{ mb: 3 }}>
                                <Grid2 item xs={6}>

                                    <TextField
                                        fullWidth
                                        label="Price Before Discount"
                                        variant="outlined"
                                        type="number"
                                        value={priceBeforeDiscount}
                                        onChange={handelProductPriceBeforeDiscount}
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: 2,
                                                backgroundColor: '#fafafa',
                                            },
                                        }}
                                    />
                                </Grid2>

                                <Grid2 item xs={6}>

                                    <TextField
                                        fullWidth
                                        label="Price After Discount"
                                        variant="outlined"
                                        type="number"
                                        value={priceAfterDiscount}
                                        onChange={handelProductPriceAfterDiscount}
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                borderRadius: 2,
                                                backgroundColor: '#fafafa',
                                            },
                                        }}
                                    />
                                </Grid2>
                            </Grid2>

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Subcategory</InputLabel>
                                <Select
                                    multiple
                                    // value={subcategory}
                                    // onChange={handleSubcategoryChange}
                                    label="Subcategory"
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {/* {subcategories.map((sub) => (
                                        <MenuItem key={sub} value={sub}>
                                            <Checkbox checked={subcategory.indexOf(sub) > -1} />
                                            <ListItemText primary={sub} />
                                        </MenuItem>
                                    ))} */}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Brand</InputLabel>
                                {/* <Select 
                                // value={brand}
                                //  onChange={handleBrandChange} label="Brand">
                                    {brands.map((b) => (
                                        <MenuItem key={b} value={b}>
                                            {b}
                                        </MenuItem>
                                    ))}
                                </Select> */}
                            </FormControl>

                            <Stack direction={'row'} alignItems={'center'} justifyContent={'left'} gap={1}>


                                <Typography variant='h6' fontWeight={'600'} mr={1}>Color:</Typography>


                                {colors && colors.length >= 1 ? (
                                    colors.map((color) => {
                                        return (<Box height={20}
                                            onClick={() => removeColor(color)}
                                            width={20}
                                            borderRadius={'50%'}
                                            bgcolor={color}
                                            sx={{ cursor: 'pointer' }}>

                                        </Box>)
                                    }
                                    )
                                ) : null}


                                <IconButton onClick={handelShowHidePicker}>
                                    <AddOutlined sx={{
                                        color: '#151515',
                                        border: '1px solid #151515',
                                        borderRadius: '50%',
                                        // ':hover': { scale: 1.13 }
                                    }} />
                                </IconButton>
                                {showColor ? <CompactPicker onChangeComplete={handelChangeComplete} /> : null}
                            </Stack>
                        </Box>
                    </Stack>



                    <Button
                        variant="contained"
                        onClick={handleSubmit}

                        sx={{
                            px: 2,
                            py: 1.5,
                            mt: 2,
                            backgroundColor: "#1976d2",
                            fontWeight: '600',

                            // boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                            color: "#fff",
                            borderRadius: "1px",
                            "&:hover": {
                                color: '#fff',
                                bgcolor: "#151515",
                                boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                            }
                        }
                        } >
                        ADD PRODUCT


                    </Button>
                </Box>
            </Stack>
        </div >
    )
}

export default AdminEditProductPage

// orig