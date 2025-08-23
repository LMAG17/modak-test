import { useState, useCallback, useMemo } from 'react';
import {
  useGetCategoriesQuery,
  useGetDiscountProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
  useLazyGetProductsByCategoryQuery,
  useLazyGetSearchProductsQuery,
} from '../../data/api/productApi';
import { Product } from '../../domain/entities/Product';
import { SortOption } from '../components/FilterModal';

export default function useHomeData() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption | null>(null);

  const productsQuery = useGetProductsQuery();
  const categoriesQuery = useGetCategoriesQuery();
  const discountQuery = useGetDiscountProductsQuery();
  const smartphonesQuery = useGetProductsByCategoryQuery('smartphones');
  const groceriesQuery = useGetProductsByCategoryQuery('groceries');

  const [getSearchProducts, searchQuery] = useLazyGetSearchProductsQuery();
  const [getProductsByCategory, categoryQuery] =
    useLazyGetProductsByCategoryQuery();

  const onSelectCategory = useCallback(
    (slug: string) => {
      if (slug !== selectedCategory) {
        setSearch('');
        getProductsByCategory(slug);
        setSelectedCategory(slug);
      } else {
        setSelectedCategory(null);
      }
    },
    [getProductsByCategory, selectedCategory],
  );

  const onSearch = useCallback(
    (query: string) => {
      setSelectedCategory(null);
      setSort(null);
      setSearch(query);
      getSearchProducts(query);
    },
    [getSearchProducts],
  );

  const getSortedProducts = useCallback(
    (products: Product[] | undefined) => {
      if (!products) return [];
      let sorted = [...products];
      switch (sort) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'rating-asc':
          sorted.sort((a, b) => a.rating - b.rating);
          break;
        case 'rating-desc':
          sorted.sort((a, b) => b.rating - a.rating);
          break;
      }
      return sorted;
    },
    [sort],
  );

  const isLoadingAll = useMemo(
    () =>
      [
        productsQuery.isLoading,
        categoriesQuery.isLoading,
        discountQuery.isLoading,
        smartphonesQuery.isLoading,
        groceriesQuery.isLoading,
        searchQuery.isLoading,
        categoryQuery.isLoading,
      ].some(Boolean),
    [
      productsQuery.isLoading,
      categoriesQuery.isLoading,
      discountQuery.isLoading,
      smartphonesQuery.isLoading,
      groceriesQuery.isLoading,
      searchQuery.isLoading,
      categoryQuery.isLoading,
    ],
  );

  return {
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
  };
}
