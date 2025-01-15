// src/components/ResponsiveNavbarUnlogged.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Button, Badge } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { alpha, styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Styled Search Bar
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')({
    position: 'absolute',
    left: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    paddingLeft: '35px',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1),
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
        },
    },
}));

const NavbarUnLogged = () => {
    const navigate = useNavigate();

    // Handle navigation to different routes
    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSearch = (event) => {
        // You can implement search logic here
        console.log('Searching:', event.target.value);
    };

    return (
        <AppBar position="sticky" sx={{ zIndex: 1201 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo Section */}
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleNavigate('/')}>
                    AZARM.
                </Typography>



                {/* Search Bar */}
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearch}
                    />
                </Search>

                {/* Navigation Links (for larger screens) */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
                    <Button color="inherit" onClick={() => handleNavigate('/home')}>Home</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/product')}>Products</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/login')}>Login</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/register')}>Sign Up</Button>
                </Box>

                {/* Icons Section (Cart and Mobile Menu) */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                 

                    {/* Mobile Menu Icon */}
                    <IconButton color="inherit" sx={{ display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavbarUnLogged;
