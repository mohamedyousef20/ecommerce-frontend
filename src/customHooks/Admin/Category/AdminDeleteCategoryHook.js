import React, { useState } from 'react'
import { useDispatch } from 'react-redux/lib/exports';
import { deleteCategory } from '../../../redux/action/categoryAction';

const AdminDeleteCategoryHook = () => {

    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    // Modal Handlers
    const handleOpenModal = (id) => {
        setCategoryIdToDelete(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCategoryIdToDelete(null);
    };


    const handleConfirmDelete = async () => {


        await dispatch(deleteCategory(categoryIdToDelete))

        handleCloseModal();

        window.location.reload(true)
    };
    return [
        isModalOpen,
        setIsModalOpen,
        categoryIdToDelete,
        setCategoryIdToDelete,
        handleOpenModal,
        handleCloseModal,
        handleConfirmDelete
    ]
}

export default AdminDeleteCategoryHook
