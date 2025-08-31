import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Product } from '../../domain/entities/Product';
import BuyButtons from './BuyButtons';
import Icon from './Icon';
import { currency } from '../utils/currency';

type Props = {
  product: Product;
  isAlreadyInCart: boolean;
  onAddToCart: (quantity: number) => void;
  onRemoveFromCart: () => void;
};

export default function ProductDetailBody({
  product,
  isAlreadyInCart,
  onAddToCart,
  onRemoveFromCart,
}: Props) {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.brand}>{product.brand}</Text>

      <View style={styles.mainInformationContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{currency(product.price)}</Text>
      </View>

      <View style={styles.rateContainer}>
        <Icon family="Ionicons" name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>
          <Text style={styles.rating}>{product.rating}</Text> (
          {product.reviews.length} reviews)
        </Text>
      </View>

      <Text style={styles.description}>{product.description}</Text>

      <BuyButtons
        product={product}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
        isAlreadyInCart={isAlreadyInCart}
      />

      <View style={styles.separator} />
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
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
});
