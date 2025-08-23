import React from 'react';
import { render } from '@testing-library/react-native';
import ProductDetailDiscountBadge from './ProductDetailDiscountBadge';
import { Product } from '../../domain/entities/Product';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'A great product',
  price: 100,
  discountPercentage: 20,
  rating: 4.5,
  stock: 10,
  brand: 'Test Brand',
  category: 'electronics',
  thumbnail: '',
  images: [],
  reviews: [],
};

describe('ProductDetailDiscountBadge', () => {
  it('renders the discount percentage when it exists', () => {
    const { getByText } = render(
      <ProductDetailDiscountBadge product={mockProduct} />,
    );

    expect(getByText('20% OFF')).toBeTruthy();
  });

  it('does not render anything when the discount is 0', () => {
    const productNoDiscount = { ...mockProduct, discountPercentage: 0 };
    const { queryByText } = render(
      <ProductDetailDiscountBadge product={productNoDiscount} />,
    );

    expect(queryByText(/OFF/)).toBeNull();
  });

  it('rounds down the discount if it has decimals', () => {
    const productDecimalDiscount = { ...mockProduct, discountPercentage: 12.9 };
    const { getByText } = render(
      <ProductDetailDiscountBadge product={productDecimalDiscount} />,
    );

    expect(getByText('12% OFF')).toBeTruthy();
  });
});
