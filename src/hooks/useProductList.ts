import { useMutation, useQuery } from '@apollo/client';
import { ProductsResponse } from '../interfaces/products';
import { useOrder } from '../store/orderProvider';
import { useState } from 'react';
import { GET_PRODUCTS } from '../graphql/queries/getProductQuery';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutation/addOrderMutation';

const useProductList = () => {
  const { addToOrder } = useOrder();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data = {
      products: {
        totalItems: 0,
        items: [],
      },
    },
    loading,
    error,
  } = useQuery<ProductsResponse>(GET_PRODUCTS, {
    variables: {
      options: { skip: (currentPage - 1) * itemsPerPage, take: itemsPerPage },
    },
  });

  const [addItemToOrder, { loading: MutationLoading }] = useMutation(
    ADD_ITEM_TO_ORDER,
    {
      refetchQueries: [
        {
          query: GET_PRODUCTS,
        },
      ],
      onCompleted: (data) => {
        addToOrder(data?.addItemToOrder);
      },
    }
  );

  const totalPages = Math.ceil(data?.products?.totalItems / itemsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setCurrentPage(page);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBuyClick = (productId: string) => {
    addItemToOrder({
      variables: { productVariantId: productId, quantity: 1 },
    }).catch((error) => {
      console.log(error, 'error in addItemToOrder');
      setSnackbarOpen(true);
    });
  };
  return {
    productsList: data?.products?.items ?? [],
    loading,
    error,
    snackbarOpen,
    handleBuyClick,
    handleSnackbarClose,
    MutationLoading,
    currentPage,
    itemsPerPage,
    handleChangePage,
    totalPages,
  };
};

export default useProductList;
