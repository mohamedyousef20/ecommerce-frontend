import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from '@mui/material';

const WarningModal = ({ isOpen, onConfirm, onCancel, message }) => {
    return (
    
        <Dialog open={isOpen} onClose={onCancel}>
            <DialogTitle color='#f15d'>Warning</DialogTitle>
            <DialogContent>
                <p>{message}</p>
            </DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
                <Button
                    onClick={onConfirm}
                    sx={{
                        fontWeight: 600,
                        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                        '&:hover': {
                            backgroundColor: '#ff0000',
                            color: '#fff',
                        },
                    }}
                >
                    Confirm
                </Button>
                <Button
                    onClick={onCancel}
                    sx={{
                        fontWeight: 600,
                        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                        color: '#',
                        '&:hover': {
                            backgroundColor: 'green',
                            color: '#fff',

                        },
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Dialog>
    );
};

WarningModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export default WarningModal;
