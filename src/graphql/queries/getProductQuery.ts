import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT } from '../fragments/productFragment';

export const GET_PRODUCTS = gql`
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      totalItems
      items {
        ...ProductFields
        featuredAsset {
          source
          width
          height
        }
        variants {
          price
          productId
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
