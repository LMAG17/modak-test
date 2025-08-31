import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Product } from '../../src/domain/entities/Product';
import ProductPage from '../../src/presentation/components/ProductPage';

const mockProduct: Product = {
  id: 1,
  title: 'iPhone 15 Pro',
  description: 'Latest iPhone model',
  price: 1200,
  discountPercentage: 15,
  rating: 4.5,
  stock: 20,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://placehold.co/100x100',
  images: [],
  reviews: [],
};

describe('ProductPage', () => {
  it('renders a list of products', () => {
    const products = [
      mockProduct,
      { ...mockProduct, id: 2, title: 'Samsung S24 Ultra', brand: 'Samsung' },
    ];

    const { getByText } = render(<ProductPage items={products} />);

    expect(getByText('iPhone 15 Pro')).toBeTruthy();
    expect(getByText('Samsung S24 Ultra')).toBeTruthy();
  });

  it('calls onPress with correct id when product clicked', () => {
    const onPressMock = jest.fn();
    const products = [mockProduct];

    const { getByTestId } = render(
      <ProductPage items={products} onPress={onPressMock} />,
    );

    const button = getByTestId('touchable');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledWith(1);
  });
});
