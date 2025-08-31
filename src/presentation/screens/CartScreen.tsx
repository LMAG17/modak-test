import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartFooter from '../components/CartFooter';
import CartItem from '../components/CartItem';
import { useAppNavigation } from '../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../store';
import { clearCart, removeFromCart } from '../store/slices/cartSlice';

export default function CartScreen() {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);
  const total = useMemo(() => {
    return items.reduce(
      (prev, curr) => prev + curr.product.price * curr.quantity,
      0,
    );
  }, [items]);

  const onBuyConfirm = useCallback(() => {
    dispatch(clearCart());
    navigation.reset({
      routes: [
        {
          name: 'Home',
        },
      ],
    });
  }, [dispatch, clearCart]);

  const onRemoveItem = useCallback(
    (productId: number) => {
      if (items.length === 1) {
        onBuyConfirm();
      } else {
        dispatch(removeFromCart(productId));
      }
    },
    [dispatch, removeFromCart],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.list}
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemoveItem={() => onRemoveItem(item.product.id)}
          />
        )}
        keyExtractor={item => item?.product?.id?.toString()}
      />
      <CartFooter total={total} onBuyConfirm={onBuyConfirm} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  list: {
    gap: 8,
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingBottom: 48,
  },
});
