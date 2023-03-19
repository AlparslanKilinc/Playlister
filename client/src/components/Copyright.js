import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright() {
    return (
    <div style={{display:'flex'}}> 
        <Link underline="none" style={{color:"#143C9A"}}className="fa-brands fa-github" href="https://github.com/AlparslanKilinc" target="_blank">
        </Link>
        <h3 className='name'> Alparslan Kilinc</h3>
    </div>
    );
}