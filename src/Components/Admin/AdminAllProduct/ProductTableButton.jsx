import React from 'react'
import {
    Button,
    Stack,

} from "@mui/material";
import { Add } from '@mui/icons-material';


const ProductTableButton = () => {
  return (
      <Stack alignItems={'flex-start'}>
          <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              // onClick={handleAddProduct}
              sx={{
                  fontFamily: '"Fit One", sans-serif',
              }}
          >
              Add Product
          </Button>
      </Stack>
  )
}

export default ProductTableButton
