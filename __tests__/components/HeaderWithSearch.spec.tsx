import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import HeaderWithSearch from '../../src/presentation/components/HeaderWithSearch';

jest.mock('../../src/presentation/components/Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

describe('HeaderWithSearch', () => {
  it('renders the title correctly', () => {
    render(<HeaderWithSearch onSearch={() => {}} isLoading={false} />);
    expect(screen.getByText('Modak Test')).toBeTruthy();
  });

  it('shows the search icon when not loading', () => {
    render(<HeaderWithSearch onSearch={() => {}} isLoading={false} />);
    expect(screen.getByText('search')).toBeTruthy();
  });

  it('shows the loader icon when isLoading is true', () => {
    render(<HeaderWithSearch onSearch={() => {}} isLoading={true} />);
    expect(screen.getByText('loader')).toBeTruthy();
  });

  it('calls onSearch when typing in the input', () => {
    const mockOnSearch = jest.fn();
    render(<HeaderWithSearch onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText('Buscar productos...');
    fireEvent.changeText(input, 'zapatos');

    expect(mockOnSearch).toHaveBeenCalledWith('zapatos');
  });
});
