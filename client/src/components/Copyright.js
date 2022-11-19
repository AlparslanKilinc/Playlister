import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
    return (
        <Typography variant="h6" color="black" align="center" {...props}>
            {'Copyright © '}
            <Link underline="none" style={{color:'black'}} href="/">
                Alparslan Kilinc
            </Link>{' '}
            {new Date().getFullYear()}
            {''}
        </Typography>
    );
}