import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, TextField, Button, Modal, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, Stack } from '@mui/material';
import { Edit, ShoppingCart, Favorite, ListAlt } from '@mui/icons-material';

import ProfileHook from '../../customHooks/Auth/ProfileHook';
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


    ] = ProfileHook()


    return (
        <Box sx={{ display: 'flex' }}>
            {/* Profile Content Area */}
            <Stack sx={{ flexGrow: 1, padding: 3 }} direction={'column'} alignItems={'center'}>
                <Typography variant="h4" gutterBottom>Profile</Typography>

                <Box display="flex" alignItems="center" marginBottom={2} flexDirection={'column'}>
                    <Box display="flex" alignItems="center" marginBottom={1}>
                        <Avatar alt="Profile Picture" src={profile.image} sx={{ width: 100, height: 100, marginRight: 2 }} />
                        <Box>
                            <Edit sx={{ cursor: 'pointer', fontSize: 18, color: '#bdbdbd70' }} onClick={handleOpenUpdateImageModal} />
                        </Box>
                    </Box>
                    <Box marginTop={2}>
                        <Typography variant="body2" sx={{ color: profile.isActive ? 'green' : 'red' }}>
                            {profile.isActive ? 'Active' : 'Inactive'}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" marginBottom={1}>
                        <Typography variant="h6" sx={{ marginRight: 2 }}>{profile.name}</Typography>
                        <Box>
                            <Edit sx={{ cursor: 'pointer', fontSize: 18, color: '#bdbdbd70' }} onClick={handleOpenUpdateNameModal} />
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Typography variant="body2" sx={{ marginRight: 2 }}>{profile.email}</Typography>
                        <Box>
                            <Edit sx={{ cursor: 'pointer', fontSize: 18, color: '#bdbdbd70' }} onClick={handleOpenUpdateEmailModal} />
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center" marginBottom={1}>
                        <Typography variant="h6" sx={{ marginRight: 2 }}>{profile.address}</Typography>
                        <Box>
                            <Edit sx={{ cursor: 'pointer', fontSize: 18, color: '#bdbdbd70' }} onClick={handleOpenUpdateNameModal} />
                        </Box>
                    </Box>

                </Box>

                {/* Modals */}
                {/* Update Name Modal */}
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
                        width: 300
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
                            <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Update Email Modal */}
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
                        width: 300
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
                            <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
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
                        width: 300
                    }}>
                        <Typography variant="h6" gutterBottom>Update Profile Image</Typography>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            style={{ marginBottom: 10 }}
                        />

                        {/* Only show image preview after the user selects an image */}
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
                            <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Modal>


                {/* Deactivate Account Dialog */}
                <Dialog open={isDeactivateDialogOpen} onClose={handleCloseDeactivateDialog}>
                    <DialogTitle>Deactivate Account</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Are you sure you want to deactivate your account? This action is irreversible.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeactivateDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeactivateAccount} color="secondary">
                            Deactivate
                        </Button>
                    </DialogActions>
                </Dialog>



                {/* Change Password Dialog */}
                <Dialog open={isChangePasswordModalOpen} onClose={handleCloseChangePasswordModal}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Old Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />

                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />

                        <TextField
                            label="Confirm New Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={handleCloseChangePasswordModal} color="primary">Cancel</Button>
                        <Button onClick={handleChangePassword} color="secondary">Change Password</Button>
                    </DialogActions>
                </Dialog>

                <Stack direction={'row'} gap={2} >

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
                        sx={{ marginTop: 3 }}
                        variant="contained" color="secondary"
                        onClick={handleOpenChangePasswordModal}>
                        Change Password
                    </Button>

                    {/* Delete Account Button */}
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ marginTop: 3 }}
                        onClick={handleOpenDeleteAccountModal}
                    >
                        Delete My Account
                    </Button>
                    {/* Delete Account Modal */}
                    <Dialog open={isDeleteAccountModalOpen} onClose={handleCloseDeleteAccountModal}>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">
                                Are you sure you want to delete your account? This action is irreversible.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteAccountModal} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteMyAccount} color="error">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Stack>

            </Stack>
        </Box>
    );
};

export default ProfilePage;
