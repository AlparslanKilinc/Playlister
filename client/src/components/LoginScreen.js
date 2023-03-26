import { useContext } from 'react';
import AuthContext from '../auth'
import MUILoginErrorModal from './MUILoginErrorModal'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function LoginScreen() {
    const { auth } = useContext(AuthContext);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get('userName'));
        auth.loginUser(
            formData.get('userName'),
            formData.get('password')
        );
    };
    return (
        <>
        <MUILoginErrorModal/>
            <Box
                sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent:'center',
                        padding:'1rem',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="userName"
                            autoComplete="User Name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{backgroundColor:'#143C9A'}}
                        >
                            Sign In
                        </Button>
                    </Box>
            </Box>
        </>
    );
}