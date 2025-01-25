import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, InputBase, Box, Avatar,
  Menu, MenuItem, Button, Badge
} from '@mui/material';
import {
  Menu as MenuIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon,
  FavoriteRounded
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/system';
import GetUserCartHook from '../../customHooks/Cart/get-user-cart-hook';
import WarningModal from './WarningModal';
import GetProductSearchHook from '../../customHooks/Product/GetProductSearchHook';
import Notification from '../../customHooks/useNotification';
import GetAllWishListProduct from '../../customHooks/Wishlist/GetAllWishListProduct';


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
  color: '#fff'
});

const SearchIconWrapper = styled('div')({
  marginRight: '10px',
});

const StyledInputBase = styled(InputBase)({
  color: 'black',
  width: '100%',
});

const NavbarLogged = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [
    sortOption,
    setSortOption,
    category,
    setCategory,
    brand,
    setPriceRange,
    priceRange,
    setBrand,
    handleSearch,
    searchedProducts
  ] = GetProductSearchHook();
  const [itemsNum] = GetUserCartHook();
  const [prodInWishlist] = GetAllWishListProduct();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);
  console.log('the user', user)
  const handleMenuClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleMenuClose = () => { setAnchorEl(null); };
  const handleNavigate = (path) => { navigate(path); };

  const handleConfirmLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    setUser('');
    window.location.href = '/';
  };

  if (!localStorage.getItem('userToken')) {

    Notification('Session Expired Please Login Again ', 'info')

    window.location.href = '/login';



  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: primaryColor, mb: 7 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', cursor: 'pointer', color: '#fff' }}
          onClick={() => handleNavigate('/')}
        >
          AZARM.
        </Typography>

        {/* Search Bar */}
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


        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/')}>Home</Button>
          <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/product')}>Products</Button>
          <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/brand')}>Brands</Button>
          <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/category')}>Categories</Button>
          <Button sx={{ color: '#fff' }} onClick={() => handleNavigate('/profile')}>Profile</Button>
          {user.role === 'admin' && (
            <Button sx={{ color: accentColor }} onClick={() => handleNavigate('/dashboard')}>Dashboard</Button>
          )}
        </Box>

        {/* Icons Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Wishlist */}
          <IconButton color="inherit" onClick={() => handleNavigate('/wishlist')}>
            <Badge badgeContent={prodInWishlist ?
              prodInWishlist.numberOfLikedProduct : '0'}
              color="error">
              <FavoriteRounded />
            </Badge>
          </IconButton>

          {/* Shopping Cart */}
          <IconButton color="inherit" onClick={() => handleNavigate('/cart')}>
            <Badge badgeContent={itemsNum || '0'} color="error">
              <ShoppingCartIcon sx={{ color: '#fff' }} />
            </Badge>
          </IconButton>

          {/* Avatar & Account Menu */}
          <IconButton onClick={handleMenuClick}>
            <Avatar
              src={user?.profileImage || '/default-avatar.png'}
              alt={user?.name || 'User'}
            />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => handleNavigate('/order')}>Orders</MenuItem>
            <MenuItem onClick={() => setIsModalOpen(true)}>Logout</MenuItem>
          </Menu>

          {/* Mobile Menu Icon */}
          <IconButton sx={{ display: { sm: 'none' }, color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Logout Confirmation Modal */}
      <WarningModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsModalOpen(false)}
        message="Are you sure you want to logout?"
      />
    </AppBar>
  );
};

export default NavbarLogged;
