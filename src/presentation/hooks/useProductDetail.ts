import { useEffect } from 'react';
import {
  useGetProductByIdQuery,
  useLazyGetProductsByCategoryQuery,
} from '../../data/api/productApi';

export const useProductDetail = (id: number) => {
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(id);

  const [
    getRelatedProducts,
    {
      data: relatedProducts,
      isLoading: isLoadingRelated,
      isError: errorRelated,
    },
  ] = useLazyGetProductsByCategoryQuery();

  useEffect(() => {
    if (product?.category) {
      getRelatedProducts(product.category);
    }
  }, [product?.category, getRelatedProducts]);

  return {
    product,
    isLoading,
    error,
    refetch,
    relatedProducts,
    isLoadingRelated,
    errorRelated,
  };
};
