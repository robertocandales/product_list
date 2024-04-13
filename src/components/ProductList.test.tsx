import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ProductList } from './ProductList';
import useProductList from '../hooks/useProductList';

jest.mock('../hooks/useProductList', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseProductList = useProductList as jest.MockedFunction<
  typeof useProductList
>;

beforeEach(() => {
  mockedUseProductList.mockReturnValue({
    loading: false,
    error: undefined,
    snackbarOpen: false,
    handleBuyClick: jest.fn(),
    handleSnackbarClose: jest.fn(),
    MutationLoading: false,
    productsList: [
      {
        __typename: 'Product',
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        variants: [
          {
            price: 100,
            __typename: 'ProductVariant',
            productId: '',
          },
        ],
        featuredAsset: {
          source: 'image1.jpg',
          __typename: 'Asset',
          width: 0,
          height: 0,
        },
      },
      {
        __typename: 'Product',
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        variants: [{ price: 200, __typename: 'ProductVariant', productId: '' }],
        featuredAsset: {
          source: 'image2.jpg',
          __typename: 'Asset',
          width: 0,
          height: 0,
        },
      },
    ],
    currentPage: 1,
    itemsPerPage: 10,
    handleChangePage: jest.fn(),
    totalPages: 1,
  });
});

const Component = () => {
  return (
    <MockedProvider mocks={[]} addTypename={false}>
      <ProductList />
    </MockedProvider>
  );
};

describe('ProductList component', () => {
  it('should render correctly with default props', () => {
    const { container } = render(<Component />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render loading state correctly', () => {
    mockedUseProductList.mockReturnValueOnce({
      loading: true,
      productsList: [],
      error: undefined,
      snackbarOpen: false,
      handleBuyClick: jest.fn(),
      handleSnackbarClose: jest.fn(),
      MutationLoading: false,
      currentPage: 1,
      itemsPerPage: 10,
      handleChangePage: jest.fn(),
      totalPages: 1,
    });
    const { getByTestId } = render(<Component />);
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render error state correctly', () => {
    mockedUseProductList.mockReturnValueOnce({
      error: new Error('Test error'),
      currentPage: 1,
      itemsPerPage: 10,
      handleChangePage: jest.fn(),
      totalPages: 1,
    });
    const { getByText } = render(<Component />);
    expect(
      getByText(/An error occurred while fetching products/i)
    ).toBeInTheDocument();
  });

  it('should render products correctly', () => {
    const { getByText } = render(<Component />);
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
  });

  it('should display snackbar on error when adding item to order', () => {
    mockedUseProductList.mockReturnValueOnce({
      snackbarOpen: true,
      productsList: [],
      loading: false,
      error: undefined,
      handleBuyClick: jest.fn(),
      handleSnackbarClose: jest.fn(),
      MutationLoading: false,
      currentPage: 1,
      itemsPerPage: 10,
      handleChangePage: jest.fn(),
      totalPages: 1,
    });
    const { getByText } = render(<Component />);
    expect(
      getByText('An error occurred while adding the item to the order')
    ).toBeInTheDocument();
  });

  it('should call handleBuyClick when Buy button is clicked', () => {
    const handleBuyClick = jest.fn();
    mockedUseProductList.mockReturnValueOnce({
      handleBuyClick,
      productsList: [
        {
          __typename: 'Product',
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          variants: [
            {
              price: 100,
              __typename: 'ProductVariant',
              productId: '',
            },
          ],
          featuredAsset: {
            source: 'image1.jpg',
            __typename: 'Asset',
            width: 0,
            height: 0,
          },
        },
      ],
      loading: false,
      error: undefined,
      snackbarOpen: false,
      handleSnackbarClose: jest.fn(),
      MutationLoading: false,
      currentPage: 1,
      itemsPerPage: 10,
      handleChangePage: jest.fn(),
      totalPages: 1,
    });
    const { getByTestId } = render(<Component />);
    fireEvent.click(getByTestId('buy-button-1'));
    expect(handleBuyClick).toHaveBeenCalledWith('1');
  });
});
