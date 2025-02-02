import React from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports'
import { getUserCart, removeProductFromCart, updateProductQuantity } from '../../redux/action/cartAction';
import { useEffect, useState } from 'react';
const GetUserCartHook = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [itemsNum, setItemsNum] = useState(0);
    const [cartId, setCartId] = useState(null);

    // To handle individual item quantities
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const getCart = async () => {
            setLoading(true)
            await dispatch(getUserCart());
            setLoading(false)
        };
        getCart();
    }, [dispatch]);

    const response = useSelector((state) => state.cartReducer.userCart);
useEffect(()=>{
    if (response && response.data){

        setItemsNum(response.numberOfCarts);
        setCartId(response.data._id)

}
}, [response])

    // Handle updating quantity for a specific item
    const handleQuantityChange = (e, itemId) => {
        const newQuantity = Math.max(1, parseInt(e.target.value, 10)); // Ensure quantity is at least 1
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: newQuantity,  // Update the quantity for the specific item
        }));
    };

    // Apply the updated quantity to the cart
    const handleUpdateQuantity = async (id, newQuantity) => {
        setLoading(true);
        await dispatch(updateProductQuantity(id, { quantity: newQuantity }));
        setLoading(false);
        window.location.reload(true)
    };


    // Handle cancel to cancel modal
    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    // Function to handle deleting an item from the cart
    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        await dispatch(removeProductFromCart(itemId));
        // After item is removed, re-fetch the cart
        await dispatch(getUserCart());
    };

    return [
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

    ]
}

export default GetUserCartHook
