import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { useParams } from 'react-router-dom';
import { editBrand, getOneBrand } from '../../../redux/action/brandAction';
import Notification from '../../../customHooks/useNotification';
import LoadingProgress from '../../../Components/LoadingProgress';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import SingleImageInput from '../../../Components/Admin/AdminAllProduct/SingleImageInput';

const AdminEditBrand = () => {
    const [brandImage, setBrandImage] = useState("");
    const [brandName, setBrandName] = useState('');
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOneBrand(id));
    }, [dispatch, id]);

    const brand = useSelector((state) => state.brandReducer.getOneBrand);
    useEffect(() => {
        if (brand) {
            setBrandName(brand.name || '');
            setBrandImage(brand.image || '');
        }
    }, [brand]);

    const handleNameChange = (e) => setBrandName(e.target.value);


    const dataURLtoFile = (dataurl, filename = 'image.jpg') => {
        try {
            if (!dataurl) throw new Error('Invalid Data URL');

            const [header, base64] = dataurl.split(',');
            if (!header || !base64) throw new Error('Malformed Data URL');

            const mimeMatch = header.match(/:(.*?);/);
            if (!mimeMatch) throw new Error('MIME type not found in Data URL');
            const mimeType = mimeMatch[1];

            const binaryStr = atob(base64);
            const len = binaryStr.length;
            const uint8Array = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                uint8Array[i] = binaryStr.charCodeAt(i);
            }

            return new File([uint8Array], filename, { type: mimeType });
        } catch (error) {
            console.error('Error converting Data URL to File:', error.message);
            return null; // Return null if there's an error
        }
    };



    const handleSubmit = async () => {


        const formData = new FormData();
        if (brandName) formData.append('name', brandName);

        if (brandImage) {
            const imageFile = dataURLtoFile(brandImage, 'brandImage.jpeg');
            if (imageFile) {
                formData.append('image', imageFile);
            } else {
                console.error('Failed to convert Data URL to File.');
            }
        } else {
            console.warn('No image selected.');
        }
        setLoading(true);
        try {
            await dispatch(editBrand(id, formData));

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error updating brand:', error);
            Notification('Failed to update brand!');
        }
    };

    return (
        <>
            <LoadingProgress loading={loading} />


            <AdminSideBar />

            <Box flex={2}>

                <Box>
                    <Typography fontSize={'1.5rem'} fontWeight={600} color='red'>
                        Edit Brand
                    </Typography>
                </Box>

                <SingleImageInput
                    image={brandImage}
                    setImage={setBrandImage} />



                <Stack direction={'row'} justifyContent={'space-around'}
                    alignItems={'flex-start'}>

                    <Box>
                        {/* category Name Input Field */}
                        <TextField
                            fullWidth
                            label="Enter Brand Name"
                            variant="outlined"
                            value={brandName}
                            onChange={handleNameChange}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': {
                                    borderRadius: 2,
                                    backgroundColor: '#fafafa',
                                },
                            }}
                        />

                        <Button
                            variant="contained"
                            onClick={handleSubmit}

                            sx={{
                                px: 2,
                                py: 1.5,
                                mt: 2,
                                backgroundColor: "#0295db",
                                fontWeight: '600',

                                // boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                                color: "#151515",
                                borderRadius: "1px",
                                "&:hover": {
                                    color: '#fff',
                                    bgcolor: "#151515",
                                    boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                                }
                            }
                            } >
                            Edit Brand


                        </Button>
                    </Box>
                </Stack>
            </Box>
        </>

    )
}

export default AdminEditBrand
