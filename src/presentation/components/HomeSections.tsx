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
  refetchFunctions: {
    groceries: () => void;
    discounts: () => void;
    products: () => void;
    smartphones: () => void;
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
  refetchFunctions,
}: HomeSectionsProps) {
  return (
    <View style={styles.container}>
      <SectionWrapper
        title="Mercado"
        isLoading={loadingStates.groceries}
        error={errorStates.groceries}
        refetch={refetchFunctions.groceries}>
        <ProductsGrid products={groceries} onPress={onPressProduct} />
      </SectionWrapper>

      <SectionWrapper
        title="Descuentos"
        isLoading={loadingStates.discounts}
        error={errorStates.discounts}
        refetch={refetchFunctions.discounts}>
        <HorizontalProductsList
          products={discountProducts}
          onPress={onPressProduct}
        />
      </SectionWrapper>

      <SectionWrapper
        title="De todo un poco"
        isLoading={loadingStates.products}
        error={errorStates.products}
        refetch={refetchFunctions.products}>
        <ProductCarousel products={products} onPress={onPressProduct} />
      </SectionWrapper>

      <SectionWrapper
        title="Smartphones"
        isLoading={loadingStates.smartphones}
        error={errorStates.smartphones}
        refetch={refetchFunctions.smartphones}>
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
