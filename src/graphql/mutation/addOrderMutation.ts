import { gql } from '@apollo/client';
import { ACTIVE_ORDER_FRAGMENT } from '../fragments/productFragment';

export const ADD_ITEM_TO_ORDER = gql`
  mutation ADD_ITEM_TO_ORDER($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...ActiveOrder
      ... on ErrorResult {
        errorCode
        message
      }
      ... on InsufficientStockError {
        quantityAvailable
        order {
          ...ActiveOrder
        }
      }
    }
  }
  ${ACTIVE_ORDER_FRAGMENT}
`;
