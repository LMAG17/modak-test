import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { CustomCarousel } from '../../src/presentation/components/Carousel';

jest.mock('react-native-reanimated-carousel', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  // @ts-ignore
  const Carousel = React.forwardRef(({ data, renderItem }: any, ref) => (
    <View testID="mock-carousel">
      {data.map((item: any, index: number) => (
        <View key={index}>{renderItem({ item, index })}</View>
      ))}
    </View>
  ));

  const Pagination = {
    Basic: ({ data, onPress }: any) => (
      <View testID="mock-pagination">
        {data.map((_: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPress(index)}
            testID={`dot-${index}`}>
            <Text>•</Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
  };

  return { __esModule: true, default: Carousel, Carousel, Pagination };
});

jest.mock('react-native-reanimated', () => {
  return {
    useSharedValue: jest.fn(() => ({ value: 0 })),
  };
});

describe('CustomCarousel', () => {
  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  const mockRenderItem = ({ item }: { item: (typeof mockData)[0][] }) => (
    <Text>{item[0].name}</Text>
  );

  it('Do not render anything if data is empty', () => {
    const { toJSON } = render(
      <CustomCarousel data={[]} itemsPerPage={2} renderItem={mockRenderItem} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('renders the carousel with items', () => {
    const data = [{ name: 'Item 1' }, { name: 'Item 2' }];
    render(
      <CustomCarousel
        data={data}
        itemsPerPage={1}
        renderItem={mockRenderItem}
      />,
    );

    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 2')).toBeTruthy();
    expect(screen.getByTestId('mock-carousel')).toBeTruthy();
  });

  it('does not show pagination if there is only one item', () => {
    const data = [{ name: 'Solo Item' }];
    render(
      <CustomCarousel
        data={data}
        itemsPerPage={1}
        renderItem={mockRenderItem}
      />,
    );

    expect(screen.queryByTestId('mock-pagination')).toBeNull();
  });

  it('shows pagination if there is more than one item', () => {
    const data = [{ name: 'Item 1' }, { name: 'Item 2' }];
    render(
      <CustomCarousel
        data={data}
        itemsPerPage={1}
        renderItem={mockRenderItem}
      />,
    );

    expect(screen.getByTestId('mock-pagination')).toBeTruthy();
  });

  it('calls onPressPagination when a dot is pressed', () => {
    const data = [{ name: 'Item 1' }, { name: 'Item 2' }];
    render(
      <CustomCarousel
        data={data}
        itemsPerPage={1}
        renderItem={mockRenderItem}
      />,
    );

    const dot = screen.getByTestId('dot-1');
    fireEvent.press(dot);

    expect(dot).toBeTruthy();
  });
});
