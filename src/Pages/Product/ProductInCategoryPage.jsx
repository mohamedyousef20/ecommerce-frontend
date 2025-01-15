import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { getAllProductInCate } from '../../redux/action/productAction'
import Product from '../../Components/Product/ProductContainer'
import { useParams } from 'react-router-dom'
import GetProductInCateHook from '../../customHooks/Product/GetProductInCateHook'

const ProductInCategoryPage = () => {

    const {id} = useParams();

    console.log(id)

    const [products] = GetProductInCateHook(id)
    
  return (
    <div>
          {/* <Navbar /> */}
          <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              mt={4}
              sx={{
                  flexWrap: 'wrap',
                  gap: 2,
                  padding: { xs: 2, md: 4 },
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#f9f9f9',
              }}
          >
              {/* Filter Section */}
              <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography
                      fontSize={{ xs: '1rem', md: '1.2rem' }}
                      fontWeight={500}
                      mx={2}
                      color="#333"
                  >
                      Filter Products:
                  </Typography>
                  <select
                      style={{
                          padding: '8px 12px',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                          fontSize: '1rem',
                          outline: 'none',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                      }}
                      name="color"
                  // onChange={handleFilter}
                  >
                      <option selected disabled>
                          Color
                      </option>
                      <option>White</option>
                      <option>Black</option>
                      <option>Red</option>
                      <option>Blue</option>
                      <option>Green</option>
                      <option>Yellow</option>
                  </select>
              </Box>

              {/* Sort Section */}
              <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography
                      fontSize={{ xs: '1rem', md: '1.2rem' }}
                      fontWeight={500}
                      mx={2}
                      color="#333"
                  >
                      Sort Products:
                  </Typography>
                  <select
                      onChange={(e) => {
                          // setSort(e.target.value);
                      }}
                      style={{
                          padding: '8px 12px',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                          fontSize: '1rem',
                          outline: 'none',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                      }}
                      name="sort"
                  >
                      <option value="newest">Newest</option>
                      <option value="price">Price</option>
                      <option value="most-rated">Most Rated</option>
                  </select>
              </Box>

              {/* Results Count */}
              <Box
                  sx={{
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      fontWeight: '500',
                      color: '#333',
                  }}
              >
                  {`Result # ${products.length}`}
              </Box>
          </Stack>




          <Product products={products} /> 
    </div>
  )
}

export default ProductInCategoryPage
