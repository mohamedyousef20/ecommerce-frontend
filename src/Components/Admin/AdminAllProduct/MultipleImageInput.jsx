import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Notification from '../../../customHooks/useNotification';

const MultipleImageInput = ({ images, setImages, max }) => {

    
    // Updated handleImageChange function
    const handleImageChange = (event) => {
        const newImages = Array.isArray(images) ? [...images] : [];
        // Ensure images is an array
        const selectedFiles = Array.from(event.target.files);

        if (newImages.length + selectedFiles.length <= max) {
            selectedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result);
                    setImages(newImages);
                };
                reader.readAsDataURL(file);
            });
        } else {
            Notification(`You can only upload up to ${max} images.`);
        }
    };

    // Updated handleDrop function
    const handleDrop = (event) => {
        event.preventDefault();
        const newImages = Array.isArray(images) ? [...images] : []; // Ensure images is an array
        const droppedFiles = Array.from(event.dataTransfer.files);

        if (newImages.length + droppedFiles.length <= max) {
            droppedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result);
                    setImages(newImages);
                };
                reader.readAsDataURL(file);
            });
        } else {
            Notification(`You can only upload up to ${max} images.`);
        }
    };



    // Handle removing an image
    const handleImageRemove = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };


    // Handle drag over (to allow drop)
    const handleDragOver = (event) => {
        event.preventDefault();

    };

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Upload Product Images (Max {max} images)
            </Typography>

            {/* Drag-and-Drop Area */}
            <Box
                sx={{
                    width: '100%',
                    p: 3,
                    border: '2px dashed #1976d2',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fafafa',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    mb: 3,
                    '&:hover': {
                        backgroundColor: '#e3f2fd',
                    },
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <Typography variant="body2" color="textSecondary">
                    Drag and drop images here or click to select
                </Typography>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="image-input"
                />
                <label htmlFor="image-input">
                    <Button variant="contained" component="span" color="primary">
                        Select Images
                    </Button>
                </label>
            </Box>

            {/* Image Previews */}
            {images.length === 0 && (
                <Typography color="error" variant="caption">
                    Please select at least one image.
                </Typography>
            )}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    flex: 2, overflowX: 'auto', whiteSpace: 'nowrap'
                }}
            >
                {images && Object.keys(images).length !== 0 ? images.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            width: 80,
                            height: 80,
                            borderRadius: 1,
                            overflow: 'hidden',
                            border: '1px solid #1976d2',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                opacity: 0.8,
                                scale: 1.1,
                            },
                        }}
                    >
                        <img
                            src={image}
                            alt={`Image ${index}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <IconButton
                            onClick={() => handleImageRemove(index)}
                            sx={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: '50%',
                                p: 0.5,
                                color: '#d32f2f',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                },
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )) : null}
            </Box>
        </Box>
    );
};

export default MultipleImageInput;
