interface Asset {
  __typename: 'Asset';
  source: string;
  width: number;
  height: number;
}

interface ProductVariant {
  __typename: 'ProductVariant';
  price: number;
  productId: string;
}

export interface Product {
  __typename: 'Product';
  id: string;
  name: string;
  description: string;
  featuredAsset: Asset;
  variants: ProductVariant[];
}

export interface ProductsResponse {
  products: {
    items: Product[];
    totalItems: number;
  };
}
