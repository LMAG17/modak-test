import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Product } from '../../src/domain/entities/Product';
import BuyButtons from '../../src/presentation/components/BuyButtons';

jest.mock('../../src/presentation/components/Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

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

describe('BuyButtons', () => {
  it('renders remove button when already in cart', () => {
    const onRemoveFromCart = jest.fn();
    const { getByText } = render(
      <BuyButtons
        product={mockProduct}
        isAlreadyInCart={true}
        onAddToCart={jest.fn()}
        onRemoveFromCart={onRemoveFromCart}
      />,
    );

    expect(getByText('Quitar del carrito')).toBeTruthy();
    fireEvent.press(getByText('Quitar del carrito'));
    expect(onRemoveFromCart).toHaveBeenCalled();
  });

  it('renders add button and quantity controls when not in cart', () => {
    const { getByText } = render(
      <BuyButtons
        product={mockProduct}
        isAlreadyInCart={false}
        onAddToCart={jest.fn()}
        onRemoveFromCart={jest.fn()}
      />,
    );

    expect(getByText('Add to Cart')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText(`Stock available: ${mockProduct.stock}`)).toBeTruthy();
  });

  it('increments and decrements quantity correctly', () => {
    const { getByText, getByTestId } = render(
      <BuyButtons
        product={mockProduct}
        isAlreadyInCart={false}
        onAddToCart={jest.fn()}
        onRemoveFromCart={jest.fn()}
      />,
    );

    const minusButton = getByTestId('remove-button');
    const plusButton = getByTestId('add-button');

    fireEvent(minusButton, 'onPress');
    expect(getByText('1')).toBeTruthy();

    fireEvent(plusButton, 'onPress');
    expect(getByText('2')).toBeTruthy();

    fireEvent(minusButton, 'onPress');
    expect(getByText('1')).toBeTruthy();

    fireEvent(plusButton, 'onLongPress');
    expect(getByText(String(mockProduct.stock))).toBeTruthy();

    fireEvent(minusButton, 'onLongPress');
    expect(getByText('1')).toBeTruthy();
  });

  it('calls onAddToCart with correct quantity', () => {
    const onAddToCart = jest.fn();
    const { getByText, getByTestId } = render(
      <BuyButtons
        product={mockProduct}
        isAlreadyInCart={false}
        onAddToCart={onAddToCart}
        onRemoveFromCart={jest.fn()}
      />,
    );

    const plusButton = getByTestId('add-button');
    fireEvent(plusButton, 'onPress');

    fireEvent.press(getByText('Add to Cart'));
    expect(onAddToCart).toHaveBeenCalledWith(2);
  });
});
