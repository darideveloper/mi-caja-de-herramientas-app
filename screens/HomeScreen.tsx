// Components
import { View, ScrollView} from 'react-native';

// Sections
import Hero from '../components/layouts/Hero';
import CategoryButtons from '../components/layouts/CategoryButtons';
import RecentPosts from '../components/layouts/RecentPosts';
import { Pressable, Text } from 'react-native';


export default function Home({navigation}: {navigation: any}) {
  
  return (
    <ScrollView>
      <View>

        <Pressable 
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text>Go to Favorites</Text>
        </Pressable>

        <Hero />

        <CategoryButtons />

        <RecentPosts />

      </View>
    </ScrollView>
  );
};
