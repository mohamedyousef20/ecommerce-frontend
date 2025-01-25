import React from 'react'
import { deleteAnnouncement } from '../../../redux/action/announcementAction';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/lib/exports';

const DeleteAnnouncementHook = () => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemId, setItemId] = useState(null);


    const handleCancelDelete = () => setIsModalOpen(false);


    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        await dispatch(deleteAnnouncement(itemId));
        window.location.reload(true);
    };

    return [
        isModalOpen,
        setIsModalOpen,
        itemId,
        setItemId,
        handleCancelDelete,
        handleConfirmDelete
    ];
}

export default DeleteAnnouncementHook
