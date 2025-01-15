// src/components/AsideBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Dashboard, Storefront, Category, People, ShoppingCart, Announcement } from '@mui/icons-material';

const AsideBar = () => {
  return (
    <Box sx={{ width: 240, bgcolor: 'background.paper', height: '100vh' }}>
      <List>

        <ListItem button component={Link} to="/analytics">
          <Dashboard />
          <ListItemText primary="Analytics" />
        </ListItem>

        <Divider />
        <ListItem button component={Link} to="/products">
          <Storefront />
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <People />
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/orders">
          <ShoppingCart />
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={Link} to="/categories">
          <Category />
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button component={Link} to="/announcements">
          <Announcement />
          <ListItemText primary="Announcements" />
        </ListItem>
      </List>
    </Box>
  );
};

export default AsideBar;
