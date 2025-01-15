import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addProductTOWishList, deleteProductFromWishList } from '../../redux/action/wishlistAction';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlistReducer.items); // Wishlist from Redux state
  const [isLoading, setIsLoading] = useState(false);

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const handleWishlistClick = async () => {
    setIsLoading(true);
    if (isInWishlist) {
      // Remove from wishlist
        await dispatch(deleteProductFromWishList(product._id));
    } else {
      // Add to wishlist
      await dispatch(addProductTOWishList(product));
    }
    setIsLoading(false);
  };

  return (
    <Card sx={{ maxWidth: 300, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
          ${product.price}
        </Typography>
        <IconButton
          onClick={handleWishlistClick}
          color="error"
          disabled={isLoading}
          sx={{ marginTop: 1 }}
        >
          {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
