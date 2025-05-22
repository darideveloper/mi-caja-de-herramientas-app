// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import Hero from '../components/layouts/Hero';
import CategoryButtons from '../components/layouts/GroupButtons';
import PostsList from '../components/layouts/PostsList';

// Components
import { ScrollView } from 'react-native';

// Types
import { PostSummaryType } from '../types/post';

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
  return (
    <RootLayout>
      <ScrollView>
        <Hero />
        <CategoryButtons />
        <PostsList postsData={recentPosts} className={`mt-12 rounded-t-3xl`} title="Recientes" />
      </ScrollView>
    </RootLayout>
  );
}
