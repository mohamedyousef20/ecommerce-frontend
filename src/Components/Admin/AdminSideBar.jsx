import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Typography } from '@mui/material';
import { Home, ShoppingCart, People, Category, Subscriptions, Dashboard, Store, BrandingWatermark, Business, Discount, Storefront, Analytics, Announcement, ViewAgenda } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

// Colors
const primaryColor = '#1976D2';  // Blue
const accentColor = '#FF5722';   // Orange
const backgroundColor = '#F5F5F5'; // Light Gray

const AdminSideBar = ({ toggleSidebar, isSidebarOpen }) => {
    const location = useLocation();
    const menuItems = [
        { text: 'Overview', icon: ViewAgenda, path: '/dashboard/overview' },
        { text: 'Products', icon: Storefront, path: '/dashboard/products' },
        { text: 'Orders', icon: ShoppingCart, path: '/dashboard/orders' },
        { text: 'Users', icon: People, path: '/dashboard/users' },
        { text: 'Categories', icon: Category, path: '/dashboard/categories' },
        { text: 'Subcategories', icon: Subscriptions, path: '/dashboard/subcategory' },
        { text: 'Brands', icon: Business, path: '/dashboard/brands' },
        { text: 'Coupons', icon: Discount, path: '/dashboard/coupon' },
        { text: 'Announcements', icon: Announcement, path: '/dashboard/announcement' },
    ];

    return (
        <Drawer
            sx={{
                width: 280,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 280,
                    boxSizing: 'border-box',
                    background: 'linear-gradient(180deg, #1976D2 0%, #1565C0 100%)',
                    color: '#fff',
                    borderRadius: '0 16px 16px 0',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    border: 'none',
                    mx:1 ,
                    my:10 ,
                    alignItems:'center'
                    
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box sx={{ p: 3, mb: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff' }}>
                    Admin Dashboard
                </Typography>
            </Box>

            <List sx={{ px: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <ListItem
                            key={item.text}
                            component={Link}
                            to={item.path}
                            sx={{
                                mb: 1,
                                borderRadius: '12px',
                                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            <Icon
                                sx={{
                                    mr: 2,
                                    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                                    transition: 'color 0.2s ease-in-out',
                                }}
                            />
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                                        transition: 'color 0.2s ease-in-out',
                                    },
                                }}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default AdminSideBar;
