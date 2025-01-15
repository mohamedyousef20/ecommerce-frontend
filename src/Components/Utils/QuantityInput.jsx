// import React, { useState } from 'react';
// import { IconButton, TextField, Box } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// const QuantityInput = ({ quantity, setQuantity, onQuantityChange }) => {
//     const [quantity, setQuantity] = useState(1);

//     return (
//         <Box display="flex" alignItems="center">
//             <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
//                 <RemoveIcon />
//             </IconButton>
//             <TextField
//                 value={quantity}
//                 onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
//                 type="number"
//                 inputProps={{ min: 1 }}
//                 variant="outlined"
//                 size="small"
//                 sx={{ width: 60, textAlign: 'center' }}
//             />
//             <IconButton onClick={() => setQuantity(quantity + 1)}>
//                 <AddIcon />
//             </IconButton>
//         </Box>
//     );
// };

// export default QuantityInput;
