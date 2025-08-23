import { render } from '@testing-library/react-native';
import React from 'react';
import { Product } from '../../src/domain/entities/Product';
import ReviewsList from '../../src/presentation/components/ReviewsList';

const makeProduct = (reviews: any[] = []): Product => ({
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'Test description',
  reviews,
  brand: 'Test Brand',
  category: 'Test Category',
  discountPercentage: 10,
  images: ['image1.jpg', 'image2.jpg'],
  rating: 4.5,
  stock: 10,
  thumbnail: 'thumbnail.jpg',
});

describe('ReviewsList', () => {
  it('renders nothing if there are no reviews', () => {
    const { toJSON } = render(<ReviewsList product={makeProduct([])} />);
    expect(toJSON()).toBeNull();
  });

  it('renders all reviews when provided', () => {
    const product = makeProduct([
      {
        reviewerName: 'John Doe',
        comment: 'Great product!',
        rating: 4,
        date: '2025-08-15T00:00:00.000Z',
      },
      {
        reviewerName: 'Jane Smith',
        comment: 'Not bad',
        rating: 3,
        date: '2025-08-10T00:00:00.000Z',
      },
    ]);

    const { getByText } = render(<ReviewsList product={product} />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();

    expect(getByText('Great product!')).toBeTruthy();
    expect(getByText('Not bad')).toBeTruthy();

    expect(
      getByText(new Date('2025-08-15T00:00:00.000Z').toLocaleDateString()),
    ).toBeTruthy();
    expect(
      getByText(new Date('2025-08-10T00:00:00.000Z').toLocaleDateString()),
    ).toBeTruthy();
  });

  it('renders correct number of stars with yellow color for rating', () => {
    const product = makeProduct([
      {
        reviewerName: 'John Doe',
        comment: 'Amazing!',
        rating: 4,
        date: '2025-08-15T00:00:00.000Z',
      },
    ]);

    const { getAllByText } = render(<ReviewsList product={product} />);

    const stars = getAllByText('★');
    expect(stars).toHaveLength(5);

    expect(stars[0].props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#FFD700' })]),
    );
    expect(stars[3].props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#FFD700' })]),
    );
    expect(stars[4].props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#ccc' })]),
    );
  });
});
