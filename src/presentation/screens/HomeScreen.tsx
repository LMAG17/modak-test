import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CategoriesList from '../components/CategoriesList';
import FilterModal from '../components/FilterModal';
import HeaderWithSearch from '../components/HeaderWithSearch';
import HomeLoading from '../components/HomeLoading';
import HomeSections from '../components/HomeSections';
import SearchResultsSection from '../components/SearchResultsSection';
import useHomeData from '../hooks/useHomeData';
import { useAppNavigation } from '../navigation/AppNavigator';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useAppNavigation();
  const {
    selectedCategory,
    search,
    sort,
    setSort,
    onSelectCategory,
    onSearch,
    getSortedProducts,
    isLoadingAll,
    productsQuery,
    categoriesQuery,
    discountQuery,
    smartphonesQuery,
    groceriesQuery,
    searchQuery,
    categoryQuery,
  } = useHomeData();

  const onPressProduct = useCallback(
    (id: number) => navigation.navigate('Detail', { id }),
    [navigation],
  );

  const onFilterPress = useCallback(() => setModalVisible(true), []);

  if (isLoadingAll) return <HomeLoading />;

  const hasSearchResults = Boolean(
    search ? searchQuery.data : selectedCategory,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderWithSearch onSearch={onSearch} isLoading={searchQuery.isLoading} />
      <CategoriesList
        categories={categoriesQuery.data}
        onPressCategory={onSelectCategory}
        selectedCategory={selectedCategory}
      />

      {hasSearchResults ? (
        <SearchResultsSection
          products={getSortedProducts(
            search ? searchQuery.data : categoryQuery.data,
          )}
          onPressProduct={onPressProduct}
          isLoading={searchQuery.isLoading || categoryQuery.isLoading}
          error={searchQuery.isError || categoryQuery.isError}
          onSortPress={onFilterPress}
          sort={sort}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <HomeSections
            products={productsQuery.data}
            groceries={groceriesQuery.data}
            discountProducts={discountQuery.data}
            smartphones={smartphonesQuery.data}
            onPressProduct={onPressProduct}
            loadingStates={{
              groceries: groceriesQuery.isLoading,
              discounts: discountQuery.isLoading,
              products: productsQuery.isLoading,
              smartphones: smartphonesQuery.isLoading,
            }}
            errorStates={{
              groceries: groceriesQuery.isError,
              discounts: discountQuery.isError,
              products: productsQuery.isError,
              smartphones: smartphonesQuery.isError,
            }}
          />
        </ScrollView>
      )}

      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSort={setSort}
      />
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
});
