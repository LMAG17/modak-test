import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryItem from './CategoryItem';
import { Category } from '../../domain/entities/Category';

describe('CategoryItem', () => {
  const mockCategory: Category = {
    url: 'https://example.com/technology',
    name: 'Technology',
    slug: 'technology',
  };

  it('renders the category name', () => {
    const { getByText } = render(<CategoryItem category={mockCategory} />);
    expect(getByText('Technology')).toBeTruthy();
  });

  it('calls onPress with the correct slug when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <CategoryItem category={mockCategory} onPress={mockOnPress} />,
    );

    fireEvent.press(getByText('Technology'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith('technology');
  });

  it('does not throw if onPress is not passed', () => {
    const { getByText } = render(<CategoryItem category={mockCategory} />);
    expect(() => {
      fireEvent.press(getByText('Technology'));
    }).not.toThrow();
  });
});
