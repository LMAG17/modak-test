import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Product } from '../../src/domain/entities/Product';
import ProductCard from '../../src/presentation/components/ProductCard';

describe('ProductCard', () => {
  const product: Product = {
    id: 1,
    title: 'iPhone 15',
    description: 'Smartphone',
    price: 1200,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    brand: 'Apple',
    category: 'phones',
    thumbnail: 'https://example.com/iphone.jpg',
    images: [],
    reviews: [],
  };

  it('renders the product information correctly', () => {
    const { getByText } = render(<ProductCard product={product} />);

    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('iPhone 15')).toBeTruthy();
    expect(getByText('$1200')).toBeTruthy();
    expect(getByText('10% OFF')).toBeTruthy();
  });

  it('calls onPress when the card is pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ProductCard product={product} onPress={onPressMock} />,
    );

    fireEvent.press(getByTestId('product-card'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
