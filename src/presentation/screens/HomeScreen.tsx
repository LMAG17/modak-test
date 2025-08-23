import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useGetCategoriesQuery,
  useGetDiscountProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
  useLazyGetProductsByCategoryQuery,
  useLazyGetSearchProductsQuery,
} from '../../data/api/productApi';
import CategoriesList from '../components/CategoriesList';
import HeaderWithSearch from '../components/HeaderWithSearch';
import ProductCarousel from '../components/ProductCarousel';
import ProductsGrid from '../components/ProductsGrid';
import { HorizontalProductsList } from '../components/ProductsList';
import SectionWrapper from '../components/SectionWrapper';
import { useAppNavigation } from '../navigation/AppNavigator';
import ProductResultsList from '../components/ProductResultsList';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const navigation = useAppNavigation();
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: errorProducts,
  } = useGetProductsQuery();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: errorCategories,
  } = useGetCategoriesQuery();
  const {
    data: discountProducts,
    isLoading: isLoadingDiscountProducts,
    isError: errorDiscountProducts,
  } = useGetDiscountProductsQuery();
  const {
    data: smartPhonesData,
    isLoading: isLoadingSmartPhones,
    isError: errorSmartPhones,
  } = useGetProductsByCategoryQuery('smartphones');
  const {
    data: groceriesProductsData,
    isLoading: isLoadingGroceriesProducts,
    isError: errorGroceriesProducts,
  } = useGetProductsByCategoryQuery('groceries');

  const [
    getSearchProducts,
    {
      data: searchProducts,
      isLoading: isLoadingSearchProducts,
      isError: errorSearchProducts,
    },
  ] = useLazyGetSearchProductsQuery();

  const [
    getProductsByCategory,
    {
      data: productsByCategory,
      isLoading: isLoadingProductsByCategory,
      isError: errorProductsByCategory,
    },
  ] = useLazyGetProductsByCategoryQuery();

  const onPressProduct = (id: number) => {
    navigation.navigate('Detail', { id });
  };

  const onPressCategory = (slug: string) => {
    getProductsByCategory(slug);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    getSearchProducts(query);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderWithSearch
        onSearch={handleSearch}
        isLoading={isLoadingSearchProducts}
        error={errorSearchProducts}
      />

      {!!search || !!productsByCategory ? (
        <SectionWrapper
          title="Resultados de búsqueda"
          isLoading={isLoadingSearchProducts ?? isLoadingProductsByCategory}
          error={errorSearchProducts ?? errorProductsByCategory}
          style={styles.resultsContainer}>
          <ProductResultsList
            products={searchProducts ?? productsByCategory}
            onPress={onPressProduct}
          />
        </SectionWrapper>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
              <SectionWrapper
                title="Categorias"
                isLoading={isLoadingCategories}
                error={errorCategories}>
                <CategoriesList
                  categories={categories}
                  onPressCategory={onPressCategory}
                />
              </SectionWrapper>
              <SectionWrapper
                title="Mercado"
                isLoading={isLoadingGroceriesProducts}
                error={errorGroceriesProducts}>
                <ProductsGrid
                  products={groceriesProductsData}
                  onPress={onPressProduct}
                />
              </SectionWrapper>
              <SectionWrapper
                title="Descuentos"
                isLoading={isLoadingDiscountProducts}
                error={errorDiscountProducts}>
                <HorizontalProductsList
                  products={discountProducts}
                  onPress={onPressProduct}
                />
              </SectionWrapper>
              <SectionWrapper
                title="Lo nuevo"
                isLoading={isLoadingProducts}
                error={errorProducts}>
                <ProductCarousel products={products} onPress={onPressProduct} />
              </SectionWrapper>
              <SectionWrapper
                title="Smartphones"
                isLoading={isLoadingSmartPhones}
                error={errorSmartPhones}>
                <HorizontalProductsList
                  products={smartPhonesData}
                  onPress={onPressProduct}
                />
              </SectionWrapper>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flexGrow: 1,
    gap: 16,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
