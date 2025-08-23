import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Category } from '../../src/domain/entities/Category';
import CategoryItem from '../../src/presentation/components/CategoryItem';

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

  it('adds the selected style', () => {
    const { getByText } = render(
      <CategoryItem category={mockCategory} isSelected={true} />,
    );
    expect(getByText('Technology')).toHaveStyle({ fontWeight: '500' });
  });
});
