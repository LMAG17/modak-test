import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionWrapper from './SectionWrapper';
import ProductsGrid from './ProductsGrid';
import { HorizontalProductsList } from './ProductsList';
import ProductCarousel from './ProductCarousel';
import { Product } from '../../domain/entities/Product';

interface HomeSectionsProps {
  products?: Product[];
  groceries?: Product[];
  discountProducts?: Product[];
  smartphones?: Product[];
  onPressProduct: (id: number) => void;
  loadingStates: {
    groceries: boolean;
    discounts: boolean;
    products: boolean;
    smartphones: boolean;
  };
  errorStates: {
    groceries: any;
    discounts: any;
    products: any;
    smartphones: any;
  };
}

export default function HomeSections({
  products,
  groceries,
  discountProducts,
  smartphones,
  onPressProduct,
  loadingStates,
  errorStates,
}: HomeSectionsProps) {
  return (
    <View style={styles.container}>
      <SectionWrapper
        title="Mercado"
        isLoading={loadingStates.groceries}
        error={errorStates.groceries}>
        <ProductsGrid products={groceries} onPress={onPressProduct} />
      </SectionWrapper>

      <SectionWrapper
        title="Descuentos"
        isLoading={loadingStates.discounts}
        error={errorStates.discounts}>
        <HorizontalProductsList
          products={discountProducts}
          onPress={onPressProduct}
        />
      </SectionWrapper>

      <SectionWrapper
        title="Lo nuevo"
        isLoading={loadingStates.products}
        error={errorStates.products}>
        <ProductCarousel products={products} onPress={onPressProduct} />
      </SectionWrapper>

      <SectionWrapper
        title="Smartphones"
        isLoading={loadingStates.smartphones}
        error={errorStates.smartphones}>
        <HorizontalProductsList
          products={smartphones}
          onPress={onPressProduct}
        />
      </SectionWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    gap: 16,
  },
});
