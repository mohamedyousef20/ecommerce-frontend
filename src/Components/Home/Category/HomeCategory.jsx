import React from 'react';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import CategoryCard from '../../Category/CategoryCard';
import HomeCateHook from '../../../customHooks/Category/HomeCateHook';

const HomeCategoryPage = () => {
  const [loading, category] = HomeCateHook();
  return (
    <Container>
      <Box sx={{ paddingY: 4 }}>
        {/* Header */}

        {/* Categories Grid */}
        {category?.data ? (
          <Grid container spacing={2} justifyContent="center">
            {category?.data?.slice(0, 6).map((cat) => (
              <Grid item xs={6} sm={4} md={2} key={cat._id}>
                <CategoryCard category={cat} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress sx={{ color: "#FF5722" }} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default HomeCategoryPage;
// 1- done
// 2-responsive 