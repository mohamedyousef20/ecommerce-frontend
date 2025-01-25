import React, { useState } from 'react'
import { useDispatch } from 'react-redux/lib/exports';
import { deleteCoupon } from '../../redux/action/couponAction';

const AdminDeleteCouponHook = () => {

    const dispatch = useDispatch();

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [itemId, setItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        await dispatch(deleteCoupon(itemId));
        window.location.reload(true);
    };

    return [
        selectedProducts,
        setSelectedProducts,
        itemId,
        setItemId,
        isModalOpen,
        setIsModalOpen,
        handleCancelDelete,
        handleConfirmDelete
    ]
}

export default AdminDeleteCouponHook
