
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Modal, Box, Button, Typography } from '@mui/material';
import { Home, ShoppingCart, People, Category, Subscriptions, Dashboard, Store, BrandingWatermark, Business, Discount, Storefront, Analytics, Announcement } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminSideBar = ({ toggleSidebar, isSidebarOpen }) => {


    return (

        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#d0d0d238', // Background color of the sidebar
                    m: 2

                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List sx={{ cursor: 'pointer', fontWeight: 'bold' }}>


                <ListItem button component={Link} to="/dashboard/analytics" onClick={toggleSidebar}>
                    <Analytics sx={{ color: 'black' }} />
                    <ListItemText primary="Analytics" />
                </ListItem>


                <ListItem button component={Link} to="/dashboard/products">
                    <Storefront sx={{ color: 'black' }} />
                    <ListItemText primary="Product" />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/orders">
                    <ShoppingCart sx={{ color: 'black' }} />
                    <ListItemText primary="Orders" />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/users">
                    <People sx={{ color: 'black' }} />
                    <ListItemText primary="User" />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/categories">
                    <Category sx={{ color: 'black' }} />
                    <ListItemText primary="Categories" />
                </ListItem>


                <ListItem button component={Link} to="/dashboard/subcategories">
                    <Subscriptions sx={{ color: 'black' }} />
                    <ListItemText primary="Subcategories" />
                </ListItem>


                <ListItem button component={Link} to="/dashboard/brands">
                    <Business sx={{ color: 'black' }} />
                    <ListItemText primary="Brands" />
                </ListItem>



                <ListItem button component={Link} to="/dashboard/coupon">
                    <Discount sx={{ color: 'black' }} />
                    <ListItemText primary="Coupons" />
                </ListItem>

                <ListItem button component={Link} to="/dashboard/announcement">
                    <Announcement />
                    <ListItemText primary="Announcements" />
                </ListItem>
            </List>
        </Drawer>
    );
};


export default AdminSideBar



