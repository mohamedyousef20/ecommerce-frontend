import React from 'react'
import { Button } from '@mui/material'
const CategoryButton = () => {
    return (
        <Button
            variant="contained"

            sx={{
                px: 1,
                py: .4,
                mt: 2,
                backgroundColor: "#fff",
                fontWeight: '600',

                // boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                color: "#151515",
                borderRadius: "1px",
                "&:hover": {
                    color: '#fff',
                    bgcolor: "#151515",
                    boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                }
            }
            } >
            SHOP NOW


        </Button>
    )
}

export default CategoryButton
