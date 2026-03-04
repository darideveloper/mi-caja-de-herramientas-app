import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';

// Register expo-image with NativeWind to support className
cssInterop(Image, { className: 'style' });

// Screens
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PostScreen from './screens/PostScreen';
import ResultsScreen from 'screens/ResultsScreen';

// Components
import Nav from './components/layouts/Nav';
import Header from './components/layouts/Header';
import DrawerMenu from './components/layouts/DrawerMenu';

// Context
import { LoadingProvider } from './context/LoadingContext';
import { DrawerProvider, useDrawer } from './context/DrawerContext';

// Hooks
import { useState, useEffect } from 'react';

// Styles
import './global.css';

// Setup screens
const RootStack = createNativeStackNavigator();

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const { isDrawerVisible, openDrawer, closeDrawer } = useDrawer();

  useEffect(() => {
    // Set root view background color (iOS)
    SystemUI.setBackgroundColorAsync('#3a2546');

    // Set Android navigation bar color and button style
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#3a2546');
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const currentRouteName = state?.routes[state.index]?.name;
        if (currentRouteName) {
          setCurrentScreen(currentRouteName);
        }
      }}>
      {/* Page container*/}
      <View style={{ flex: 1 }}>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Hide default header
          }}>
          {/* Pages */}
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Favorites" component={FavoritesScreen} />
          <RootStack.Screen name="Post" component={PostScreen} />
          <RootStack.Screen name="Results" component={ResultsScreen} />
        </RootStack.Navigator>

        {/* Custom Nav bar */}
        <Nav currentRoute={currentScreen} />
      </View>

      {/* Drawer Menu - Moved to context control */}
      <DrawerMenu isVisible={isDrawerVisible} onClose={closeDrawer} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <DrawerProvider>
        <SafeAreaProvider>
          <StatusBar 
            style="light" 
            backgroundColor="#3a2546"
            translucent={Platform.OS === 'android'}
          />
          <AppContent />
        </SafeAreaProvider>
      </DrawerProvider>
    </LoadingProvider>
  );
}
