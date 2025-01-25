import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const SingleImageInput = ({ image, setImage }) => {
    // Handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle image drop
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle drag over
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Handle removing an image
    const handleImageRemove = () => {
        setImage(null);
    };

    return (
        <Box sx={{ width: '100%', p: 3 }}>
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
                {image ? (
                    <img
                        src={image}
                        alt="Uploaded"
                        style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            marginBottom: '16px', // Adds space between image and button
                        }}
                    />
                ) : (
                    <>
                        <Typography variant="body2" color="textSecondary">
                            Drag and drop an image here or click to select
                        </Typography>

                        <Typography color="error" variant="caption">
                            Please select at least one image.
                        </Typography>
                    </>

                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="single-image-input"
                />
                <label htmlFor="single-image-input">
                    <Button variant="contained" component="span" color="primary">
                        {image ? 'Change Image' : 'Select Image'}
                    </Button>
                </label>
            </Box>
        </Box>
    );
};

export default SingleImageInput;
