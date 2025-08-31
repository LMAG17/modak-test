import { StyleSheet, View } from 'react-native';
import { Product } from '../../domain/entities/Product';
import ProductItem from './ProductItem';
import { memo } from 'react';

type ProductPageProps = {
  items: Product[];
  onPress?: (id: number) => void;
};

function ProductPage({ items, onPress }: ProductPageProps) {
  return (
    <View style={styles.page}>
      {items.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onPress={() => onPress?.(product.id)}
        />
      ))}
    </View>
  );
}

export default memo(ProductPage);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 16,
    gap: 8,
  },
});
