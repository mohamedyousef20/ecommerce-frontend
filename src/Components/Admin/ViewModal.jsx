import React from 'react';
import { Box, Modal, Typography, CircularProgress } from '@mui/material';

const ViewModal = ({
    open,
    onClose,
    title = 'Details',
    content,
    loading = false,
    width = 400,
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="reusable-modal-title"
            aria-describedby="reusable-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width,
                    bgcolor: 'background.paper',
                    boxShadow: 18,
                    p: 4,
                    outline: 'none',
                    borderRadius: 2,
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {title && (
                            <Typography
                                id="reusable-modal-title"
                                variant="h6"
                                gutterBottom
                                sx={{ textAlign: 'center', fontWeight: 'bold' }}
                            >
                                {title}
                            </Typography>
                        )}
                        <Box id="reusable-modal-description">{content}</Box>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default ViewModal;
