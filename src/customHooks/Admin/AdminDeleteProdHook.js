import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux/lib/exports";
import { deleteProduct } from '../../redux/action/productAction';
import Notification from '../useNotification';

const AdminDeleteProdHook = () => {

    const dispatch = useDispatch();
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);




    const handleCancelDelete = () => setIsModalOpen(false);
    
    const handleOpenModal = (id) => {
        setProductIdToDelete(id);
        setIsModalOpen(true)
        

    }


    const handleConfirmDelete = async () => {

        setLoading(true)
        await dispatch(deleteProduct(productIdToDelete));
        setLoading(false)
        // hide modal
        setIsModalOpen(false);
        // send Notification

        // to refresh the page
        window.location.reload();
    };

  

    return [
        productIdToDelete,
        setProductIdToDelete,
        isModalOpen,
        setIsModalOpen,
        handleConfirmDelete,
        handleOpenModal,
        handleCancelDelete
    ]
}

export default AdminDeleteProdHook
