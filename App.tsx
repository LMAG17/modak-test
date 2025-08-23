import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/presentation/navigation/AppNavigator';
import { store } from './src/presentation/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
