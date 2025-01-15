import { useEffect, useState } from 'react';
import { deleteCoupon, getAllCoupon } from '../../../redux/action/couponAction';
import { useSelector, useDispatch } from 'react-redux/lib/exports';
import {
  Grid, Box, Checkbox, Button, IconButton, Typography, Divider,
  Paper, CircularProgress, useMediaQuery
} from '@mui/material';
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import WarningModal from '../../Utils/WarningModal';

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};

const Coupon = () => {
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);

  const handleSelectCoupon = (id) => {
    setSelectedProducts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((couponId) => couponId !== id);
      }
      return [...prev, id];
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    await dispatch(deleteCoupon(itemId));
    window.location.reload(true);
  };

  const coupons = useSelector((state) => state.couponReducer.getAllCoupon);

  return (
    <Box sx={{ padding: 2, flex: 1, bgcolor: '#f4f4f4' }}>
      <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} gutterBottom>
        Coupons
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <Button
        variant="contained"
        startIcon={<Add />}
        color="primary"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mb: 5,
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        Add New Product
      </Button>

      <Box sx={{ overflowX: 'auto' }}>
        <Paper>
          <Grid container spacing={3}>
            <Grid container item xs={12} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              bgcolor: '#f1f1f1',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}>
              <Grid item xs={1}>
                <Typography fontWeight="bold">Select</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={2}>
                <Typography fontWeight="bold">Name</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={2}>
                <Typography fontWeight="bold">Discount</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={2}>
                <Typography fontWeight="bold">Expire Date</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={2}>
                <Typography fontWeight="bold">Actions</Typography>
              </Grid>
            </Grid>

            {coupons.data ? coupons.data.map((coupon) => (
              <Grid container item xs={12} key={coupon._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 1,
                  borderRadius: 1,
                  justifyContent: 'flex-start',
                  bgcolor: '#fff',
                  borderBottom: '1px solid #ddd',
                }}>
                <Grid item xs={1}>
                  <Checkbox
                    onChange={() => handleSelectCoupon(coupon.id)}
                    sx={{ color: 'success', bgcolor: '#f1f1f1' }}
                  />
                </Grid>

                <Grid item xs={2}>
                  <Typography>{coupon.name}</Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography>{coupon.discount}%</Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography>
                    {formatDate(coupon.expireDate)}
                  </Typography>
                </Grid>

                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  <IconButton sx={{ color: 'black' }}>
                    <Visibility sx={{ color: 'black' }} />
                  </IconButton>

                  <Link to={`/admin/update-Coupon/${coupon._id}`}>
                    <IconButton sx={{ color: 'blue' }}>
                      <Edit sx={{ color: 'blue' }} />
                    </IconButton>
                  </Link>

                  <IconButton
                    onClick={() => { setItemId(coupon._id); setIsModalOpen(true); }}
                    sx={{ color: 'red' }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            )) : <CircularProgress />}
          </Grid>
        </Paper>
      </Box>

      <WarningModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this coupon?"
      />
    </Box>
  );
};

export default Coupon;
