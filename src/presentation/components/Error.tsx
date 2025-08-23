import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';

type Props = {
  message: string;
  onRefresh?: () => void;
};

export default function Error({ message, onRefresh }: Props) {
  return (
    <View style={styles.container}>
      <Icon family="MaterialIcons" name="error-outline" size={64} color="red" />
      <Text style={styles.text}>{message}</Text>
      {!!onRefresh && (
        <TouchableOpacity onPress={onRefresh}>
          <Text style={styles.refreshText}>Reintentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 18,
  },
  refreshText: {
    textDecorationLine: 'underline',
  },
});
