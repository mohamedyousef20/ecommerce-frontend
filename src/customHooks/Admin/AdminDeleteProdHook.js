import React, { useState } from 'react';
import { useDispatch } from "react-redux/lib/exports";
import { deleteProduct } from '../../redux/action/productAction';
import Notification from '../useNotification';

const AdminDeleteProdHook = () => {

    const dispatch = useDispatch();
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [open, setOpen] = useState(false);




    const handleCloseModal = () => setOpen(false);

    const handleOpenModal = (id) => {
        setProductIdToDelete(id);
        setOpen(true)
        

    }


    const handleDelete = async () => {

        await dispatch(deleteProduct(productIdToDelete))
        // hide modal
        setOpen(false);
        // send Notification
        Notification('Product deleted successfully', 'success')

        // to refresh the page
        window.location.reload();
    };

    return [
        productIdToDelete,
        setProductIdToDelete,
        open,
        setOpen,
        handleDelete,
        handleOpenModal,
        handleCloseModal]
}

export default AdminDeleteProdHook
