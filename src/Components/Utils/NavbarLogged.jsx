import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, InputBase, Box, Avatar,
  Menu, MenuItem, Button, Badge
} from '@mui/material';
import {
  Menu as MenuIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon,
  FavoriteRounded,
  MenuBook,
  MenuOpen,
  CategorySharp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { alpha, Stack, styled } from '@mui/system';
import GetUserCartHook from '../../customHooks/Cart/get-user-cart-hook';
import WarningModal from './WarningModal';
import GetProductSearchHook from '../../customHooks/Product/GetProductSearchHook';
import Notification from '../../customHooks/useNotification';
import GetAllWishListProduct from '../../customHooks/Wishlist/GetAllWishListProduct';

// Updated colors for better visual hierarchy
const primaryColor = '#2563eb'; // Rich blue
const secondaryColor = '#1e40af'; // Darker blue for depth
const accentColor = '#f97316'; // Warm orange
const backgroundColor = '#f8fafc'; // Light gray background
const textColor = '#ffffff'; // White text

const Search = styled('div')({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: alpha(backgroundColor, 0.15),
  '&:hover': {
    backgroundColor: alpha(backgroundColor, 0.25),
    transition: 'all 0.3s ease'
  },
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  maxWidth: { xs: '100%', md: '300px' },
  color: textColor,
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
});

const SearchIconWrapper = styled('div')({
  marginRight: '10px',
});

const StyledInputBase = styled(InputBase)({
  color: textColor,
  width: '100%',
  '& input::placeholder': {
    color: alpha(textColor, 0.7),
  }
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  gap: '16px',
  backgroundColor: primaryColor,
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    padding: '8px 24px',
  }
}));

const NavbarLogged = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const handleMenuClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleMenuClose = () => { setAnchorEl(null); };
  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

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
    <AppBar position="sticky" sx={{ backgroundColor: primaryColor, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <StyledToolbar>
        {/* Top Section with Logo and Icons */}
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: { xs: `1px solid ${alpha(textColor, 0.1)}`, md: 'none' },
          pb: { xs: 2, md: 0 }
        }}>
          {/* Logo Column */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                color: textColor,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                '&:hover': {
                  color: alpha(textColor, 0.9),
                  transition: 'all 0.3s ease'
                }
              }}
              onClick={() => handleNavigate('/')}
            >
              AZARM.
            </Typography>
          </Box>

          {/* Icons Column - Mobile */}
          <Box sx={{
            display: { xs: 'flex', md: 'none' },
            gap: 1,
            alignItems: 'center'
          }}>
            <IconButton
              color="inherit"
              onClick={() => handleNavigate('/wishlist')}
              sx={{ '&:hover': { backgroundColor: secondaryColor } }}
            >
              <Badge badgeContent={prodInWishlist?.numberOfLikedProduct || '0'} color="error">
                <FavoriteRounded sx={{ color: textColor }} />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => handleNavigate('/cart')}
              sx={{ '&:hover': { backgroundColor: secondaryColor } }}
            >
              <Badge badgeContent={itemsNum || '0'} color="error">
                <ShoppingCartIcon sx={{ color: textColor }} />
              </Badge>
            </IconButton>

            <IconButton
              onClick={handleMenuClick}
              sx={{ '&:hover': { backgroundColor: secondaryColor } }}
            >
              <Avatar
                src={user?.profileImage || '/default-avatar.png'}
                alt={user?.name || 'User'}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{
                ml: 1,
                '&:hover': { backgroundColor: secondaryColor }
              }}
            >
              <MenuIcon sx={{ color: textColor }} />
            </IconButton>
          </Box>
        </Box>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: textColor }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search products..."
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearch}
          />
        </Search>

        {/* Navigation Links */}
        <Box sx={{
          display: { xs: mobileMenuOpen ? 'flex' : 'none', md: 'flex' },
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          gap: { xs: 1, md: 2 },
          pt: { xs: 2, md: 0 },
          borderTop: { xs: `1px solid ${alpha(textColor, 0.1)}`, md: 'none' }
        }}>
          <Button
            sx={{
              color: textColor,
              '&:hover': { backgroundColor: secondaryColor }
            }}
            onClick={() => handleNavigate('/')}
          >
            Home
          </Button>
          <Button
            sx={{
              color: textColor,
              '&:hover': { backgroundColor: secondaryColor }
            }}
            onClick={() => handleNavigate('/product')}
          >
            Products
          </Button>
          <Button
            sx={{
              color: textColor,
              '&:hover': { backgroundColor: secondaryColor }
            }}
            onClick={() => handleNavigate('/brand')}
          >
            Brands
          </Button>
          <Button
            sx={{
              color: textColor,
              '&:hover': { backgroundColor: secondaryColor }
            }}
            onClick={() => handleNavigate('/category')}
          >
            Categories
          </Button>
          {user.role === 'admin' && (
            <Button
              sx={{
                color: accentColor,
                '&:hover': { backgroundColor: alpha(accentColor, 0.1) }
              }}
              onClick={() => handleNavigate('/dashboard/overview')}
            >
              Dashboard
            </Button>
          )}
        </Box>

        {/* Desktop Icons */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 2
        }}>
          <IconButton
            color="inherit"
            onClick={() => handleNavigate('/wishlist')}
            sx={{ '&:hover': { backgroundColor: secondaryColor } }}
          >
            <Badge badgeContent={prodInWishlist?.numberOfLikedProduct || '0'} color="error">
              <FavoriteRounded sx={{ color: textColor }} />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => handleNavigate('/cart')}
            sx={{ '&:hover': { backgroundColor: secondaryColor } }}
          >
            <Badge badgeContent={itemsNum || '0'} color="error">
              <ShoppingCartIcon sx={{ color: textColor }} />
            </Badge>
          </IconButton>
          <IconButton
            onClick={handleMenuClick}
            sx={{ '&:hover': { backgroundColor: secondaryColor } }}
          >
            <Avatar
              src={user?.profileImage || '/default-avatar.png'}
              alt={user?.name || 'User'}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Box>
      </StyledToolbar>

      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }
        }}
      >
        <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleNavigate('/order')}>Orders</MenuItem>
        <MenuItem onClick={() => setIsModalOpen(true)}>Logout</MenuItem>
      </Menu>

      {/* Logout Modal */}
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