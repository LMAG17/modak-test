import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View style={styles.container} testID="activity-indicator">
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
