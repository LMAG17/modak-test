import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Product } from '../../domain/entities/Product';
import { sortToString } from '../utils/sortOptionToString';
import { SortOption } from './FilterModal';
import ProductItem from './ProductItem';

type Props = {
  products?: Product[];
  onPress?: (id: number) => void;
  sort?: SortOption | null;
  onSortPress?: () => void;
};

export default function ProductResultsList({
  products,
  onPress,
  onSortPress,
  sort,
}: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Resultados encontrados ({products?.length})
            </Text>
            <TouchableOpacity onPress={onSortPress}>
              <Text style={styles.sortText}>
                {sort ? sortToString(sort) : 'Ordenar por'}
              </Text>
            </TouchableOpacity>
          </View>
        }
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  headerText: {
    fontSize: 16,
  },
  sortText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
