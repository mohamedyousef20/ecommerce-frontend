import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { getUserCart } from '../../redux/action/cartAction';
import GetUserCartHook from '../../customHooks/Cart/get-user-cart-hook';
import { useDispatch } from 'react-redux/lib/exports';
import { useParams } from 'react-router-dom';
import Address from '../../Components/Payment/Address';
import { createOrderCash } from '../../redux/action/paymentAction';
import Notification from '../../customHooks/useNotification';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log('d',id)
    const [
        itemsNum,
        cartId,
        isModalOpen,
        setIsModalOpen,
        itemId,
        setItemId,
        loading,
        setLoading,
        quantities,
        setQuantities,
        response,
        handleQuantityChange,
        handleUpdateQuantity,
        handleCancelDelete,
        handleConfirmDelete

    ] = GetUserCartHook();

    const [formData, setFormData] = useState({
        city: '',
        state: '',
        street: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [visaDetails, setVisaDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleConfirmOrder = () => {
        if (!formData.street || !formData.city || !formData.state) {
            Notification('Please complete the address form.', 'warn')
        };
        if (paymentMethod === 'visa') {
            if (!visaDetails.cardNumber || !visaDetails.expiryDate || !visaDetails.cvv) {
                alert('Please fill out all Visa details.');
                return;
            }
        }

        setLoading(true)
        dispatch(createOrderCash(cartId, {
            shippingAddress: formData,

        }))
        // alert(`Order confirmed with ${paymentMethod} payment!`);
    };






    //

    return (

        <Box
            sx={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
                Payment Page
            </Typography>

            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Cart Details
            </Typography>
            <List>
                {response.data && response.data.cartItem ? response.data.cartItem.map((item) => (
                    <React.Fragment key={item.product._id}>
                        <ListItem>
                            <ListItemText
                                primary={item.product.name}
                                secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}
                            />
                        </ListItem>
                        <Divider />

                    </React.Fragment>

                )) : <CircularProgress />}
            </List>

            <Typography variant="h6" sx={{ mt: 3 }}>
                Total Price:{response.data && response.data.totalPrice
                    ? response.data.totalPrice : null}
            </Typography>

            <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ mb: 3 }}
            >
                <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash Payment"
                />
                <FormControlLabel
                    value="visa"
                    control={<Radio />}
                    label="Payment with Visa"
                />
            </RadioGroup>
            <Address formData={formData} setFormData={setFormData} />
            <Button
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: '#ff5722',
                    color: '#fff',
                    mt: 3,
                    '&:hover': { backgroundColor: '#e64a19' },
                }}
                onClick={handleConfirmOrder}
            >
                Confirm Order
            </Button>
        </Box>
    );
};

export default PaymentPage;
