import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartFooter from '../../src/presentation/components/CartFooter';
import { currency } from '../../src/presentation/utils/currency';

describe('CartFooter', () => {
  it('muestra el total correctamente formateado', () => {
    const total = 1234.56;
    const { getByText } = render(
      <CartFooter total={total} onBuyConfirm={jest.fn()} />,
    );

    expect(getByText('Total:')).toBeTruthy();
    expect(getByText(currency(total))).toBeTruthy();
  });

  it('renderiza el botón de comprar', () => {
    const { getByText } = render(
      <CartFooter total={100} onBuyConfirm={jest.fn()} />,
    );

    expect(getByText('Comprar')).toBeTruthy();
  });

  it('ejecuta onBuyConfirm al presionar el botón', () => {
    const mockOnBuyConfirm = jest.fn();
    const { getByText } = render(
      <CartFooter total={200} onBuyConfirm={mockOnBuyConfirm} />,
    );

    fireEvent.press(getByText('Comprar'));
    expect(mockOnBuyConfirm).toHaveBeenCalledTimes(1);
  });
});
