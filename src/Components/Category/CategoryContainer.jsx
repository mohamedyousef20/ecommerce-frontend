import React from 'react';
import CategoryCard from './CategoryCard';
import { CircularProgress, Stack, Grid, Container } from '@mui/material';
import NotFound from '../Utils/NotFound';

const CategoryContainer = ({ category }) => {
  return (
    <Container maxWidth="lg"> {/* Added Container for responsiveness */}
      <Stack gap={0.5} direction="row" justifyContent="space-around" flexWrap="wrap" mt="2rem">
        {
          category ? (
            // Use Grid to create a responsive layout for the categories
            <Grid container spacing={2} justifyContent="center">
              {category.map((category, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <CategoryCard category={category} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <NotFound />
          )}

      </Stack>
    </Container>
  );
};

export default CategoryContainer;
