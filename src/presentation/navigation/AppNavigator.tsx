import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { linking } from './linking';

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Products', headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={ProductDetailScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

export const useAppNavigation = useNavigation<
  StackNavigationProp<RootStackParamList>
>;
