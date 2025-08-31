import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../domain/entities/Product';
import Icon from './Icon';
import { memo } from 'react';
import { currency } from '../utils/currency';

const CartItem = memo(
  ({
    item,
    onRemoveItem,
  }: {
    item: { product: Product; quantity: number };
    onRemoveItem: () => void;
  }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Image
          testID="image"
          source={{ uri: item.product.thumbnail }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <View style={styles.itemHeaderContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.product.title}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {item.product.description}
            </Text>
          </View>
          <Text style={styles.price}>{currency(item.product.price)}</Text>
        </View>
        <TouchableOpacity
          testID="remove-button"
          onPress={onRemoveItem}
          style={styles.removeButton}>
          <Icon family="Ionicons" name="trash" size={24} color="#404040" />
        </TouchableOpacity>
      </View>
    );
  },
);

export default CartItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    gap: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 32,
    textAlign: 'center',
  },
  image: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    width: 64,
    height: 64,
  },
  infoContainer: {
    flex: 1,
    gap: 8,
  },
  itemHeaderContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  price: {
    flex: 1,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
