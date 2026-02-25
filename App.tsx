import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';

// Screens
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PostScreen from './screens/PostScreen';
import ResultsScreen from 'screens/ResultsScreen';

// Components
import Nav from './components/layouts/Nav';
import Header from './components/layouts/Header';
import DrawerMenu from './components/layouts/DrawerMenu';
import { View } from 'react-native';

// Context
import { LoadingProvider } from './context/LoadingContext';

// Hooks
import { useState, useEffect } from 'react';

// Styles
import './global.css';

// Setup screens
const RootStack = createNativeStackNavigator();

export default function App() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Home');

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
    <LoadingProvider>
      <SafeAreaProvider>
        <StatusBar 
          style="light" 
          backgroundColor="#3a2546"
          translucent={Platform.OS === 'android'}
        />
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

            {/* Custom header / Nav bar */}
            <Nav currentRoute={currentScreen} />
          </View>

          {/* Header with menu/back button - Outside main container for proper z-index */}
          <Header onMenuPress={() => setIsDrawerVisible(true)} screenName={currentScreen} />

          {/* Drawer Menu - Outside main container for proper z-index */}
          <DrawerMenu isVisible={isDrawerVisible} onClose={() => setIsDrawerVisible(false)} />
        </NavigationContainer>
      </SafeAreaProvider>
    </LoadingProvider>
  );
}
