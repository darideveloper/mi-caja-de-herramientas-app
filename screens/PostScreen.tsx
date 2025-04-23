// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import PostHeader from '../components/layouts/post/PostHeader';
import PostBody from '../components/layouts/post/PostBody';

// Components
import { ScrollView } from 'react-native';

// Libs
import { useRoute, RouteProp } from '@react-navigation/native';


export default function Home() {

  type RouteParams = {
    params: {
      id: string;
    };
  };

  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { id } = route.params;

  return (
    <RootLayout>
      <ScrollView 
        className={`
          w-full
          debug
        `}
      >
        <PostHeader />
        <PostBody />

      </ScrollView>
    </RootLayout>
  );
}