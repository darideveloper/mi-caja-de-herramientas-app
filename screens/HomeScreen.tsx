// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import Hero from '../components/layouts/Hero';
import CategoryButtons from '../components/layouts/CategoryButtons';
import RecentPosts from '../components/layouts/RecentPosts';

export default function Home() {
  return (
    <RootLayout>
      <Hero />
      <CategoryButtons />
      <RecentPosts />
    </RootLayout>
  );
}
