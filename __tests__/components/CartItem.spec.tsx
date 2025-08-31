import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Product } from '../../src/domain/entities/Product';
import CartItem from '../../src/presentation/components/CartItem';

jest.mock('../../src/presentation/components/Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

describe('CartItem', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    thumbnail: 'image.png',
    description: 'Test description',
    brand: 'Test brand',
    rating: 4,
    stock: 5,
    category: 'Test category',
    discountPercentage: 10,
    images: [],
    reviews: [],
  };

  const item = { product: mockProduct, quantity: 2 };

  it('renders product details correctly', () => {
    const { getByText, getByTestId } = render(
      <CartItem item={item} onRemoveItem={jest.fn()} />,
    );

    expect(getByText('2')).toBeTruthy();

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('Test description')).toBeTruthy();

    expect(getByText('$100.00')).toBeTruthy();

    expect(getByTestId('image')).toBeTruthy();
  });

  it('calls onRemoveItem when trash icon is pressed', () => {
    const onRemoveItem = jest.fn();
    const { getByTestId } = render(
      <CartItem item={item} onRemoveItem={onRemoveItem} />,
    );

    const button = getByTestId('remove-button');
    fireEvent.press(button);

    expect(onRemoveItem).toHaveBeenCalledTimes(1);
  });
});
