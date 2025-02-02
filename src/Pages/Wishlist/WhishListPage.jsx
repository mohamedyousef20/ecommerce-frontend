import { Box, Grid, Card, CardMedia, CardContent, Typography, IconButton, CircularProgress, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { updateProductWishListStatus, getAllProductInWishList } from '../../redux/action/wishlistAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { Link } from "react-router-dom";
import GetAllWishListProduct from '../../customHooks/Wishlist/GetAllWishListProduct';
import PaginationTabs from '../../Components/Utils/Pagination';

const WishListPage = () => {
  const dispatch = useDispatch();

  const [prodInWishlist, isLoading, setIsLoading, paginationResult, onPageChange] = GetAllWishListProduct();

  console.log(prodInWishlist)

  const handleWishlistClick = async (productId) => {
    console.log('id', productId)
    setIsLoading(true);
    await dispatch(updateProductWishListStatus({ productId }));
    setIsLoading(false);
    window.location.reload(true)
  };
  console.log('prodInWishlist', prodInWishlist)
  return (
    <Box sx={{ padding: 3 }}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : prodInWishlist?.data?.length === 0 ? (
        <Box display="flex" justifyContent="center">
          <Alert severity="info">You have no products in your wishlist at the moment.</Alert>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {prodInWishlist.data.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id} sx={{ display: 'flex' }}>
              <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', width: '100%' }}>
                <Card
                  sx={{
                    maxWidth: 300,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia component="img" height="250" image={product.imageCover} alt={product.name} />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom>{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>${product.price}</Typography>
                    <IconButton
                      onClick={() => handleWishlistClick(product._id)}
                      color="error"
                      disabled={isLoading}
                      sx={{ marginTop: 1 }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
      <PaginationTabs paginationResult={paginationResult} onPageChange={onPageChange} />
    </Box>

  );
};

export default WishListPage;
