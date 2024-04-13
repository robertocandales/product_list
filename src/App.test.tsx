import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { ProductList } from './components/ProductList';

describe('ProductList', () => {
  it('renders text and button', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});
