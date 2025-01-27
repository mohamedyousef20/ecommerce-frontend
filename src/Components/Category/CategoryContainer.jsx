import React from 'react';
import CategoryCard from './CategoryCard';
import { CircularProgress, Stack, Grid, Container } from '@mui/material';
import NotFound from '../Utils/NotFound';

const CategoryContainer = ({ category, loading }) => {
  return (
    <Container maxWidth="lg"> {/* Added Container for responsiveness */}
      <Stack gap={0.5} direction="row" justifyContent="space-around" flexWrap="wrap" mt="2rem">
        {loading === false ? (
          category ? (
            // Use Grid to create a responsive layout for the categories
            <Grid container spacing={2} justifyContent="center">
              {category.map((item, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <CategoryCard category={category} />
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
  );
};

export default CategoryContainer;
