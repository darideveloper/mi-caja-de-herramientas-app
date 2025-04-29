// Component
import { View } from 'react-native';
import Title from '../ui/Title';
import Btn from 'components/ui/Btn';
import Text from 'components/ui/Text';

// Types
import { PostSummaryType } from '../../types/post';

// Libs
import { useNavigation } from '@react-navigation/native';

interface PostListProps {
  postsData: PostSummaryType[];
  title?: string;
  className?: string;
}

export default function PostList({ postsData, title="", className }: PostListProps) {

  // Icons
  const icons: { [key in 'video' | 'social' | 'audio']: any } = {
    video: require('../../assets/icons/video.png'),
    social: require('../../assets/icons/social.png'),
    audio: require('../../assets/icons/audio.png'),
  };

  // Navigation
  const navigation = useNavigation<any>();

  return (
    <View
      className={`
        bg-white
        w-full
        py-6
        px-8
        ${className}
      `}
    >

      {
        title &&
        <Title
          className={`
            w-full
          `}
          variant="dark"
        >
          {title}
        </Title>
      }

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
            onPress={() => {
              navigation.navigate("Post", {id: post.id});
            }}
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
