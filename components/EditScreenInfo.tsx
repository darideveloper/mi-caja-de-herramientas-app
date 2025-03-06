// Components
import { View, ScrollView} from 'react-native';

// Sections
import Hero from './layouts/hero';
import CategoryButtons from './layouts/CategoryButtons';

export const EditScreenInfo = ({ path }: { path: string }) => {
  

  return (
    <ScrollView>
      <View className="mx-4 mt-2 items-center">
        
        <Hero />

        <CategoryButtons />

      </View>
    </ScrollView>
  );
};
