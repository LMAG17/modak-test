import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import SectionWrapper from '../../src/presentation/components/SectionWrapper';

jest.mock('../../src/presentation/components/Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

jest.mock('../../src/presentation/components/Loading', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return function MockLoading() {
    return <Text>Loading...</Text>;
  };
});

describe('SectionWrapper', () => {
  it('shows loading state', () => {
    render(
      <SectionWrapper title="Users" isLoading>
        <Text>Child</Text>
      </SectionWrapper>,
    );

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('shows error state when error is true', () => {
    render(
      <SectionWrapper title="Users" error>
        <Text>Child</Text>
      </SectionWrapper>,
    );

    expect(screen.getByText('Error loading Users')).toBeTruthy();
  });

  it('renders title and children when not loading or error', () => {
    render(
      <SectionWrapper title="Users">
        <Text>Child content</Text>
      </SectionWrapper>,
    );

    expect(screen.getByText('Users')).toBeTruthy();
    expect(screen.getByText('Child content')).toBeTruthy();
  });

  it('applies the style passed via props', () => {
    const { getByTestId } = render(
      <SectionWrapper title="Styled" style={{ backgroundColor: 'red' }}>
        <Text>Child</Text>
      </SectionWrapper>,
    );

    const container = getByTestId('SectionWrapperContainer');
    expect(container.props.style).toEqual(
      expect.objectContaining({ backgroundColor: 'red' }),
    );
  });
});
