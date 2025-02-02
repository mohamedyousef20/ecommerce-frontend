// import React from 'react';
// import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
// import CategoryIcon from '@mui/icons-material/Category';
// import CategoryCard from '../../Category/CategoryCard';
// import HomeCateHook from '../../../customHooks/Category/HomeCateHook';

// const HomeCategoryPage = () => {
//   const [loading, category] = HomeCateHook();
//   return (
//     <Container>
//       <Box sx={{ paddingY: 4 }}>
//         {/* Header */}

//         {/* Categories Grid */}
//         {category?.data ? (
//           <Grid container spacing={2} justifyContent="center">
//             {category?.data?.slice(0, 6).map((cat) => (
//               <Grid item xs={6} sm={4} md={2} key={cat._id}>
//                 <CategoryCard category={cat} />
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//             <CircularProgress sx={{ color: "#FF5722" }} />
//           </Box>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default HomeCategoryPage;
// 1- done
// 2-responsive import React from 'react';
import GetHomeProdHook from '../../../customHooks/Product/GetHomeProdHook';
import ProductGrid from '../../Product/ProductContainer';
import { Box, Typography } from '@mui/material';
import GetMostPopularProductHook from '../../../customHooks/Product/GetMostPopularProductHook';
import GetMostOfferedProductHook from '../../../customHooks/Product/GetMostOfferedProductHook';

const HomeProduct = () => {
  const [products] = GetHomeProdHook();
  const [popularProduct] = GetMostPopularProductHook();
  const [mostOfferedProduct] = GetMostOfferedProductHook();

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, backgroundColor: "#F5F5F5" }}>
      {/* Recent Launch Section */}
      <Box sx={{ marginBottom: { xs: 3, md: 4 } }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            textAlign: 'left',
            marginBottom: 1,
            color: "#FF5722", // Orange
            display: "inline-block",
            paddingBottom: "4px",
            letterSpacing: 1.5,
            fontSize: { xs: '1.75rem', md: '2.125rem' }, // Responsive font size
          }}
        >
          Recent Launch
        </Typography>
        <ProductGrid products={products} />
      </Box>

      {/* Popular Product Section */}
      <Box sx={{ marginBottom: { xs: 4, md: 6 } }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            textAlign: 'left',
            marginBottom: 1,
            color: "#1976D2", // Blue
            display: "inline-block",
            paddingBottom: "4px",
            letterSpacing: 1.5,
            fontSize: { xs: '1.75rem', md: '2.125rem' }, // Responsive font size
          }}
        >
          Popular Products
        </Typography>
        <ProductGrid products={popularProduct} />
      </Box>

      {/* Special Offer Section */}
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            textAlign: 'left',
            marginBottom: 1,
            color: "#FF5722", // Orange
            display: "inline-block",
            paddingBottom: "4px",
            letterSpacing: 1.5,
            fontSize: { xs: '1.75rem', md: '2.125rem' }, // Responsive font size
          }}
        >
          Special Offers
        </Typography>
        <ProductGrid products={mostOfferedProduct} />
      </Box>
    </Box>
  );
};

export default HomeProduct;