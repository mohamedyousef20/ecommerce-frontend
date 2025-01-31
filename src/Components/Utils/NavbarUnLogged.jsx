import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Button, Drawer } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { alpha, styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Colors
const primaryColor = '#1976D2';
const accentColor = '#FF5722';
const backgroundColor = '#F5F5F5';

// Styled Search bar
const Search = styled('div')({
    position: 'relative',
    borderRadius: '4px',
    backgroundColor: alpha(backgroundColor, 0.15),
    '&:hover': { backgroundColor: alpha(backgroundColor, 0.25) },
    marginLeft: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    maxWidth: '300px',
});

const SearchIconWrapper = styled('div')({
    marginRight: '10px',
});

const StyledInputBase = styled(InputBase)({
    color: '#fff',
    width: '100%',
});

const NavbarUnLogged = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleNavigate = (path) => { navigate(path); };
    const handleSearch = (event) => { console.log('Searching:', event.target.value); };
    const toggleDrawer = (open) => () => { setDrawerOpen(open); };

    const menuItems = (
        <Box sx={{ width: 250 }}>
            <Button sx={{ color: '#000', width: '100%' }} onClick={() => { handleNavigate('/'); toggleDrawer(false)(); }}>Home</Button>
            <Button sx={{ color: '#000', width: '100%' }} onClick={() => { handleNavigate('/product'); toggleDrawer(false)(); }}>Products</Button>
            <Button sx={{ color: '#000', width: '100%' }} onClick={() => { handleNavigate('/brand'); toggleDrawer(false)(); }}>Brands</Button>
            <Button sx={{ color: '#000', width: '100%' }} onClick={() => { handleNavigate('/category'); toggleDrawer(false)(); }}>Categories</Button>
            <Button sx={{ color: '#000', width: '100%' }} onClick={() => { handleNavigate('/login'); toggleDrawer(false)(); }}>Login</Button>
            <Button sx={{ backgroundColor: accentColor, color: '#fff', width: '100%', '&:hover': { backgroundColor: '#D84315' } }} onClick={() => { handleNavigate('/register'); toggleDrawer(false)(); }}>
                Sign Up
            </Button>
        </Box>
    );

    return (
        <AppBar position="sticky" sx={{ backgroundColor: primaryColor }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo Section */}
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', cursor: 'pointer', color: '#fff' }}
                    onClick={() => handleNavigate('/')}
                >
                    AZARM.
                </Typography>

                {/* Search Bar */}
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon sx={{ color: primaryColor }} />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search…" onChange={handleSearch} />
                </Search>

                {/* Navigation Links for Desktop */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
                    <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/')}>Home</Button>
                    <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/product')}>Products</Button>
                    <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/brand')}>Brands</Button>
                    <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/category')}>Categories</Button>
                    <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/login')}>Login</Button>
                    <Button sx={{ backgroundColor: accentColor, color: '#fff', '&:hover': { backgroundColor: '#D84315' } }} onClick={() => handleNavigate('/register')}>
                        Sign Up
                    </Button>
                </Box>

                {/* Mobile Menu Icon */}
                <IconButton sx={{ display: { sm: 'none' }, color: '#fff' }} onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>

                {/* Drawer for Mobile Navigation */}
                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                    {menuItems}
                </Drawer>

            </Toolbar>
        </AppBar>
    );
};

export default NavbarUnLogged;