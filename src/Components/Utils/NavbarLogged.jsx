// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Avatar, Menu, MenuItem, Button, Badge, circularProgressClasses } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon, AccountCircle, FavoriteBorderOutlined, FavoriteRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux/lib/exports';
import { getUserCart } from '../../redux/action/cartAction';
import GetUserCartHook from '../../customHooks/Cart/get-user-cart-hook';
import WarningModal from './WarningModal';

// Styled Search bar
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


const NavbarLogged = () => {


  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleConfirmLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userToken")
    setUser('')

    window.location.href = '/'
  }

  const handleOpenModal = () => { setIsModalOpen(true) }
  const handleCancelLogout = () => { setIsModalOpen(false) }

  const [itemsNum] = GetUserCartHook();
  console.log(itemsNum)
  //   if (itemsNum) {setCartItems(itemsNum)};

  // Open/close user menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSearch = (event) => {
    // You can implement search logic here
  };
  useEffect(() => {

    if (localStorage.getItem("user") != null) {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, [])



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
          {user.role === 'admin' ?
            <Button color="inherit" onClick={() => handleNavigate('/dashboard')}>Dashboard</Button>
            : null}
          <Button color="inherit" onClick={() => handleNavigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => handleNavigate('/product')}>Product</Button>
          <Button color="inherit" onClick={() => handleNavigate('/profile')}>Profile</Button>
        </Box>

        {/* Icons Section (Avatar, Cart, and Mobile Menu) */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={() => handleNavigate('/wishlist')}>
            <Badge badgeContent={3} color="error"> {/* Replace `3` with dynamic wishlist count */}
              <FavoriteRounded />
            </Badge>
          </IconButton>
          {/* Shopping Cart */}
          <IconButton color="inherit" onClick={() => handleNavigate('/cart')}>
            <Badge badgeContent={itemsNum} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Avatar and Account Menu */}
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <Avatar src={user.profileImage} />
          </IconButton>

          {/* User Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => handleNavigate('/order')}>Orders</MenuItem>
            <MenuItem onClick={handleOpenModal}>Logout</MenuItem>
          </Menu>

          {/* Mobile Menu Icon */}
          <IconButton color="inherit" sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {/* Delete Confirmation Modal */}
      <WarningModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        message="Are you sure you want to logout?"
      />
    </AppBar>
  );
};

export default NavbarLogged;
