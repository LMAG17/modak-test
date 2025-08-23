import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Category } from '../../domain/entities/Category';

type Props = {
  category: Category;
  onPress?: (slug: string) => void;
};

export default function CategoryItem({ category, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress?.(category.slug)}>
      <Text numberOfLines={1} style={styles.title}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#F5F6F5',
    borderRadius: 32,
    alignSelf: 'baseline',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});
