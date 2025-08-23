import { render } from '@testing-library/react-native';
import React from 'react';
import Loading from '../../src/presentation/components/Loading';

describe('Loading', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });
});
