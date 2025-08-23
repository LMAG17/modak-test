import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Product } from '../../domain/entities/Product';
import { CustomCarousel } from './Carousel';

type Props = {
  product: Product;
};

export default function ProductDetailHeader({ product }: Props) {
  return (
    <View style={styles.imageContainer}>
      <CustomCarousel
        itemsPerPage={1}
        data={product.images}
        renderItem={({ item }) => (
          <Image
            testID="product-image"
            source={{ uri: String(item) }}
            style={styles.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 300,
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});
