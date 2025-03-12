// Components
import { View, ScrollView} from 'react-native';

// Sections
import Hero from '../components/layouts/Hero';
import CategoryButtons from '../components/layouts/CategoryButtons';
import RecentPosts from '../components/layouts/RecentPosts';


export default function Home({navigation}: {navigation: any}) {
  
  return (
    <ScrollView>
      <View>

        <Hero />

        <CategoryButtons />

        <RecentPosts />

      </View>
    </ScrollView>
  );
};
