// Component
import { View } from 'react-native';
import Title from '../ui/Title';
import Btn from 'components/ui/Btn';
import Text from 'components/ui/Text';

// Types
import { PostSummaryType } from '../../types/post';
import { VisitedPost } from '../../lib/storage';

// Libs
import { useNavigation } from '@react-navigation/native';

interface PostListProps {
  postsData: (PostSummaryType | VisitedPost)[];
  title?: string;
  className?: string;
  emptyMessage?: string;
}

export default function PostList({ postsData, title="", className, emptyMessage }: PostListProps) {

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
        {postsData.length > 0 ? (
          postsData.map((post) => (
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
          ))
        ) : (
          <Text
            className={`
              text-center
              text-gray-500
              text-lg
              py-8
            `}
          >
            {emptyMessage || "No hay contenido para mostrar"}
          </Text>
        )}
      </View>
    </View>
  );
}
