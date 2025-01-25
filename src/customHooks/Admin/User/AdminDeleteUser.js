import React, { useState } from 'react';
import { useDispatch } from "react-redux/lib/exports";
import { deleteUser } from '../../../redux/action/userAction';
import Notification from '../../useNotification';

const AdminDeleteUserHook = () => {

    const dispatch = useDispatch();
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);




    const handleCancelDelete = () => setIsModalOpen(false);

    const handleOpenModal = (id) => {
        setUserIdToDelete(id);
        setIsModalOpen(true)


    }


    const handleConfirmDelete = async () => {

        await dispatch(deleteUser(userIdToDelete))
        // hide modal
        setIsModalOpen(false);
        // send Notification
        Notification('User deleted successfully', 'success')

        // to refresh the page
        window.location.reload();
    };

    return [
        userIdToDelete,
        setUserIdToDelete,
        isModalOpen,
        setIsModalOpen,
        handleConfirmDelete,
        handleOpenModal,
        handleCancelDelete
    ]
}

export default AdminDeleteUserHook
