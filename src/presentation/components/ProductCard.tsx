import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../../domain/entities/Product';
import Icon from './Icon';

interface Props {
  product: Product;
  onPress?: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  const discount = Math.floor(product.discountPercentage);
  return (
    <TouchableOpacity
      testID="product-card"
      onPress={onPress}
      style={styles.card}>
      <View style={styles.imageHeader}>
        <Icon family="Ionicons" name="heart-outline" color="#404040" />
        {!!discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        )}
      </View>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.info}>
        <View>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.iconContainer}>
            <Icon family="Entypo" name="plus" color="#FFF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: 180,
    alignItems: 'stretch',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 4,
  },
  imageHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountBadge: {
    backgroundColor: 'red',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    height: 100,
    width: '100%',
    borderRadius: 8,
    objectFit: 'contain',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  brand: {
    fontSize: 12,
    color: '#404040',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    paddingLeft: 8,
    borderRadius: 32,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 8,
    paddingRight: 8,
  },
  iconContainer: {
    padding: 4,
    backgroundColor: 'black',
    borderRadius: 16,
  },
});
