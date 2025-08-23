import { RouteProp, useRoute } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import {
  useGetProductByIdQuery,
  useLazyGetProductsByCategoryQuery,
} from '../../data/api/productApi';
import Loading from '../components/Loading';
import ProductDetailDiscountBadge from '../components/ProductDetailDiscountBadge';
import ProductDetailHeader from '../components/ProductDetailHeader';
import { HorizontalProductsList } from '../components/ProductsList';
import ReviewsList from '../components/ReviewsList';
import SectionWrapper from '../components/SectionWrapper';
import {
  RootStackParamList,
  useAppNavigation,
} from '../navigation/AppNavigator';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const ProductDetailScreen = () => {
  const navigation = useAppNavigation();
  const {
    params: { id },
  } = useRoute<DetailRouteProp>();

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const [
    getRelatedProducts,
    {
      data: relatedProducts,
      isLoading: isLoadingRelatedProducts,
      isError: errorRelatedProducts,
    },
  ] = useLazyGetProductsByCategoryQuery();

  useEffect(() => {
    if (product?.category) {
      getRelatedProducts(product.category);
    }
  }, [product?.category, getRelatedProducts]);

  useLayoutEffect(() => {
    if (product?.title) {
      navigation.setOptions({ title: product.title });
    }
  }, [product?.title, navigation]);

  const handlePressProduct = useCallback(
    (id: number) => {
      navigation.push('Detail', { id });
    },
    [navigation],
  );

  if (isLoading) return <Loading />;
  if (error) return <Text style={styles.error}>Error loading product</Text>;
  if (!product) return <Text style={styles.error}>No product found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ProductDetailHeader product={product} />

      <ProductDetailDiscountBadge product={product} />

      <SectionWrapper title="Opiniones">
        <ReviewsList product={product} />
      </SectionWrapper>

      <SectionWrapper
        title="Productos similares"
        isLoading={isLoadingRelatedProducts}
        error={errorRelatedProducts}>
        <HorizontalProductsList
          products={relatedProducts}
          onPress={handlePressProduct}
        />
      </SectionWrapper>
    </ScrollView>
  );
};

export default memo(ProductDetailScreen);

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  error: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'red',
  },
});
