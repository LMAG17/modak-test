import React from 'react';
import { StyleSheet } from 'react-native';
import { Product } from '../../domain/entities/Product';
import ProductResultsList from './ProductResultsList';
import SectionWrapper from './SectionWrapper';
import { SortOption } from './FilterModal';

interface Props {
  products: Product[];
  onPressProduct: (id: number) => void;
  isLoading: boolean;
  error?: boolean;
  sort?: SortOption | null;
  onSortPress: () => void;
}

export default function SearchResultsSection({
  products,
  onPressProduct,
  isLoading,
  error,
  onSortPress,
  sort,
}: Props) {
  return (
    <SectionWrapper
      title="Resultados de búsqueda"
      isLoading={isLoading}
      error={error}
      style={styles.container}>
      <ProductResultsList
        sort={sort}
        products={products}
        onPress={onPressProduct}
        onSortPress={onSortPress}
      />
    </SectionWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});
