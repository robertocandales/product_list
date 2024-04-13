import { gql } from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    name
    description
  }
`;

export const ACTIVE_ORDER_FRAGMENT = gql`
  fragment ActiveOrder on Order {
    id
    subTotal
    total
  }
`;
