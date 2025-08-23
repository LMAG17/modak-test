import { render } from '@testing-library/react-native';
import React from 'react';
import Loading from './Loading';

describe('Loading', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });
});
