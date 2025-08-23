import React from 'react';
import { View } from 'react-native';
import Icon from './Icon';

type RatingProps = {
  value: number;
};

export default function RatingStars({ value }: RatingProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          testID="rating-star"
          key={index}
          family="Ionicons"
          name={index < value ? 'star' : 'star-outline'}
          size={20}
          color={index < value ? 'gold' : 'gray'}
        />
      ))}
    </View>
  );
}
