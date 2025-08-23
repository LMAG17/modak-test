import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function HomeLoading() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cargando productos y categorías...
      </Text>
      <LottieView
        style={styles.animation}
        source={require('../../constants/lottie/loading.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  animation: {
    height: 600,
    width: '100%',
  },
});
