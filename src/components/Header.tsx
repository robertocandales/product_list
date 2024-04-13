import { AppBar, Toolbar, Typography } from '@mui/material';
import { useOrder } from '../store/orderProvider';
import { formatToUSD } from '../utils/currency';
import styled from '@emotion/styled';

const StyledHeader = styled(AppBar)`
  background-color: red;
`;

const Logo = styled.img`
  height: 40px; /* Adjust height as needed */
  margin-right: 10px;
`;

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
