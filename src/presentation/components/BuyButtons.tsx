import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import { Product } from '../../domain/entities/Product';

type Props = {
  product: Product;
  isAlreadyInCart: boolean;
  onAddToCart: (quantity: number) => void;
  onRemoveFromCart: () => void;
};

export default function BuyButtons({
  product,
  isAlreadyInCart,
  onAddToCart,
  onRemoveFromCart,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <View>
      {isAlreadyInCart ? (
        <TouchableOpacity
          style={[styles.button, styles.removeButton]}
          onPress={onRemoveFromCart}>
          <Icon family="Ionicons" name="trash-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Quitar del carrito</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              testID="remove-button"
              style={styles.touchableArea}
              disabled={quantity === 1}
              onPress={() => setQuantity(quantity - 1)}
              onLongPress={() => setQuantity(1)}>
              <Icon family="Ionicons" name="remove" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              testID="add-button"
              style={styles.touchableArea}
              disabled={quantity === product.stock}
              onPress={() => setQuantity(quantity + 1)}
              onLongPress={() => setQuantity(product.stock)}>
              <Icon family="Ionicons" name="add" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={() => onAddToCart(quantity)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.stockText}>Stock available: {product.stock}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 2,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#58C512',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F4F4F4',
    gap: 8,
    borderRadius: 8,
  },
  touchableArea: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  stockText: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
});
