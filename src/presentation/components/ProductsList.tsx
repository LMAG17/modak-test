import { FlatList, StyleSheet, View } from 'react-native';
import { Product } from '../../domain/entities/Product';
import ProductCard from './ProductCard';

type Props = {
  products: Product[] | undefined;
  onPress?: (id: number) => void;
};

export const HorizontalProductsList = ({ products, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={products}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ gap: 16, paddingVertical: 8 }}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => onPress?.(item.id)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
