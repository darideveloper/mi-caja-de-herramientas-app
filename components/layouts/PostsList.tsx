// Component
import { View } from 'react-native';
import Title from '../ui/Title';
import Btn from 'components/ui/Btn';
import Text from 'components/ui/Text';

// Types
import { PostSummaryType } from '../../types/post';


interface PostListProps {
  postsData: PostSummaryType[];
}

export default function PostList({ postsData }: PostListProps) {

  // Icons
  const icons: { [key in 'video' | 'social' | 'audio']: any } = {
    video: require('../../assets/icons/video.png'),
    social: require('../../assets/icons/social.png'),
    audio: require('../../assets/icons/audio.png'),
  };

  return (
    <View
      className={`
        bg-white
        w-full
        mt-12
        py-6
        rounded-t-3xl
        px-8
      `}
    >
      <Title
        className={`
          w-full
        `}
        variant="dark"
      >
        Recientes
      </Title>

      <View
        className={`
          flex
          flex-col
          items-center
          justify-center
          gap-4
        `}
      >
        {postsData.map((post) => (
          <Btn 
            key={post.id}
            iconSource={icons[post.post_type]}
            className={`
              w-full
            `}
            onPress={() => {}}
          >
            <Text
              className={`
                w-10/12  
              `}
            >
              {post.title}
            </Text>
          </Btn>
        ))}
      </View>
    </View>
  );
}
