import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Product } from '../../domain/entities/Product';

type Props = {
  product: Product;
};

export default function ProductDetailDiscountBadge({ product }: Props) {
  const discount = Math.floor(product.discountPercentage);
  if (!discount) return null;
  return (
    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>{discount}% OFF</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'red',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
