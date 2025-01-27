import { TextField } from '@mui/material';

const AdminTextField = ({ ...props }) => {
    return (
        <TextField
            {...props}
            sx={{
                mb: 3,
                '& .MuiInputBase-root': {
                    borderRadius: 2,
                    backgroundColor: '#F5F5F5', // Neutral Color
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976D2', // Primary Color
                },
                ...props.sx
            }}
        />
    );
};

export default AdminTextField;