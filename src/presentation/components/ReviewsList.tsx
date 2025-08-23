import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Product } from '../../domain/entities/Product';

type Props = {
  product: Product;
};

const ReviewsList: React.FC<Props> = ({ product }) => {
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Text
        key={i}
        style={[styles.star, { color: i < rating ? '#FFD700' : '#ccc' }]}>
        ★
      </Text>
    ));
  if (product.reviews.length < 1) return null;
  return (
    <View style={styles.listContainer}>
      {product.reviews.map((review, index) => (
        <View style={styles.reviewCard} key={`review-${review.date}-${index}`}>
          <View style={styles.header}>
            <Text style={styles.reviewerName}>{review.reviewerName}</Text>
            <View style={styles.stars}>{renderStars(review.rating)}</View>
          </View>
          <Text style={styles.comment}>{review.comment}</Text>
          <Text style={styles.date}>
            {new Date(review.date).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 12,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 18,
    marginHorizontal: 1,
  },
  comment: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  date: {
    marginTop: 6,
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});

export default ReviewsList;
