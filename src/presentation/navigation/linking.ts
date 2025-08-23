import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Detail: 'product/:id',
      Home: 'home',
    },
  },
};
