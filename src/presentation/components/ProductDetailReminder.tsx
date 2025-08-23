import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProductReminder } from '../hooks/useProductReminder';
import Icon from './Icon';

interface Props {
  productTitle?: string;
}

const ProductDetailReminder: React.FC<Props> = ({ productTitle }) => {
  const handleReminder = useProductReminder(productTitle);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ¿Quieres que te recordemos comprar este producto en{' '}
        <Text style={styles.bold}>una hora</Text>?
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleReminder}>
        <Icon family="Ionicons" name="alarm-outline" size={24} />
        <Text style={styles.buttonText}>Recordarme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetailReminder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#FFF',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  text: { flex: 1, fontSize: 16, color: '#333' },
  bold: { fontWeight: 'bold' },
  button: {
    maxWidth: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    gap: 8,
  },
  buttonText: { fontSize: 16 },
});
