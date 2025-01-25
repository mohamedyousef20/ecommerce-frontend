import React from 'react'
import Brand from '../../Components/Admin/Dashboard/Brand'
import AdminGetAllBrandHook from '../../customHooks/Admin/Brand/AdminGetAllBrandHook';
import BrandCard from '../../Components/Brand/BrandCard';
import { CircularProgress, Container, Grid, Stack } from '@mui/material';
import NotFound from '../../Components/Utils/NotFound';

const BrandPage = () => {
  const [brands, loading] = AdminGetAllBrandHook();
  return (
    <Container maxWidth="lg"> {/* Added Container for responsiveness */}
      <Stack gap={0.5} direction="row" justifyContent="space-around" flexWrap="wrap" mt="2rem">
        {loading === false ? (
          brands && brands.data ? (
            // Use Grid to create a responsive layout for the categories
            <Grid container spacing={2} justifyContent="center">
              {brands.data.map((brand, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <BrandCard brand={brand} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <NotFound />
          )
        ) : (
          <CircularProgress size={50} thickness={4} color="primary" />
        )}
      </Stack>
    </Container>
  )
}

export default BrandPage
