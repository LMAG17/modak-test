import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../domain/entities/Product';
import { CustomCarousel } from './Carousel';

type Props = {
  products?: Product[];
  onPress?: (id: number) => void;
};

export default function ProductsGrid({ products, onPress }: Props) {
  return (
    <View>
      <CustomCarousel
        data={products}
        itemsPerPage={9}
        renderItem={({ item }) => (
          <View style={styles.group}>
            {item.map(product => (
              <TouchableOpacity
                key={product.id}
                style={styles.item}
                onPress={() => onPress?.(product.id)}>
                <Image
                  source={{ uri: product.thumbnail }}
                  style={styles.image}
                />
                <View style={styles.infoContainer}>
                  <Text numberOfLines={1} style={styles.text}>
                    {product.title}
                  </Text>
                  <Text style={styles.price}>${product.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  group: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 4,
    marginRight: 16,
    padding: 8,
  },
  item: {
    height: '30%',
    width: '30%',
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    borderRadius: 4,
    objectFit: 'contain',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
  },
});
