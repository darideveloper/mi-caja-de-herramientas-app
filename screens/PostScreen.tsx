// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import PostHeader from '../components/layouts/PostHeader';
import PostBody from '../components/layouts/PostBody';

// Components
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

// Libs
import { useRoute, RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/api';
import { storage } from '../lib/storage';

// Context
import { useLoading } from '../context/LoadingContext';

// Types
import { PostDataType, PostSummaryType } from '../types/post';

// Define the route params type
type RouteParams = {
  params: {
    id: string;
  };
};

export default function PostScreen() {
  // Screen routing
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { id } = route.params;

  // States
  const [postData, setPostData] = useState<PostDataType | null>(null);

  // Global loading state
  const { setCtaLoading } = useLoading();

  // Get post data when the component mounts
  useEffect(() => {
    // Reset CTA loading state
    setCtaLoading(false);

    // Validate id
    if (!id) return;

    // get post data
    fetchData(`posts/${id}`).then((data: any) => {
      const typedData = data as PostDataType;
      setPostData(typedData);
      
      // Save to visited posts
      const postSummary: PostSummaryType = {
        id: typedData.id,
        title: typedData.title,
        post_type: typedData.video_link ? 'video' : typedData.audio_link ? 'audio' : 'social'
      };
      storage.saveVisitedPost(postSummary);
    });
  }, [id]);

  // useEffect(() => {
  //   console.log('Post data:', postData);
  // }, [postData]);

  return (
    <RootLayout>
      <ScrollView
        className={`
          debug
          w-full
        `}>
        {(!postData) ? (
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
            <PostBody 
              text={postData?.text || ''}
              links={postData?.links || []}
              imageLink={postData?.image || undefined}
              audioLink={postData?.audio_link || undefined}
              videoLink={postData?.video_link || undefined}
            
            />
          </>
        )}
      </ScrollView>
    </RootLayout>
  );
}
