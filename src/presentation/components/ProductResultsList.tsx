import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Product } from '../../domain/entities/Product';
import { ProductItem } from './ProductItem';

type Props = {
  products?: Product[];
  onPress?: (id: number) => void;
};

export default function ProductResultsList({ products, onPress }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() => onPress?.(item.id)}
            style={styles.item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    gap: 8,
    padding: 8,
    alignItems: 'stretch',
  },
  item: {
    width: '100%',
  },
});
