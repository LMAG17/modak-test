import { render } from '@testing-library/react-native';
import React from 'react';
import RatingStars from '../../src/presentation/components/RatingStars';

jest.mock('../../src/presentation/components/Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name, testID }: { name: string; testID: string }) => (
    <Text testID={testID} name={name}>
      {name}
    </Text>
  );
});

describe('RatingStars', () => {
  it('renders five stars', () => {
    const { getAllByTestId } = render(<RatingStars value={0} />);
    expect(getAllByTestId('rating-star')).toHaveLength(5);
  });

  it('shows the correct number of filled stars', () => {
    const { getAllByTestId } = render(<RatingStars value={3} />);
    const stars = getAllByTestId('rating-star');

    expect(stars[0].props.name).toBe('star');
    expect(stars[1].props.name).toBe('star');
    expect(stars[2].props.name).toBe('star');
    expect(stars[3].props.name).toBe('star-outline');
    expect(stars[4].props.name).toBe('star-outline');
  });

  it('renders all stars as "star-outline" when value = 0', () => {
    const { getAllByTestId } = render(<RatingStars value={0} />);
    getAllByTestId('rating-star').forEach(star => {
      expect(star.props.name).toBe('star-outline');
    });
  });

  it('renders all stars as "star" when value = 5', () => {
    const { getAllByTestId } = render(<RatingStars value={5} />);
    getAllByTestId('rating-star').forEach(star => {
      expect(star.props.name).toBe('star');
    });
  });
});
