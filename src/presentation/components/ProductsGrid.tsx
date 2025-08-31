import React from 'react';
import { View } from 'react-native';
import { Product } from '../../domain/entities/Product';
import { CustomCarousel } from './Carousel';
import ProductGridItem from './ProductGridItem';

type Props = {
  products?: Product[];
  onPress?: (id: number) => void;
};

export default function ProductsGrid({ products, onPress }: Props) {
  return (
    <View>
      <CustomCarousel
        data={products}
        itemsPerPage={9}
        renderItem={({ item }) => (
          <ProductGridItem item={item} onPress={onPress} />
        )}
      />
    </View>
  );
}
