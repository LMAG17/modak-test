import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HorizontalProductsList } from './ProductsList';
import { Product } from './../../domain/entities/Product';

jest.mock('./Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Desc 1',
    price: 100,
    images: [],
    brand: 'Brand A',
    category: 'Category A',
    rating: 4.5,
    reviews: [],
    stock: 50,
    thumbnail: '',
    discountPercentage: 10,
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Desc 2',
    price: 200,
    images: [],
    brand: 'Brand B',
    category: 'Category B',
    rating: 4.0,
    reviews: [],
    stock: 30,
    thumbnail: '',
    discountPercentage: 10,
  },
];

describe('HorizontalProductsList', () => {
  it('renders the product titles correctly', () => {
    const { getByText } = render(
      <HorizontalProductsList products={mockProducts} />,
    );

    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
  });

  it('executes the onPress callback when a product is clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <HorizontalProductsList products={mockProducts} onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Product 1'));
    expect(onPressMock).toHaveBeenCalledWith(1);
  });

  it('renders the list horizontally', () => {
    const { UNSAFE_getByType } = render(
      <HorizontalProductsList products={mockProducts} />,
    );

    const flatList = UNSAFE_getByType(require('react-native').FlatList);
    expect(flatList.props.horizontal).toBe(true);
  });
});
