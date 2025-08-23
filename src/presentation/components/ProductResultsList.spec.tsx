import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductResultsList from './ProductResultsList';
import { Product } from './../../domain/entities/Product';

jest.mock('./ProductItem', () => {
  const React = require('react');
  const { Button } = require('react-native');
  return {
    ProductItem: ({ product, onPress }: any) => (
      <>
        <Button onPress={onPress} title={product.title} />
      </>
    ),
  };
});

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 100,
    discountPercentage: 10,
    images: [],
    brand: 'Brand A',
    category: 'Category A',
    description: 'Description for Product 1',
    rating: 4.5,
    reviews: [],
    stock: 50,
    thumbnail: '',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 200,
    discountPercentage: 20,
    images: [],
    brand: 'Brand B',
    category: 'Category B',
    description: 'Description for Product 2',
    rating: 4.0,
    reviews: [],
    stock: 30,
    thumbnail: '',
  },
];

describe('ProductResultsList', () => {
  it('renders the product titles correctly', () => {
    const { getByText } = render(
      <ProductResultsList products={mockProducts} />,
    );
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Product 2')).toBeTruthy();
  });

  it('renders a ProductItem for each product', () => {
    const { getAllByText } = render(
      <ProductResultsList products={mockProducts} />,
    );
    expect(getAllByText(/Product/)).toHaveLength(2);
  });

  it('calls onPress with the correct id', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ProductResultsList products={mockProducts} onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Product 1'));
    expect(onPressMock).toHaveBeenCalledWith(1);

    fireEvent.press(getByText('Product 2'));
    expect(onPressMock).toHaveBeenCalledWith(2);
  });

  it('does not break if no products are received', () => {
    const { toJSON } = render(<ProductResultsList />);
    expect(toJSON()).toBeTruthy();
  });
});
