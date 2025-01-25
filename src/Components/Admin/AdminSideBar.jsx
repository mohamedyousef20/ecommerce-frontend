import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { Home, ShoppingCart, People, Category, Subscriptions, Dashboard, Store, BrandingWatermark, Business, Discount, Storefront, Analytics, Announcement } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Colors
const primaryColor = '#1976D2';  // Blue
const accentColor = '#FF5722';   // Orange
const backgroundColor = '#F5F5F5'; // Light Gray

const AdminSideBar = ({ toggleSidebar, isSidebarOpen }) => {

    return (
        <Drawer
            sx={{
                width: 270,  // Increased width
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 270,  // Increased width
                    boxSizing: 'border-box',
                    backgroundColor: primaryColor, // Use primary color as background
                    color: '#fff', // Text color inside sidebar
                    m: 2,
                    borderRadius: '10px 10px 0 0', // Rounded corners at the top
                    position: 'absolute',
                    bottom: 0,  // Positioning at the bottom of the navbar
                    height: 'auto',  // Let the sidebar height adjust as needed
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                <ListItem button component={Link} to="/dashboard/analytics" onClick={toggleSidebar}>
                    <Analytics sx={{ color: '#fff' }} />
                    <ListItemText primary="Analytics" sx={{ color: '#fff' }} />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/products">
                    <Storefront sx={{ color: '#fff' }} />
                    <ListItemText primary="Product" sx={{ color: '#fff' }} />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/orders">
                    <ShoppingCart sx={{ color: '#fff' }} />
                    <ListItemText primary="Orders" sx={{ color: '#fff' }} />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/users">
                    <People sx={{ color: '#fff' }} />
                    <ListItemText primary="User" sx={{ color: '#fff' }} />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/categories">
                    <Category sx={{ color: '#fff' }} />
                    <ListItemText primary="Categories" sx={{ color: '#fff' }} />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/subcategory">
                    <Subscriptions sx={{ color: '#fff' }} />
                    <ListItemText primary="Subcategories" sx={{ color: '#fff' }} />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/brands">
                    <Business sx={{ color: '#fff' }} />
                    <ListItemText primary="Brands" sx={{ color: '#fff' }} />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/coupon">
                    <Discount sx={{ color: '#fff' }} />
                    <ListItemText primary="Coupons" sx={{ color: '#fff' }} />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/announcement">
                    <Announcement sx={{ color: '#fff' }} />
                    <ListItemText primary="Announcements" sx={{ color: '#fff' }} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default AdminSideBar;
