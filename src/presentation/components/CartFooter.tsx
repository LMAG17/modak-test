import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { currency } from '../utils/currency';

type Props = {
  total: number;
  onBuyConfirm: () => void;
};

function CartFooter({ onBuyConfirm, total }: Props) {
  return (
    <View style={styles.checkoutContainer}>
      <View style={styles.checkoutPriceContainer}>
        <Text style={styles.title}>Total:</Text>
        <Text style={styles.total}>{currency(total)}</Text>
      </View>
      <TouchableOpacity style={styles.buyButton} onPress={onBuyConfirm}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(CartFooter);

const styles = StyleSheet.create({
  checkoutContainer: {
    padding: 16,
    gap: 16,
  },
  checkoutPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    flex: 1,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    textAlign: 'right',
  },
  buyButton: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#58C512',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
