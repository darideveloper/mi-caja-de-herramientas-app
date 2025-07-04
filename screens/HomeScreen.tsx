// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import Hero from '../components/layouts/Hero';
import CategoryButtons from '../components/layouts/GroupButtons';
import PostsList from '../components/layouts/PostsList';

// Components
import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

// Types
import { PostSummaryType } from '../types/post';
import { VisitedPost } from '../lib/storage';

// Storage
import { storage } from '../lib/storage';

// Dummy data

const recentPosts: PostSummaryType[] = [
  {
    id: 4,
    title: 'test 1',
    post_type: 'video',
  },
  {
    id: 5,
    title: 'test 2',
    post_type: 'social',
  },
  {
    id: 6,
    title: 'test 1',
    post_type: 'audio',
  },
  {
    id: 7,
    title: 'test 2',
    post_type: 'video',
  },
  {
    id: 8,
    title: 'test 1',
    post_type: 'social',
  },
  {
    id: 9,
    title: 'test 2',
    post_type: 'audio',
  },
];

export default function Home() {
  const [visitedPosts, setVisitedPosts] = useState<VisitedPost[]>([]);

  // Load visited posts on component mount and when screen comes into focus
  const loadVisitedPosts = async () => {
    const posts = await storage.getVisitedPosts();
    setVisitedPosts(posts);
  };

  useEffect(() => {
    loadVisitedPosts();
  }, []);

  // Refresh visited posts when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadVisitedPosts();
    }, [])
  );

  return (
    <RootLayout>
      <ScrollView>
        <Hero />
        <CategoryButtons />
        <PostsList 
          postsData={visitedPosts} 
          className={`mt-12 rounded-t-3xl`} 
          title="Recientes" 
          emptyMessage="No hay meditaciones recientes para mostrar"
        />
      </ScrollView>
    </RootLayout>
  );
}
