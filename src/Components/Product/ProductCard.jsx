import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { Box, Card, CardMedia, Typography, Button } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addProductTOWishList, updateProductWishListStatus, getAllProductInWishList } from "../../redux/action/wishlistAction";
import { Link } from "react-router-dom";
import { Discount } from "@mui/icons-material";

const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getWishList = async () => {
      setIsLoading(true);
      await dispatch(getAllProductInWishList());
      setIsLoading(false);
    };
    getWishList();
  }, [dispatch]);

  const wishlist = useSelector((state) => state.wishListReducer.allProductInWishList || []);
  let isInWishlist = wishlist?.data?.some((item) => item._id === product._id) || false;

  const handleWishlistClick = async () => {
    setIsLoading(true);
    if (isInWishlist) {
      await dispatch(updateProductWishListStatus({ productId: product._id }));
    } else {
      await dispatch(addProductTOWishList({ productId: product._id }));
    }
    setIsLoading(false);
    window.location.reload(true);
  };

  // Calculate Discount Percentage
  const discountPercent = product.priceAfterDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  return (
    <Card
      sx={{
        width: "300px",
        height: "400px",
        p: 2,
        borderRadius: "12px",
        background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        marginBottom: 2,
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.02)",
          transition: "transform 0.3s ease",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* Discount Badge */}
      {product.priceAfterDiscount && (
        <Box
          sx={{
            position: "absolute",
            top: 15,
            left: 15,
            backgroundColor: "#f50057",
            color: "white",
            borderRadius: "4px",
            padding: "4px 8px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            zIndex: 1,
          }}
        >
          <Discount />  -{discountPercent}%
        </Box>
      )}

      {/* Wishlist Icon */}
      {isInWishlist && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "#f50057",
            color: "white",
            borderRadius: "50%",
            padding: "6px",
            fontSize: "0.75rem",
            zIndex: 1,
          }}
        >
          <FavoriteIcon fontSize="small" />
        </Box>
      )}

      {/* Product Image */}
      <Box width={"100%"} height={"65%"}>
        <Link to={`/product/${product._id}`}>
          <CardMedia
            component="img"
            width={"100%"}
            height={"100%"}
            image={product.imageCover}
            alt={product.name}
            sx={{
              objectFit: "cover",
              borderRadius: "12px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Link>
      </Box>

      {/* Product Name */}
      <Typography fontWeight={600} variant="body1" align="left" noWrap sx={{ marginTop: 1, fontSize: "1rem", color: "#333" }}>
        {product.name}
      </Typography>

      {/* Product Price */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" fontWeight={600} sx={{ fontSize: "1rem", color: "#333" }}>
          {product.priceAfterDiscount ? product.priceAfterDiscount : product.price} <span>(EGP)</span>
        </Typography>
        {product.priceAfterDiscount && (
          <Typography variant="body2" sx={{ color: "#f15", textDecoration: "line-through", fontSize: "0.9rem" }}>
            {product.price} EGP
          </Typography>
        )}
      </Box>

      {/* Rating and Reviews */}
      <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"} sx={{ marginTop: 0.5, fontSize: "0.75rem" }}>
        <StarOutlinedIcon sx={{ color: "#fbc500", fontSize: "1rem" }} />
        <Typography variant="body2" fontWeight={"600"} sx={{ fontSize: "1rem", color: "#333" }}>
          {product.ratingsAverage}
        </Typography>
        <Typography color="#9d9d9d" sx={{ fontSize: "0.75rem", marginLeft: 0.5 }}>
          ({product.numberOfRating} Reviews)
        </Typography>
      </Box>

      {/* Buttons */}
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ marginTop: 1 }}>
        <Button
          onClick={handleWishlistClick}
          disabled={isLoading}
          sx={{
            fontSize: "0.75rem",
            fontWeight: "600",
            backgroundColor: isInWishlist ? "#f50057" : "#151515",
            color: "#fff",
            borderRadius: "8px",
            "&:hover": {
              color: "#000",
              bgcolor: isInWishlist ? "#d50048" : "#0295db",
            },
            padding: "8px 16px",
            width: "48%",
            transition: "all 0.3s ease",
          }}
          variant="contained"
        >
          <FavoriteIcon />
          {isInWishlist ? "Remove" : " Add"}
        </Button>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none", width: "48%" }}>
          <Button
            sx={{
              fontSize: ".75rem",
              fontWeight: "600",
              backgroundColor: "#151515",
              color: "#fff",
              borderRadius: "8px",
              "&:hover": {
                color: "#000",
                bgcolor: "#0295db",
              },
              padding: "8px 16px",
              width: "100%",
              transition: "all 0.3s ease",
            }}
            variant="contained"
          >
            <ShoppingCartOutlinedIcon /> Add
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default ProductCard;