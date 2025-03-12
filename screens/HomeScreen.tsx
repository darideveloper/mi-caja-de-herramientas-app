// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import Hero from '../components/layouts/Hero';
import CategoryButtons from '../components/layouts/CategoryButtons';
import RecentPosts from '../components/layouts/RecentPosts';

// Components
import { ScrollView } from 'react-native';


export default function Home() {
  return (
    <RootLayout>
      <ScrollView>
        <Hero />
        <CategoryButtons />
        <RecentPosts />
      </ScrollView>
    </RootLayout>
  );
}
