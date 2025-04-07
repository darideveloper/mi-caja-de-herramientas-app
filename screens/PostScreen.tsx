// Layout
import RootLayout from 'layouts/RootLayout';

// Sections
import PostHeader from '../components/layouts/post/Header';

// Components
import { ScrollView } from 'react-native';


export default function Home() {
  return (
    <RootLayout
      className={`
        w-full
        bg-white
      `}
    >
      <ScrollView 
        className={`
          w-full
        `}
      >
        <PostHeader />
      </ScrollView>
    </RootLayout>
  );
}