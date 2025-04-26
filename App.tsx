import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PostScreen from './screens/PostScreen';

// Components
import Nav from './components/layouts/Nav';
import { View } from 'react-native';

// Styles
import './global.css';

// Setup screens
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>

        {/* Page conteiner*/}
        <View style={{ flex: 1 }}>
          <RootStack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false, // Hide default header
            }}
          >
            {/* Pages */}
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="Favorites" component={FavoritesScreen} />
            <RootStack.Screen name="Post" component={PostScreen} />
          </RootStack.Navigator>
          
          {/* Custom header / Nav bar */}
          <Nav />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
