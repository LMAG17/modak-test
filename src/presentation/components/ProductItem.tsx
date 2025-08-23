import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { Product } from '../../domain/entities/Product';

type Props = {
  product: Product;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ProductItem({ product, onPress, style }: Props) {
  const discountPercentage = Math.floor(product.discountPercentage);
  return (
    <TouchableOpacity
      testID="touchable"
      key={product.id}
      style={[styles.card, style]}
      onPress={onPress}>
      <Image
        testID="product-image"
        source={{ uri: product.thumbnail }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.text}>
          {product.title}
        </Text>
        <Text numberOfLines={1} style={styles.brand}>
          {product.brand ?? product.description}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        {!!discountPercentage && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          </View>
        )}
        <Text style={styles.priceText}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 16,
    paddingVertical: 12,
  },
  image: {
    width: 80,
    height: 50,
    borderRadius: 12,
    objectFit: 'contain',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
  },
  text: {
    height: 16,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  brand: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    marginRight: 12,
    alignItems: 'flex-end',
  },
  discountBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  discountText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});
