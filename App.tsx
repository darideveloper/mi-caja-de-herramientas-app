import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import './global.css';

// Screens
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    Favorites: FavoritesScreen,
  },
  screenOptions: {
    headerStyle: { backgroundColor: 'tomato' },
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(RootStack);


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Navigation/>
    </SafeAreaProvider>
  );
}
