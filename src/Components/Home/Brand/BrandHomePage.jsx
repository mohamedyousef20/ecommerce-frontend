import React from 'react'
import BrandCard from '../../Brand/BrandCard'
import BrandHomeHook from '../../../customHooks/Brand/BrandHomeHook'
import { Box, CircularProgress, Container, Grid, Stack } from '@mui/material'

const BrandHomePage = () => {

    const [loading, brand] = BrandHomeHook()

    return (
        <Container>
            <Box sx={{ padding: 2 }}>
                {/* Categories Grid */}
                <Grid container spacing={2} justifyContent={'center'}>
                    {brand && brand.data ? brand.data.slice(0, 6).map((brand) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={brand._id}>
                            <BrandCard brand={brand} />
                        </Grid>
                    )) : <CircularProgress sx={{ margin: 'auto' }} />}
                </Grid>
            </Box>
        </Container>
    )
}

export default BrandHomePage
// 1- done
// 2-responsive 