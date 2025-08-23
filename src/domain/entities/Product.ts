export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  brand: string;
  rating: number;
  stock: number;
  category: string;
  discountPercentage: number;
  images: string[];
  reviews: Review[];
}

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
