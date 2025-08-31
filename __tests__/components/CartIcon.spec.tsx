import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import CartIcon from '../../src/presentation/components/CartIcon';

jest.mock('../../src/presentation/components/Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

const mockNavigate = jest.fn();
jest.mock('../../src/presentation/navigation/AppNavigator', () => ({
  useAppNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../../src/presentation/store', () => ({
  useAppSelector: (fn: any) =>
    fn({
      cart: {
        items: mockStoreItems,
      },
    }),
}));

let mockStoreItems: any[] = [];

describe('CartIcon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStoreItems = [];
  });

  it('not render if cart is empty', () => {
    mockStoreItems = [];
    const { queryByTestId } = render(<CartIcon style={{}} />);
    expect(queryByTestId('cart-icon')).toBeNull();
  });

  it('render the right number in the counter', () => {
    mockStoreItems = [{ id: 1 }, { id: 2 }];
    const { getByText } = render(<CartIcon style={{}} />);
    expect(getByText('2')).toBeTruthy();
  });

  it('navigate to cart screen', () => {
    mockStoreItems = [{ id: 1 }];
    const { getByText } = render(<CartIcon style={{}} />);
    fireEvent.press(getByText('1'));
    expect(mockNavigate).toHaveBeenCalledWith('Cart');
  });
});
