import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Product } from '../../src/domain/entities/Product';
import ProductDetailHeader from '../../src/presentation/components/ProductDetailHeader';

jest.mock('../../src/presentation/components/Carousel', () => {
  const React = require('react');
  return {
    CustomCarousel: ({ data, renderItem }: any) => (
      <>
        {data.map((item: any, index: number) => (
          <React.Fragment key={index}>{renderItem({ item })}</React.Fragment>
        ))}
      </>
    ),
  };
});

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
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  reviews: [],
};

describe('ProductDetailHeader', () => {
  it('renders the product images correctly', () => {
    render(<ProductDetailHeader product={mockProduct} />);
    const images = screen.getAllByTestId('product-image');
    expect(images).toHaveLength(mockProduct.images.length);
  });

  it('uses the correct image URLs', () => {
    render(<ProductDetailHeader product={mockProduct} />);
    const images = screen.getAllByTestId('product-image');
    expect(images[0].props.source).toEqual({ uri: mockProduct.images[0] });
    expect(images[1].props.source).toEqual({ uri: mockProduct.images[1] });
  });
});
