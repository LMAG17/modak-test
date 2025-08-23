import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Product } from '../../domain/entities/Product';
import { ProductItem } from './ProductItem';

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

describe('ProductItem', () => {
  it('renders product info correctly', () => {
    const { getByText, getByTestId } = render(
      <ProductItem product={mockProduct} />,
    );

    expect(getByText('iPhone 15 Pro')).toBeTruthy();
    expect(getByText('Apple')).toBeTruthy();

    expect(getByText('15% OFF')).toBeTruthy();

    expect(getByText('$1200')).toBeTruthy();

    const image = getByTestId('product-image');
    expect(image).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ProductItem product={mockProduct} onPress={onPressMock} />,
    );

    const button = getByTestId('touchable');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
