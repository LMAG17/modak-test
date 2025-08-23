import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Category } from '../../domain/entities/Category';
import CategoryItem from './CategoryItem';

type Props = {
  categories: Category[] | undefined;
  onPressCategory?: (slug: string) => void;
  selectedCategory: string | null;
};

export default function CategoriesList({
  categories,
  onPressCategory,
  selectedCategory,
}: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            onPress={onPressCategory}
            isSelected={selectedCategory === item.slug}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 8,
  },
  list: {
    paddingHorizontal: 16,
    gap: 8,
  },
});
