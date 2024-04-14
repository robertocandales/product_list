import { Toolbar, Typography } from '@mui/material';
import { useOrder } from '../store/orderProvider';
import { formatToUSD } from '../utils/currency';
import { Logo, StyledHeader } from './styles';

const Header = () => {
  const { subTotal } = useOrder();

  return (
    <StyledHeader position="static">
      <Toolbar>
        <Logo
          src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
          alt="logo"
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Subtotal: {formatToUSD(subTotal)}
        </Typography>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
