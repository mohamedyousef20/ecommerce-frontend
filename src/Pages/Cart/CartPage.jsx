import { IconButton, TextField, Box, Button, CardMedia, Stack, Typography, Grid, Divider, Paper, CircularProgress } from '@mui/material';
import Navbar from '../../Components/Utils/NavbarLogged';
import Footer from '../../Components/Utils/Footer';
import Coupons from '../../Components/Coupons';
import { Delete } from '@mui/icons-material';
import GetUserCartHook from '../../customHooks/Cart/get-user-cart-hook';
import WarningModal from '../../Components/Utils/WarningModal';
import { Link } from 'react-router-dom';

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

    // Check if cart is empty
    const isCartEmpty = !response.data?.cartItem || response.data.cartItem.length === 0;

    return (
        <Box>
            <Stack direction={{ xs: 'column', md: 'row' }} m={2} gap={2} justifyContent={'center'} alignItems={'center'}>
                <Box>
                    <Link to={'/product'}>
                        <Button sx={{ bgcolor: '#151515', color: '#fff', textTransform: 'none' }}>
                            Continue Shopping
                        </Button>
                    </Link>
                </Box>
                <Box>
                    <Link to={isCartEmpty ? '#' : `${cartId}/payment`}>
                        <Button
                            sx={{
                                bgcolor: isCartEmpty ? '#gray' : '#0295db',
                                color: '#fff',
                                textTransform: 'none',
                                '&:disabled': {
                                    bgcolor: '#gray',
                                    opacity: 0.6,
                                    cursor: 'not-allowed'
                                }
                            }}
                            disabled={isCartEmpty}
                        >
                            Checkout Now
                        </Button>
                    </Link>
                </Box>
            </Stack>

            <Stack direction="row" justifyContent="space-between" m={2} spacing={3}>
                <Stack bgcolor={'#fff'} direction={'column'} justifyContent={'flex-start'} spacing={3} sx={{ flex: 1 }}>
                    {response.data && response.data.cartItem ? (
                        response.data.cartItem.map((item) => (
                            <Grid container spacing={2} sx={{ padding: 1 }} key={item._id}>
                                <Grid item xs={12} md={3} display="flex" justifyContent="center" alignItems="center">
                                    <CardMedia
                                        component="img"
                                        image={item.imageCover}
                                        sx={{
                                            width: '80%',
                                            height: '80%',
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                            maxWidth: 200,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={7}>
                                    <Stack direction="column" spacing={1} sx={{ padding: { xs: 2, md: 3 }, fontSize: '0.9rem' }}>
                                        <Stack direction="column" spacing={1}>
                                            <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={1}>
                                                <Typography variant="h6" fontWeight={'600'}>
                                                    Product:
                                                </Typography>
                                                <Typography variant="body1" color="#0009" fontWeight={500}>
                                                    {item.product}
                                                </Typography>
                                            </Stack>

                                            <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={1}>
                                                <Typography variant="h6" fontWeight={'600'}>
                                                    Color:
                                                </Typography>
                                                <Box
                                                    height={20}
                                                    width={20}
                                                    borderRadius={'50%'}
                                                    bgcolor={item.color}
                                                    mx={1}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                            </Stack>

                                            <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={1}>
                                                <Typography variant="h6" fontWeight={'600'}>
                                                    Price:
                                                </Typography>
                                                <Typography variant="body1" color="#0009" fontWeight={500}>
                                                    {item.price} (EGP)
                                                </Typography>
                                            </Stack>

                                            <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={1}>
                                                <Typography variant="h6" fontWeight={'600'}>
                                                    Quantity:
                                                </Typography>
                                                <TextField
                                                    value={quantities[item._id] || item.quantity}
                                                    type="number"
                                                    inputProps={{ min: 1 }}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ width: 60, textAlign: 'center' }}
                                                    onChange={(e) => handleQuantityChange(e, item._id)}
                                                />
                                                <Button
                                                    onClick={() => handleUpdateQuantity(item._id, quantities[item._id] || item.quantity)}
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                >
                                                    Apply
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <IconButton
                                    onClick={() => { setItemId(item._id); setIsModalOpen(true); }}
                                    sx={{ color: 'red', marginTop: 2, transform: 'none' }}
                                >
                                    <Delete />
                                </IconButton>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h5" color="textSecondary" align="center">
                            No Product In Your Cart. Enter to add one.
                        </Typography>
                    )}
                </Stack>

                <Stack direction="column" sx={{ flex: 0.35 }} spacing={2}>
                    {response.data ? (
                        <Paper sx={{ padding: 4, margin: 4 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                                <Coupons />
                            </Box>

                            <Box display="flex" justifyContent="space-between" marginBottom={2}>
                                <Typography variant="h6">Total Price</Typography>
                                <Typography variant="h6">${response.data.totalPrice}</Typography>
                            </Box>

                            {response.data.priceAfterDiscount >= 0 && (
                                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                                    <Typography variant="h6" color="primary">
                                        Discount Applied
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        -${(response.data.totalPrice) - (response.data.priceAfterDiscount)}
                                    </Typography>
                                </Box>
                            )}

                            {response.data.priceAfterDiscount ? (
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="h6">Final Price</Typography>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${response.data.priceAfterDiscount}
                                    </Typography>
                                </Box>
                            ) : (
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="h6">Final Price</Typography>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${response.data.totalPrice}
                                    </Typography>
                                </Box>
                            )}

                            <Box display="flex" justifyContent="center" marginTop={4}>
                                <Link to={isCartEmpty ? '#' : `${cartId}/payment`}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{
                                            padding: '10px 40px',
                                            '&:disabled': {
                                                bgcolor: '#gray',
                                                opacity: 0.6,
                                                cursor: 'not-allowed'
                                            }
                                        }}
                                        disabled={isCartEmpty}
                                    >
                                        Checkout
                                    </Button>
                                </Link>
                            </Box>
                        </Paper>
                    ) : (
                        <CircularProgress />
                    )}
                </Stack>
            </Stack>

            <Footer />
            <WarningModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                message="Are you sure you want to delete this item?"
            />
        </Box>
    );
};

export default CartPage;