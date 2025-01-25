import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getAllProductInWishList } from '../../redux/action/wishlistAction';

const GetAllWishListProduct = () => {
    const dispatch = useDispatch();
    const prodInWishlist = useSelector((state) => state.wishListReducer.allProductInWishList);
    const [isLoading, setIsLoading] = useState(true);
    // Fetch wishlist products on component mount
    useEffect(() => {
        dispatch(getAllProductInWishList()).then(() => setIsLoading(false));

    },[dispatch]);

    return [prodInWishlist, isLoading, setIsLoading]
}
 
export default GetAllWishListProduct
