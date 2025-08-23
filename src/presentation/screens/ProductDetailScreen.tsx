import { RouteProp, useRoute } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useGetProductByIdQuery,
  useLazyGetProductsByCategoryQuery,
} from '../../data/api/productApi';
import { triggerNotification } from '../../domain/usecases/triggerNotification';
import DetailLoading from '../components/DetailLoading';
import Icon from '../components/Icon';
import ProductDetailBody from '../components/ProductDetailBody';
import ProductDetailDiscountBadge from '../components/ProductDetailDiscountBadge';
import ProductDetailHeader from '../components/ProductDetailHeader';
import { HorizontalProductsList } from '../components/ProductsList';
import ReviewsList from '../components/ReviewsList';
import SectionWrapper from '../components/SectionWrapper';
import { addProductReminder } from '../nativeModules/addProductReminder';
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

  const handleReminder = async () => {
    try {
      await addProductReminder(
        `Recordatorio para comprar ${product?.title}`,
        new Date(Date.now() + 1 * 60 * 60 * 1000),
      );
      triggerNotification({
        title: `Recordatorio para comprar ${product?.title}`,
        body: 'Se ha creado un evento en tu calendario',
      });
    } catch (error) {
      triggerNotification({
        title: `Error al crear recordatorio`,
        body: 'No se pudo crear evento en tu calendario',
      });
    }
  };

  if (isLoading) return <DetailLoading />;
  if (error) return <Text style={styles.error}>Error loading product</Text>;
  if (!product) return <Text style={styles.error}>No product found</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProductDetailHeader product={product} />
        <ProductDetailBody product={product} />
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
      <View style={styles.reminderContainer}>
        <Text style={styles.reminderText}>
          ¿Quieres que te recordemos comprar este producto en{' '}
          <Text style={styles.boldText}>una hora</Text>?
        </Text>
        <TouchableOpacity
          style={styles.reminderButton}
          onPress={handleReminder}>
          <Icon family="Ionicons" name="alarm-outline" size={24} />
          <Text style={styles.reminderText}>Recordarme</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default memo(ProductDetailScreen);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
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
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#FFF',
    paddingBottom: 16,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reminderText: {
    flex: 1,

    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  reminderButton: {
    maxWidth: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    gap: 8,
  },
  reminderButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});
