import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Product } from '../../domain/entities/Product';
import { CustomCarousel } from './Carousel';
import { ProductPage } from './ProductPage';

type Props = {
  products: Product[] | undefined;
  onPress?: (id: number) => void;
};

export default function ProductCarousel({ products, onPress }: Props) {
  return (
    <View style={styles.container}>
      <CustomCarousel
        data={products}
        renderItem={({ item }) => (
          <ProductPage items={item} onPress={onPress} />
        )}
        itemsPerPage={4}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
