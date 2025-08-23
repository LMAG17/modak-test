import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function DetailLoading() {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../../constants/lottie/loadingProduct.json')}
        autoPlay
        loop
      />
      <Text style={styles.title}>Cargando detalles del producto...</Text>
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
    textAlign: 'center',
    paddingHorizontal: 64,
  },
  animation: {
    height: 600,
    width: '100%',
  },
});
