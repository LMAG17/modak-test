import { Product } from '../../domain/entities/Product';

export const mapApiProductToEntity = (apiProduct: any): Product => ({
  id: apiProduct.id,
  title: apiProduct.title,
  price: apiProduct.price,
  thumbnail: apiProduct.thumbnail,
  description: apiProduct.description,
  brand: apiProduct.brand,
  rating: apiProduct.rating,
  stock: apiProduct.stock,
  category: apiProduct.category,
  discountPercentage: apiProduct.discountPercentage,
  images: apiProduct.images,
  reviews: apiProduct.reviews.map((review: any) => ({
    rating: review.rating,
    comment: review.comment,
    date: review.date,
    reviewerName: review.reviewerName,
    reviewerEmail: review.reviewerEmail,
  })),
});
