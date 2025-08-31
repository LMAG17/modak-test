import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import CartIcon from '../components/CartIcon';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { linking } from './linking';

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: number };
  Cart: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio', headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={ProductDetailScreen}
          options={{
            title: '',
            headerRight: () => <CartIcon style={{ marginRight: 16 }} />,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Mi carrito' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

export const useAppNavigation = useNavigation<
  StackNavigationProp<RootStackParamList>
>;
