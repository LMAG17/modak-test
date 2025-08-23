import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Product } from '../../src/domain/entities/Product';
import ProductCarousel from '../../src/presentation/components/ProductCarousel';

jest.mock('../../src/presentation/components/Carousel', () => {
  const React = require('react');

  return {
    CustomCarousel: ({ data, renderItem }: any) => (
      <>
        {data?.map((item: Product, index: number) => (
          <React.Fragment key={index}>{renderItem({ item })}</React.Fragment>
        ))}
      </>
    ),
  };
});

jest.mock('../../src/presentation/components/ProductPage', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    ProductPage: ({ items, onPress }: any) => {
      return <Text onPress={() => onPress?.(items.id)}>{items.name}</Text>;
    },
  };
});

describe('ProductCarousel', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 100 } as unknown as Product,
    { id: 2, name: 'Product 2', price: 200 } as unknown as Product,
  ];

  it('renders the product information correctly', () => {
    render(<ProductCarousel products={mockProducts} />);
    expect(screen.getByText('Product 1')).toBeTruthy();
    expect(screen.getByText('Product 2')).toBeTruthy();
  });

  it('calls onPress when a product is clicked', () => {
    const onPress = jest.fn();
    render(<ProductCarousel products={mockProducts} onPress={onPress} />);

    fireEvent.press(screen.getByText('Product 1'));
    expect(onPress).toHaveBeenCalledWith(1);

    fireEvent.press(screen.getByText('Product 2'));
    expect(onPress).toHaveBeenCalledWith(2);
  });
});
