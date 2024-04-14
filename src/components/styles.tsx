import styled from '@emotion/styled';
import { AppBar, Card } from '@mui/material';

export const StyledHeader = styled(AppBar)`
  background-color: red;
`;

export const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

export const ProductCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    transform: scale3d(1.05, 1.05, 1);
    transition: transform 0.3s;
  }
`;
