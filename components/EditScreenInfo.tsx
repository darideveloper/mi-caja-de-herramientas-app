// Components
import { View, ScrollView} from 'react-native';

// Sections
import Hero from './layouts/Hero';
import CategoryButtons from './layouts/CategoryButtons';
import RecentPosts from './layouts/RecentPosts';


export const EditScreenInfo = ({ path }: { path: string }) => {
  

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
