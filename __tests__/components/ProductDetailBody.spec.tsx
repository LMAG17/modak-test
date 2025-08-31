import { render } from '@testing-library/react-native';
import React from 'react';
import { Product } from '../../src/domain/entities/Product';
import ProductDetailBody from '../../src/presentation/components/ProductDetailBody';

jest.mock('../../src/presentation/components/Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

const mockProduct: Product = {
  id: 1,
  title: 'iPhone 15 Pro',
  description: 'El mejor iPhone hasta ahora.',
  price: 1200,
  brand: 'Apple',
  rating: 4.8,
  reviews: [
    {
      date: '2023-09-15',
      reviewerName: 'Juan Pérez',
      reviewerEmail: 'juan.perez@example.com',
      comment: 'Excelente',
      rating: 5,
    },
  ],
  category: 'smartphones',
  images: ['https://example.com/iphone-15-pro.jpg'],
  discountPercentage: 10,
  stock: 50,
  thumbnail: 'https://example.com/iphone-15-pro-thumbnail.jpg',
};

describe('ProductDetailBody', () => {
  it('renders the product details correctly', () => {
    const { getByText } = render(
      <ProductDetailBody
        product={mockProduct}
        isAlreadyInCart={false}
        onAddToCart={jest.fn}
        onRemoveFromCart={jest.fn}
      />,
    );

    expect(getByText('Apple')).toBeTruthy();

    expect(getByText('iPhone 15 Pro')).toBeTruthy();

    expect(getByText('$1,200.00')).toBeTruthy();

    expect(getByText(/4.8/)).toBeTruthy();
    expect(getByText(/\(1 reviews\)/)).toBeTruthy();

    expect(getByText('El mejor iPhone hasta ahora.')).toBeTruthy();
  });
});
