import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { useAppNavigation } from '../navigation/AppNavigator';
import { useAppSelector } from '../store';
import Icon from './Icon';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default function CartIcon({ style }: Props) {
  const navigation = useAppNavigation();
  const { items } = useAppSelector(state => state.cart);
  if (items.length < 1) return null;
  return (
    <TouchableOpacity
      style={[styles.cartIcon, style]}
      onPress={() => navigation.navigate('Cart')}>
      <Text style={styles.cartCount}>{items.length}</Text>
      <Icon family="Ionicons" name="cart-outline" size={20} color="#888" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
