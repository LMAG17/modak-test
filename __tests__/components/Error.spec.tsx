import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Error from '../../src/presentation/components/Error';

jest.mock('../../src/presentation/components/Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

describe('Error', () => {
  it('renders the error', () => {
    const { getByText } = render(<Error message="An error occurred" />);
    expect(getByText('An error occurred')).toBeTruthy();
  });
  it('renders the default message when no message is provided', () => {
    const { getByText } = render(<Error message="Error" />);
    expect(getByText('Error')).toBeTruthy();
  });

  it('Render refresh button and it works', () => {
    const refresh = jest.fn();
    const { getByText } = render(
      <Error message="An error occurred" onRefresh={refresh} />,
    );
    const refreshButton = getByText('Reintentar');
    expect(refreshButton).toBeTruthy();
    fireEvent.press(refreshButton);
    expect(refresh).toHaveBeenCalledTimes(1);
  });
});
