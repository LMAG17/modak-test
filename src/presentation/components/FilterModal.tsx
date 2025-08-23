import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from './Icon';

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'rating-asc'
  | 'rating-desc';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSort: (sort: SortOption) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onSort,
}) => {
  const [selected, setSelected] = useState<SortOption>('price-asc');

  const applySort = () => {
    onSort(selected);
    onClose();
  };

  const OPTIONS = [
    { label: 'Precio: menor a mayor', value: 'price-asc' },
    { label: 'Precio: mayor a menor', value: 'price-desc' },
    { label: 'Calificación: menor a mayor', value: 'rating-asc' },
    { label: 'Calificación: mayor a menor', value: 'rating-desc' },
  ];

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Ordenar productos</Text>

          {OPTIONS.map(option => (
            <Pressable
              key={option.value}
              style={styles.option}
              onPress={() => setSelected(option.value as SortOption)}>
              <Icon
                family="Ionicons"
                name={
                  selected === option.value
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={20}
                color="#007AFF"
              />
              <Text style={styles.optionText}>{option.label}</Text>
            </Pressable>
          ))}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={applySort}>
              <Text style={styles.applyText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
  applyBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
