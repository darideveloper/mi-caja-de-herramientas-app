// Component
import { View } from 'react-native';
import Title from '../ui/Title';
import Btn from 'components/ui/Btn';
import Text from 'components/ui/Text';


export default function RecentPosts() {
  const icons: { [key in 'video' | 'social' | 'audio']: any } = {
    video: require('../../assets/icons/video.png'),
    social: require('../../assets/icons/social.png'),
    audio: require('../../assets/icons/audio.png'),
  };

  const postData: { id: number; title: string; post_type: 'video' | 'social' | 'audio' }[] = [
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
        {postData.map((post) => (
          <Btn 
            key={post.id}
            iconSource={icons[post.post_type]}
            className={`
              w-full
            `}
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
