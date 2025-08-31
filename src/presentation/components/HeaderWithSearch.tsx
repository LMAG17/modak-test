import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CartIcon from './CartIcon';
import Icon from './Icon';

type Props = {
  onSearch: (query: string) => void;
  isLoading: boolean;
};

export default function HeaderWithSearch({ onSearch, isLoading }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Modak Test</Text>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon
            family="Ionicons"
            name={isLoading ? 'loader' : 'search'}
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Buscar productos..."
            placeholderTextColor="#aaa"
            onChangeText={text => onSearch(text)}
          />
        </View>
        <CartIcon style={styles.cartIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#F5F6F5',
    borderRadius: 32,
    alignSelf: 'baseline',
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  cartIcon: {
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#F5F6F5',
  },
});
