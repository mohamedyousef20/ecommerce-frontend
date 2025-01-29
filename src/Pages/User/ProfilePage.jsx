import React, { useEffect, useState } from 'react';
import {
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Modal,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import ProfileHook from '../../customHooks/Auth/ProfileHook';
import Footer from '../../Components/Utils/Footer';

// Color constants
const PRIMARY_COLOR = '#1976D2';
const SECONDARY_COLOR = '#FF5722';
const NEUTRAL_COLOR = '#F5F5F5';

const ProfilePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
        width: { xs: '90%', sm: '400px' },
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 2,
    };

    return (
        <>
            <Box sx={{
                backgroundColor: NEUTRAL_COLOR,
                minHeight: '100vh',
                p: { xs: 2, md: 4 }
            }}>
                <Box sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    p: { xs: 2, md: 4 },
                    maxWidth: '1200px',
                    margin: '0 auto',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    {/* Profile Header */}
                    <Typography variant="h4" sx={{
                        color: PRIMARY_COLOR,
                        textAlign: 'center',
                        mb: 4,
                        fontSize: { xs: '1.5rem', md: '2rem' }
                    }}>
                        Profile
                    </Typography>

                    {/* Profile Content */}
                    <Stack spacing={3} alignItems="center">
                        {/* Avatar Section */}
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={profile.image}
                                sx={{
                                    width: { xs: 100, md: 120 },
                                    height: { xs: 100, md: 120 },
                                    border: `3px solid ${PRIMARY_COLOR}`
                                }}
                            />
                            <IconButton
                                onClick={handleOpenUpdateImageModal}
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: PRIMARY_COLOR,
                                    '&:hover': { backgroundColor: 'primary.dark' },
                                    p: 1
                                }}
                            >
                                <Edit sx={{ color: 'white', fontSize: '1.2rem' }} />
                            </IconButton>
                        </Box>

                        {/* Status Badge */}
                        <Typography sx={{
                            color: profile.isActive ? 'success.main' : 'error.main',
                            bgcolor: profile.isActive ? '#e8f5e9' : '#ffebee',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.875rem'
                        }}>
                            {profile.isActive ? 'Active' : 'Inactive'}
                        </Typography>

                        {/* Profile Details */}
                        <Stack spacing={2} sx={{ width: '100%', maxWidth: 500 }}>
                            {/* Name */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1
                            }}>
                                <Typography variant="h6">{profile.name}</Typography>
                                <IconButton onClick={handleOpenUpdateNameModal} size="small">
                                    <Edit sx={{ fontSize: '1rem', color: PRIMARY_COLOR }} />
                                </IconButton>
                            </Box>

                            {/* Email */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1
                            }}>
                                <Typography>{profile.email}</Typography>
                                <IconButton onClick={handleOpenUpdateEmailModal} size="small">
                                    <Edit sx={{ fontSize: '1rem', color: PRIMARY_COLOR }} />
                                </IconButton>
                            </Box>

                            {/* Phone */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1
                            }}>
                                <Typography>{profile.phon}</Typography>
                                <IconButton onClick={handleOpenUpdateNameModal} size="small">
                                    <Edit sx={{ fontSize: '1rem', color: PRIMARY_COLOR }} />
                                </IconButton>
                            </Box>
                        </Stack>

                        {/* Action Buttons */}
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            sx={{
                                width: '100%',
                                maxWidth: 600,
                                mt: 4
                            }}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    bgcolor: PRIMARY_COLOR,
                                    '&:hover': { bgcolor: 'primary.dark' }
                                }}
                                onClick={handleOpenChangePasswordModal}
                            >
                                Change Password
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={handleOpenDeactivateDialog}
                            >
                                Deactivate Account
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    bgcolor: SECONDARY_COLOR,
                                    '&:hover': { bgcolor: 'secondary.dark' }
                                }}
                                onClick={handleOpenDeleteAccountModal}
                            >
                                Delete Account
                            </Button>
                        </Stack>
                    </Stack>

                    {/* Update Name Modal */}
                    <Modal open={isUpdateNameModalOpen} onClose={handleCloseUpdateNameModal}>
                        <Box sx={modalStyle}>
                            <Typography variant="h6" sx={{ mb: 2, color: PRIMARY_COLOR }}>
                                Update Name
                            </Typography>
                            <TextField
                                fullWidth
                                label="Name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ bgcolor: PRIMARY_COLOR }}
                                onClick={handleUpdateProfile}
                            >
                                Update
                            </Button>
                        </Box>
                    </Modal>

                    {/* Update Email Modal */}
                    <Modal open={isUpdateEmailModalOpen} onClose={handleCloseUpdateEmailModal}>
                        <Box sx={modalStyle}>
                            <Typography variant="h6" sx={{ mb: 2, color: PRIMARY_COLOR }}>
                                Update Email
                            </Typography>
                            <TextField
                                fullWidth
                                label="Email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ bgcolor: PRIMARY_COLOR }}
                                onClick={handleUpdateProfile}
                            >
                                Update Email
                            </Button>
                        </Box>
                    </Modal>

                    {/* Update Image Modal */}
                    <Modal open={isUpdateImageModalOpen} onClose={handleCloseUpdateImageModal}>
                        <Box sx={modalStyle}>
                            <Typography variant="h6" sx={{ mb: 2, color: PRIMARY_COLOR }}>
                                Update Profile Image
                            </Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                                style={{ marginBottom: '1rem' }}
                            />
                            {newProfileImage && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        Selected Image:
                                    </Typography>
                                    <img
                                        src={newProfileImage}
                                        alt="Selected Profile"
                                        style={{
                                            width: isMobile ? '100px' : '150px',
                                            height: isMobile ? '100px' : '150px',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </Box>
                            )}
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ bgcolor: PRIMARY_COLOR, mt: 2 }}
                                onClick={handleUpdateProfile}
                            >
                                Update
                            </Button>
                        </Box>
                    </Modal>

                    {/* Change Password Dialog */}
                    <Dialog
                        open={isChangePasswordModalOpen}
                        onClose={handleCloseChangePasswordModal}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle sx={{ color: PRIMARY_COLOR }}>
                            Change Password
                        </DialogTitle>
                        <DialogContent>
                            <Stack spacing={2} sx={{ mt: 2 }}>
                                <TextField
                                    label="Old Password"
                                    type="password"
                                    fullWidth
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <TextField
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <TextField
                                    label="Confirm New Password"
                                    type="password"
                                    fullWidth
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ p: 3 }}>
                            <Button onClick={handleCloseChangePasswordModal}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: PRIMARY_COLOR }}
                                onClick={handleChangePassword}
                            >
                                Change Password
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Deactivate Account Dialog */}
                    <Dialog
                        open={isDeactivateDialogOpen}
                        onClose={handleCloseDeactivateDialog}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle sx={{ color: 'error.main' }}>
                            Deactivate Account
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">
                                Are you sure you want to deactivate your account? This action is irreversible.
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{ p: 3 }}>
                            <Button onClick={handleCloseDeactivateDialog}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDeactivateAccount}
                            >
                                Deactivate
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Delete Account Dialog */}
                    <Dialog
                        open={isDeleteAccountModalOpen}
                        onClose={handleCloseDeleteAccountModal}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle sx={{ color: 'error.main' }}>
                            Delete Account
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">
                                Are you sure you want to delete your account? This action is irreversible.
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{ p: 3 }}>
                            <Button onClick={handleCloseDeleteAccountModal}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDeleteMyAccount}
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>
                <Footer />

            </Box>
            <Footer />
        </>
    );
};

export default ProfilePage;