import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, TextField, Button, Modal, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { Edit } from '@mui/icons-material';

import ProfileHook from '../../customHooks/Auth/ProfileHook';
import LoadingProgress from '../../Components/LoadingProgress';
import Footer from '../../Components/Utils/Footer';

const ProfilePage = () => {
    const [
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
    ] = ProfileHook();

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <LoadingProgress loading={loading} />
                {/* Profile Content Area */}
                <Stack sx={{ flexGrow: 1, padding: 3 }} direction="column" alignItems="center">
                    <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>Profile</Typography>

                    <Box display="flex" alignItems="center" marginBottom={2} flexDirection="column">
                        <Box display="flex" alignItems="center" marginBottom={1}>
                            <Avatar alt="Profile Picture" src={profile.image} sx={{ width: 100, height: 100, marginRight: 2 }} onClick={handleOpenUpdateImageModal} />
                       
                        </Box>
                        <Box marginTop={2}>
                            <Typography variant="body2" sx={{ color: profile.isActive ? 'green' : 'red' }}>
                                {profile.isActive ? 'Active' : 'Inactive'}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" marginBottom={1}>
                            <Typography variant="h6" sx={{ marginRight: 2, fontSize: { xs: '1rem', md: '1.5rem' } }}>{profile.name}</Typography>
                            <Box>
                                <Edit sx={{ cursor: 'pointer', fontSize: 18, color: '#bdbdbd70' }} onClick={handleOpenUpdateNameModal} />
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <Typography variant="body2" sx={{ marginRight: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>{profile.email}</Typography>
                            <Box>
                                <Edit sx={{ cursor: 'pointer', fontSize: 18, color: '#bdbdbd70' }} onClick={handleOpenUpdateEmailModal} />
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" marginBottom={1}>
                            <Typography variant="h6" sx={{ marginRight: 2, fontSize: { xs: '1rem', md: '1.5rem' } }}>{profile.address}</Typography>
                            <Box>
                                <Edit sx={{ cursor: 'pointer', fontSize: 18, color: '#bdbdbd70' }} onClick={handleOpenUpdateNameModal} />
                            </Box>
                        </Box>
                    </Box>

                    {/* Modals for updates */}
                    <Modal open={isUpdateNameModalOpen} onClose={handleCloseUpdateNameModal}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            padding: 3,
                            borderRadius: 1,
                            boxShadow: 24,
                            width: 300,
                            maxWidth: '80%'
                        }}>
                            <Typography variant="h6" gutterBottom>Update Name</Typography>
                            <TextField
                                label="Name"
                                fullWidth
                                variant="outlined"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                            <Box display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ bgcolor: '#1976D2' }}>
                                    Update
                                </Button>
                            </Box>
                        </Box>
                    </Modal>

                    {/* Modal for email */}
                    <Modal open={isUpdateEmailModalOpen} onClose={handleCloseUpdateEmailModal}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            padding: 3,
                            borderRadius: 1,
                            boxShadow: 24,
                            width: 300,
                            maxWidth: '80%'
                        }}>
                            <Typography variant="h6" gutterBottom>Update Email</Typography>
                            <TextField
                                label="Email"
                                fullWidth
                                variant="outlined"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                                sx={{ marginBottom: 2 }}
                            />
                            <Box display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ bgcolor: '#1976D2' }}>
                                    Update Email
                                </Button>
                            </Box>
                        </Box>
                    </Modal>

                    {/* Update Image Modal */}
                    <Modal open={isUpdateImageModalOpen} onClose={handleCloseUpdateImageModal}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            padding: 3,
                            borderRadius: 1,
                            boxShadow: 24,
                            width: 300,
                            maxWidth: '80%'
                        }}>
                            <Typography variant="h6" gutterBottom>Update Profile Image</Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                                style={{ marginBottom: 10 }}
                            />
                            {newProfileImage && (
                                <Box>
                                    <Typography variant="body2">Selected Image:</Typography>
                                    <img
                                        src={newProfileImage}
                                        alt="Selected Profile"
                                        style={{
                                            width: 50,
                                            height: 50,
                                            objectFit: 'cover',
                                            marginTop: 10,
                                        }}
                                    />
                                </Box>
                            )}
                            <Box display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ bgcolor: '#1976D2' }}>
                                    Update
                                </Button>
                            </Box>
                        </Box>
                    </Modal>

                    <Stack direction={'row'} gap={2} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center">
                        {/* Deactivate Account Button */}
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginTop: 3 }}
                            onClick={handleOpenDeactivateDialog}
                        >
                            Deactivate Account
                        </Button>

                        {/* Button to Change Password */}
                        <Button
                            sx={{ marginTop: 3, bgcolor: '#FF5722' }}
                            variant="contained"
                            color="secondary"
                            onClick={handleOpenChangePasswordModal}
                        >
                            Change Password
                        </Button>

                        {/* Delete Account Button */}
                        <Button
                            variant="contained"
                            sx={{ marginTop: 3, bgcolor: '#1976D2' }}
                            onClick={handleOpenDeleteAccountModal}
                        >
                            Delete My Account
                        </Button>
                    </Stack>
                </Stack>
            </Box>
            <Footer />
        </>
    );
};

export default ProfilePage;
