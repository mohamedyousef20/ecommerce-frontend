import React, { useState } from 'react'
import { useDispatch } from 'react-redux/lib/exports';
import { deleteSubcateOnCategory } from '../../redux/action/subCategoryAction';

const AdminDeleteSubcategoryHook = () => {

    const dispatch = useDispatch();

    const [itemId, setItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        await dispatch(deleteSubcateOnCategory(itemId));
        window.location.reload(true);
    };

    return [
        itemId,
        setItemId,
        isModalOpen,
        setIsModalOpen,
        handleCancelDelete,
        handleConfirmDelete
    ]
}

export default AdminDeleteSubcategoryHook
