import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';

// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import PostsList from '../components/layouts/PostsList';
import ResultsHeader from 'components/layouts/ResultsHeader';
import FilterModal from 'components/layouts/FilterModal';

// Libs
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
    showFilters?: boolean;
    timestamp?: number;
  };
};

export default function ResultsScreen() {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const navigation = useNavigation();
  const {
    categoryId = '',
    groupId = '',
    durationMin = '',
    title = 'Resultados de Búsqueda',
    showFilters = false,
    timestamp,
  } = route.params || {};

  // States
  const [posts, setPosts] = useState<PostSummaryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('ResultsScreen: showFilters param:', showFilters);
    console.log('ResultsScreen: isFilterModalVisible:', isFilterModalVisible);
  }, [showFilters, isFilterModalVisible]);

  // Listen to parameter changes to handle filter modal opening
  useEffect(() => {
    if (showFilters) {
      console.log(
        'ResultsScreen: Opening filter modal due to showFilters param, timestamp:',
        timestamp
      );
      setIsFilterModalVisible(true);
    }
  }, [showFilters, timestamp]);

  // Initialize filter modal state when component mounts
  useEffect(() => {
    if (showFilters) {
      console.log('ResultsScreen: Initial mount with showFilters=true');
      setIsFilterModalVisible(true);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsFilterModalVisible(false);
    };
  }, []);

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
  }, [categoryId, groupId, durationMin]);

  return (
    <>
      <RootLayout className={'bg-purpleDark'}>
        <ScrollView className={'debug w-full'} contentContainerStyle={{ flexGrow: 1 }}>
          {isLoading ? (
            <View className={'flex h-screen items-center justify-center'}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          ) : (
            <>
              <ResultsHeader title={posts.length === 0 ? 'No se encontraron resultados' : title} />
              <PostsList
                postsData={posts}
                className={'min-h-[80vh]'}
                emptyMessage="No se encontraron resultados para mostrar"
              />
            </>
          )}
        </ScrollView>
      </RootLayout>

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => {
          console.log('FilterModal: onClose called');
          setIsFilterModalVisible(false);
        }}
        onApplyFilters={(filters) => {
          console.log('FilterModal: onApplyFilters called with:', filters);
          // Show loading spinner while applying filters
          setIsLoading(true);

          // Construct the API query
          const params = new URLSearchParams();
          if (filters.groupId) params.append('group', filters.groupId.toString());
          if (filters.categoryIds.length > 0)
            params.append('category', filters.categoryIds.join(','));
          if (filters.duration) params.append('duration', filters.duration.toString());
          params.append('summary', 'true');

          // Call your API with: posts?${params.toString()}
          console.log(`posts?${params.toString()}`)
          fetchData(`posts?${params.toString()}`, false)
            .then((data: any) => {
              const typedData = data as PostSummaryType[];
              setPosts(typedData);
              setIsLoading(false); // Hide loading spinner when done
            })
            .catch((error) => {
              console.error('Error applying filters:', error);
              setIsLoading(false); // Hide loading spinner even on error
            });
        }}
      />
    </>
  );
}
