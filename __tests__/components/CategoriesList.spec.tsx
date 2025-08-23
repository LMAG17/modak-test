import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Category } from '../../src/domain/entities/Category';
import CategoriesList from '../../src/presentation/components/CategoriesList';

jest.mock('../../src/presentation/components/CategoryItem', () => {
  const React = require('react');
  const { Button } = require('react-native');
  return ({ category, onPress }: any) => {
    return (
      <Button
        title={category.name}
        onPress={() => onPress?.(category.slug)}
        testID={`category-${category.slug}`}
      />
    );
  };
});

describe('CategoriesList', () => {
  const selectedCategory = 'tech';
  const mockCategories: Category[] = [
    { url: 'https://example.com/tech', name: 'Tech', slug: 'tech' },
    { url: 'https://example.com/sports', name: 'Sports', slug: 'sports' },
  ] as Category[];

  it('renders correctly', () => {
    const { toJSON } = render(
      <CategoriesList categories={[]} selectedCategory={selectedCategory} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the list of categories', () => {
    const { getByText } = render(
      <CategoriesList
        categories={mockCategories}
        selectedCategory={selectedCategory}
      />,
    );
    expect(getByText('Tech')).toBeTruthy();
    expect(getByText('Sports')).toBeTruthy();
  });

  it('calls onPressCategory when a category is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <CategoriesList
        selectedCategory={selectedCategory}
        categories={mockCategories}
        onPressCategory={mockOnPress}
      />,
    );

    fireEvent.press(getByTestId('category-tech'));
    expect(mockOnPress).toHaveBeenCalledWith('tech');
  });
});
