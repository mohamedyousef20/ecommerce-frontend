import React from 'react';
import { Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import CategoryCard from '../../Category/CategoryCard';
import AllCatePageHook from '../../../customHooks/Category/AllCatePageHook';
import HomeCateHook from '../../../customHooks/Category/HomeCateHook';


const HomeCategoryPage = () => {

  const  [loading, category] = HomeCateHook()
  return (

    <Container >


      <Box sx={{ padding: 2 }}>
        {/* Categories Grid */}
        <Stack container spacing={2} direction={'row'} justifyContent={'center'}>
          {category && category.data ? category.data.slice(0, 6).map((category) => (
            <Grid item xs={6} sm={4} md={2} key={category._id}>
              <CategoryCard category={category} />
            </Grid>
          )) : <CircularProgress />}
        </Stack>
      </Box>
    </Container>
  );
};

export default HomeCategoryPage;
