import React from 'react'
import { Button } from '@mui/material'
const AddButton = () => {
    return (
        <Button
            variant="contained"
            // onClick={handleSubmit}

            sx={{
                px: 2,
                py: 1.5,
                mt: 2,
                backgroundColor: "#0295db",
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
            ADD COUPON


        </Button>
    )
}

export default AddButton
