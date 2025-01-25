import React from 'react'
import { useDispatch } from 'react-redux/lib/exports';
import { deleteBrand } from '../../../redux/action/brandAction';
import { useState } from 'react';

const AdminDeleteBrandHook = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const handleCancelDelete = () => setIsModalOpen(false);


    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        await dispatch(deleteBrand(itemId))
        window.location.reload(true);
    };


    return [
        open,
        setOpen,
        itemId,
        setItemId,
        isModalOpen,
        setIsModalOpen,
        handleConfirmDelete,
        handleCancelDelete,
    ]
}

export default AdminDeleteBrandHook
