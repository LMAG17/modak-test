import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Product } from '../../domain/entities/Product';
import Icon from './Icon';

type Props = {
  product: Product;
};

export default function ProductDetailBody({ product }: Props) {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.brand}>{product.brand}</Text>

      <View style={styles.mainInformationContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      <View style={styles.rateContainer}>
        <Icon family="Ionicons" name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>
          <Text style={styles.rating}>{product.rating}</Text> (
          {product.reviews.length} reviews)
        </Text>
      </View>

      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    gap: 12,
    marginVertical: 12,
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  mainInformationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 6,
  },
  rating: {
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
