// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import PostHeader from '../components/layouts/post/PostHeader';
import PostBody from '../components/layouts/post/PostBody';

// Components
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

// Libs
import { useRoute, RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/api';

// Define the route params type
type RouteParams = {
  params: {
    id: string;
  };
};

// Define the post data type
interface PostData {
  title: string;
  category: {
    name: string;
  };
  duration: number;
}

export default function PostScreen() {
  // Screen routing
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { id } = route.params;

  // States
  const [postData, setPostData] = useState<PostData | null>(null);

  // Get post data when the component mounts
  useEffect(() => {
    fetchData(`posts/${id}`).then((data: any) => {
      const typedData = data as PostData;
      console.log('Post data:', typedData);
      setPostData(typedData);
    });
  }, [id]);

  useEffect(() => {
    console.log('Post data:', postData);
  }, [postData]);

  return (
    <RootLayout>
      <ScrollView
        className={`
          debug
          w-full
        `}>
        {!postData ? (
          <View
            className={`
              flex
              h-screen
              items-center
              justify-center  
            `}
          >
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        ) : (
          <>
            <PostHeader
              postTitle={postData?.title || ''}
              postUnderline={postData?.category?.name || ''}
              durationMin={postData?.duration || 0}
            />
            <PostBody />
          </>
        )}
      </ScrollView>
    </RootLayout>
  );
}
