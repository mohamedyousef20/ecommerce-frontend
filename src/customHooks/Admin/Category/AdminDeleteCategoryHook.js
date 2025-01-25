import React, { useState } from 'react'
import { useDispatch } from 'react-redux/lib/exports';
import { deleteCategory } from '../../../redux/action/categoryAction';

const AdminDeleteCategoryHook = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    // Modal Handlers
    const handleOpenModal = (id) => {
        setCategoryIdToDelete(id);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setCategoryIdToDelete(null);
    };


    const handleDelete = async () => {


        await dispatch(deleteCategory(categoryIdToDelete))

        handleCloseModal();

        window.location.reload(true)
    };
    return [
        open,
        setOpen,
        categoryIdToDelete,
        setCategoryIdToDelete,
        handleOpenModal,
        handleCloseModal,
        handleDelete
    ]
}

export default AdminDeleteCategoryHook
