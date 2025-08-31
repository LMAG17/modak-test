import { RouteProp, useRoute } from '@react-navigation/native';
import React, { memo, useCallback, useLayoutEffect, useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import DetailLoading from '../components/DetailLoading';
import Error from '../components/Error';
import ProductDetailBody from '../components/ProductDetailBody';
import ProductDetailDiscountBadge from '../components/ProductDetailDiscountBadge';
import ProductDetailHeader from '../components/ProductDetailHeader';
import ProductDetailReminder from '../components/ProductDetailReminder';
import { HorizontalProductsList } from '../components/ProductsList';
import ReviewsList from '../components/ReviewsList';
import SectionWrapper from '../components/SectionWrapper';
import { useProductDetail } from '../hooks/useProductDetail';
import {
  RootStackParamList,
  useAppNavigation,
} from '../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../store';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const ProductDetailScreen = () => {
  const { items } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const {
    params: { id },
  } = useRoute<DetailRouteProp>();

  const {
    product,
    isLoading,
    error,
    refetch,
    relatedProducts,
    isLoadingRelated,
    errorRelated,
  } = useProductDetail(id);

  useLayoutEffect(() => {
    if (product?.title) navigation.setOptions({ title: product.title });
  }, [product?.title, navigation]);

  const isAlreadyInCart = useMemo(
    () => items.some(item => item.product.id === product?.id),
    [items, product?.id],
  );

  const handlePressProduct = useCallback(
    (id: number) => navigation.push('Detail', { id }),
    [navigation],
  );

  const onAddToCart = useCallback(
    (quantity: number) => {
      dispatch(addToCart({ product: product!, quantity }));
    },
    [dispatch, product],
  );

  const onRemoveFromCart = useCallback(() => {
    dispatch(removeFromCart(product!.id));
  }, [dispatch, product]);

  if (isLoading) return <DetailLoading />;

  if (error)
    return (
      <Error
        message="Ha ocurrido un error cargando el producto"
        onRefresh={refetch}
      />
    );

  if (!product) return <Text style={styles.error}>Producto no encontrado</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProductDetailHeader product={product} />
        <ProductDetailBody
          product={product}
          onAddToCart={onAddToCart}
          isAlreadyInCart={isAlreadyInCart}
          onRemoveFromCart={onRemoveFromCart}
        />
        <ProductDetailDiscountBadge product={product} />

        <SectionWrapper title="Opiniones">
          <ReviewsList product={product} />
        </SectionWrapper>

        <SectionWrapper
          title="Productos similares"
          isLoading={isLoadingRelated}
          error={errorRelated}>
          <HorizontalProductsList
            products={relatedProducts}
            onPress={handlePressProduct}
          />
        </SectionWrapper>
      </ScrollView>

      <ProductDetailReminder productTitle={product.title} />
    </SafeAreaView>
  );
};

export default memo(ProductDetailScreen);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  scrollView: { flexGrow: 1, padding: 16, backgroundColor: '#FFF' },
  error: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'red',
  },
});
