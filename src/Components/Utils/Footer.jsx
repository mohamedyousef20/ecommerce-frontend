import React from 'react';
import { Box, Stack, Typography, IconButton, List, ListItem, ListItemText, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard'; // Visa (generic payment)
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Vodafone Cash (generic wallet)
import PayPalIcon from '@mui/icons-material/AccountBalanceWallet'; // Using wallet icon to represent PayPal (generic)

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#151515', color: '#fff', py: 5 }}>
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                    spacing={4}
                >
                    {/* Brand Section */}
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Heruko.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Your online store for the latest fashion and accessories.
                        </Typography>
                        <Box display="flex" gap={2}>
                            <IconButton sx={{ color: '#fff' }} aria-label="facebook">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#fff' }} aria-label="instagram">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#fff' }} aria-label="twitter">
                                <TwitterIcon />
                            </IconButton>
                        </Box>
                        {/*  Payment Methods Section */}
                        <Box sx={{ mt: 5, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>
                                We Accept Payments With
                            </Typography>
                            <Box display="flex" justifyContent="center" gap={4}>
                                {/* PayPal Icon (using Wallet as representative) */}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <AccountBalanceWalletIcon sx={{ fontSize: 50, color: '#fff' }} />
                                    <Typography variant="body2" sx={{ color: '#fff' }}>PayPal</Typography>
                                </Box>

                                {/* Vodafone Cash Icon (using Wallet as representative) */}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <AccountBalanceWalletIcon sx={{ fontSize: 50, color: '#fff' }} />
                                    <Typography variant="body2" sx={{ color: '#fff' }}>Vodafone Cash</Typography>
                                </Box>

                                {/* Visa Icon (using CreditCard as representative) */}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CreditCardIcon sx={{ fontSize: 50, color: '#fff' }} />
                                    <Typography variant="body2" sx={{ color: '#fff' }}>Visa</Typography>
                                </Box>
                            </Box>
                        </Box>

                    </Box>

                    {/* Useful Links Section */}
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Useful Links
                        </Typography>
                        <List>
                            {['Home', 'Shop', 'Men\'s Fashion', 'Women\'s Fashion', 'My Account', 'Wishlist'].map((text) => (
                                <ListItem key={text} sx={{ '&:hover': { color: '#0295db', cursor: 'pointer' } }}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* Contact Section */}
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Contact
                        </Typography>
                        <List>
                            <ListItem>
                                <RoomIcon sx={{ color: '#fff' }} />
                                <ListItemText primary="25 Zahrae, Elmoalemeen St, Giza, Egypt" />
                            </ListItem>
                            <ListItem>
                                <PhoneIcon sx={{ color: '#fff' }} />
                                <ListItemText primary="+2010151112" />
                            </ListItem>
                            <ListItem>
                                <EmailIcon sx={{ color: '#fff' }} />
                                <ListItemText primary="Heruko@gmail.com" />
                            </ListItem>
                        </List>
                    </Box>
                </Stack>
            </Container>


            {/* Footer Bottom Section */}
            <Box sx={{ mt: 5, textAlign: 'center', fontSize: '0.875rem', color: '#b0b0b0' }}>
                <Typography variant="body2">
                    © 2025 Heruko. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
// 1- done
// 2-responsive 