// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import PostsList from '../components/layouts/PostsList';
import ResultsHeader from 'components/layouts/ResultsHeader';

// Components
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

// Libs
import { useRoute, RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/api';

// Types
import { PostSummaryType } from '../types/post';

// Define the route params type
type RouteParams = {
  params: {
    categoryId?: number | string;
    groupId?: number | string;
    durationMin?: number | string;
    title?: string;
  };
};

export default function ResultsScreen() {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const {
    categoryId = '',
    groupId = '',
    durationMin = '',
    title = 'Resultados de Búsqueda',
  } = route.params || {};

  // States
  const [posts, setPosts] = useState<PostSummaryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get post data when the component mounts
  useEffect(() => {
    // get all posts data
    const endpoint = `posts/?group=${groupId}&category=${categoryId}&duration=${durationMin}&summary=true`;
    fetchData(endpoint, false).then((data: any) => {
      const typedData = data as PostSummaryType[];
      setPosts(typedData);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, []);

  return (
    <RootLayout className={`bg-purpleDark`}>
      <ScrollView
        className={`
            debug
            w-full
          `}>
        {isLoading ? (
          <View
            className={`
                flex
                h-screen
                items-center
                justify-center  
              `}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        ): (
          <>
            <ResultsHeader title={posts.length == 0 ? "No se encontraron resultados" : title} />
            <PostsList postsData={posts} className={`min-h-[80vh]`} />
          </>
        )}
      </ScrollView>
    </RootLayout>
  );
}
