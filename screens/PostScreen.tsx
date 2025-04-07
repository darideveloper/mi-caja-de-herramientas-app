// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import PostHeader from '../components/layouts/post/PostHeader';
import PostBody from '../components/layouts/post/PostBody';

// Components
import { ScrollView } from 'react-native';


export default function Home() {
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