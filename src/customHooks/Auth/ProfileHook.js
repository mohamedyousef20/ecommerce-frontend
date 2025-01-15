import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import Notification from '../../customHooks/useNotification';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
    changeLoggedUserPassword,
    deactivateMyAccount,
    deleteMyAccount,
    getLoggedUser,
    updateUserProfile
} from '../../redux/action/userAction';

const ProfileHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // Profile data
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        image: '', // Profile image URL
        isActive: true, // Profile image URL
    });

    const [isUpdateNameModalOpen, setIsUpdateNameModalOpen] = useState(false);
    const [isUpdateEmailModalOpen, setIsUpdateEmailModalOpen] = useState(false);
    const [isUpdateImageModalOpen, setIsUpdateImageModalOpen] = useState(false);
    const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false); // New state for the deactivation dialog

    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [emailError, setEmailError] = useState('');
    // For password change
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [loading, setLoading] = useState(true);
    const handleOpenChangePasswordModal = () => setIsChangePasswordModalOpen(true);
    const handleCloseChangePasswordModal = () => setIsChangePasswordModalOpen(false);
    // State for modal control
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

    const handleOpenDeleteAccountModal = () => setIsDeleteAccountModalOpen(true);
    const handleCloseDeleteAccountModal = () => setIsDeleteAccountModalOpen(false);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            await dispatch(getLoggedUser());
            setLoading(false)
        }
        getUser();
    }, [])

    const user = useSelector((state) => state.userReducer.loggedUser)

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name,
                email: user.email,
                image: user.profileImage,
                isActive: user.active,
            })
        }
        setLoading(true)
    }, [loading]);

    const handleOpenUpdateNameModal = () => setIsUpdateNameModalOpen(true);
    const handleCloseUpdateNameModal = () => setIsUpdateNameModalOpen(false);

    const handleOpenUpdateEmailModal = () => setIsUpdateEmailModalOpen(true);
    const handleCloseUpdateEmailModal = () => setIsUpdateEmailModalOpen(false);

    const handleOpenUpdateImageModal = () => setIsUpdateImageModalOpen(true);
    const handleCloseUpdateImageModal = () => setIsUpdateImageModalOpen(false);

    const handleOpenDeactivateDialog = () => setIsDeactivateDialogOpen(true); // Open Deactivate Dialog
    const handleCloseDeactivateDialog = () => setIsDeactivateDialogOpen(false); // Close Deactivate Dialog

    const handleProfileImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setNewProfileImage(URL.createObjectURL(event.target.files[0]))
            setSelectedFile(event.target.files[0])
        }
    }
    const handleUpdateProfile = async () => {
        const formData = new FormData();

        // Only append fields that are being changed
        if (newName && newName !== profile.name) {
            formData.append('name', newName);
        }

        if (newEmail && newEmail !== profile.email) {
            formData.append('email', newEmail);
        }

        if (newProfileImage) {
            formData.append('profileImage', selectedFile); // Append the new image file
        }

        // Dispatch the action to update the user profile
        await dispatch(updateUserProfile(formData));

        // Preserve the existing profile fields that were not changed
        setProfile((prevProfile) => ({
            ...prevProfile,
            ...(newName ? { name: newName } : {}),
            ...(newEmail ? { email: newEmail } : {}),
            ...(newProfileImage ? { image: newProfileImage } : {})
        }));

        // Close modals after update
        handleCloseUpdateNameModal();
        handleCloseUpdateEmailModal();
        handleCloseUpdateImageModal();
    };

    // Handle email validation
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };


    // Deactivate Account handler
    const handleDeactivateAccount = async () => {
        await dispatch(deactivateMyAccount()); //  action in your redux actions
        handleCloseDeactivateDialog();
        Notification('Your account has been deactivated.', 'info');
        // dispatch(logoutUser()); // Logout the user by clearing the session (Redux or localStorage)
        // history.push('/login'); // Redirect the user to the login page after logout

        // You can handle the redirection or logging out after deactivation here
    };

    // Deactivate Account handler
    const handleDeleteMyAccount = async () => {
        await dispatch(deleteMyAccount()); //  action in your redux actions
        handleCloseDeactivateDialog();
        Notification('Your account has been deleted.', 'info');
        // dispatch(logoutUser()); // Logout the user by clearing the session (Redux or localStorage)
        navigate('/')


        // You can handle the redirection or logging out after deactivation here
    };


    // Handle Password Change
    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            alert("Passwords don't match!");
            return;
        }
        await dispatch(changeLoggedUserPassword({
            password: newPassword
        })); //  action in your redux actions

        Notification('Password changed successfully!', 'success')
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        handleCloseChangePasswordModal();
        navigate('/login')
    };
    return [

        profile,
        setProfile,
        isUpdateNameModalOpen,
        setIsUpdateNameModalOpen,
        isUpdateEmailModalOpen,
        setIsUpdateEmailModalOpen,
        isUpdateImageModalOpen,
        setIsUpdateImageModalOpen,
        isDeactivateDialogOpen,
        setIsDeactivateDialogOpen,
        newName,
        setNewName,
        newEmail,
        setNewEmail,
        newProfileImage,
        setNewProfileImage,
        selectedFile,
        setSelectedFile,
        emailError,
        setEmailError,
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        isChangePasswordModalOpen,
        setIsChangePasswordModalOpen,
        confirmNewPassword,
        setConfirmNewPassword,
        loading,
        setLoading,
        handleOpenChangePasswordModal,
        handleCloseChangePasswordModal,
        isDeleteAccountModalOpen,
        setIsDeleteAccountModalOpen,
        handleOpenDeleteAccountModal,
        handleCloseDeleteAccountModal,
        user,
        handleOpenUpdateNameModal,
        handleCloseUpdateNameModal,
        handleOpenUpdateEmailModal,
        handleCloseUpdateEmailModal,
        handleOpenUpdateImageModal,
        handleCloseUpdateImageModal,
        handleOpenDeactivateDialog,
        handleCloseDeactivateDialog,
        handleProfileImageChange,
        handleUpdateProfile,
        validateEmail,
        handleDeactivateAccount,
        handleDeleteMyAccount,
        handleChangePassword



    ]
}

export default ProfileHook
