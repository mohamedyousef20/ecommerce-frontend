
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { Box, Card, CardMedia, Typography, Button, Grid } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import { addProductTOWishList, deleteProductFromWishList, getAllProductInWhishList } from '../../redux/action/wishlistAction';
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWishList = async () => {
      setIsLoading(true)
      await dispatch(getAllProductInWhishList());
      setIsLoading(false)
    }
    getWishList();
  }, [])


  const dispatch = useDispatch();
  // Select wishlist and cart data from the Redux store

  const wishlist = useSelector((state) => state.wishListReducer.allProductInWishList || []);
  // // const cart = useSelector((state) => state.cartReducer.cartItems);
  let isInWishlist = null;
  if (wishlist && wishlist.data) {
    isInWishlist = wishlist.data.some((item) => item._id === product._id);
  }
  // // const isInCart = cart.some((item) => item.product._id === product._id);


  const handleWishlistClick = async () => {
    setIsLoading(true);
    if (isInWishlist) {
      // Remove from wishlist
      await dispatch(deleteProductFromWishList({ productId: product._id }));
    } else {

      // Add to wishlist
      await dispatch(addProductTOWishList({ productId: product._id }));
    }
    setIsLoading(false);

    window.location.reload(true)
  };
  return (
    <Card sx={{
      width: '300px', // Set card width to 300px
      height: '400px', // Set card height to 300px
      p: 2,
      borderRadius: '2px',
      bgcolor: '#dbdbe0',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      marginBottom: 2, // Add margin to create space between cards vertically
      '&:hover': {
        transform: 'scale(1.02)',
        transition: 'transform 0.3s ease',
      }
    }}>


      {/* Wishlist and Cart Indicators */}
      {isInWishlist && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: '#f50057',
            color: 'white',
            borderRadius: '50%',
            padding: '6px',
            fontSize: '0.75rem',
            zIndex: 1,
          }}
        >
          <FavoriteIcon fontSize="small" />
        </Box>
      )}
      {/* {isInCart && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '50%',
            padding: '6px',
            fontSize: '0.75rem',
            zIndex: 1,
          }}
        >
          <ShoppingCartOutlinedIcon fontSize="small" />
        </Box>
      )} */}

      <Box width={'100%'} height={'65%'}>
        {/* Image */}
        <Link to={`/product/${product._id}`}>
          <CardMedia
            component="img"
            width={'100%'}
            height={'100%'} // Adjust image height to fit within smaller card
            image={product.imageCover}
            alt={product.name}
            sx={{
              objectFit: 'cover',
              borderRadius: '2px',
            }}
          />
        </Link>

      </Box>      {/* Product Name */}
      <Typography
        fontWeight={600}
        variant="body1" // Use body1 for better readability
        align="left"
        noWrap
        sx={{ marginTop: 1, fontSize: '1rem' }} // Slightly larger font for the product name
      >
        {product.name}
      </Typography>

      {/* Product Price */}
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ marginTop: 0.5, fontSize: '1rem', color: '#333' }}
      >
        {product.price} <span color='green'>(EGP)</span>
      </Typography>
      {/* 
      {product.priceAfterDiscount && (
        <Typography variant="body2" sx={{ color: "#f15", textDecoration: 'line-through' }}>
          {product.price}
        </Typography>
      )} */}
      {/* Rating and Reviews */}
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        sx={{ marginTop: 0.5, fontSize: '0.75rem' }} // Make font smaller for ratings
      >
        <StarOutlinedIcon sx={{ color: '#fbc500', fontSize: '1rem' }} />
        <Typography variant='body2' fontWeight={'600'} sx={{ fontSize: '1rem' }}>
          {product.ratingsAverage}
        </Typography>
        <Typography
          color='#9d9d9d'
          sx={{ fontSize: '0.75rem', marginLeft: 0.5 }}
        >
          ({product.numberOfRating} Reviews)
        </Typography>
      </Box>

      {/* Buttons */}
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{ marginTop: 1 }}
      >
        <Button
          onClick={handleWishlistClick}
          disabled={isLoading}
          sx={{
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: isInWishlist ? '#f50057' : '#151515',
            color: '#fff',
            borderRadius: '4px',
            '&:hover': {
              color: '#000',
              bgcolor: isInWishlist ? '#d50048' : '#0295db',
            },
            padding: '6px 12px',
            width: '48%',
          }}
          variant="contained"
        >
          {isInWishlist ? <FavoriteIcon /> : <FavoriteIcon />}

          {isInWishlist ? 'Remove' : ' Add'}
        </Button>

        <Button
          sx={{
            fontSize: '.75rem',
            fontWeight: '600',
            backgroundColor: "#151515",
            color: "#fff",
            borderRadius: "4px",
            "&:hover": {
              color: '#000',
              bgcolor: "#0295db",
            },
          }}
          variant="contained"
        > < ShoppingCartOutlinedIcon />add</Button>
      </Box>
    </Card>
  );
};


export default ProductCard;


// the original 