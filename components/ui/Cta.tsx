// Components
import Title from './Title';
import { Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';

// Icons
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Images
import glow from '../../assets/imgs/glow.png';

// Libs
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../lib/storage';

// Context
import { useLoading } from '../../context/LoadingContext';

import { fetchData } from '../../lib/api';

export default function Cta({
  text,
}: {
  text: string;
}) {
  // States
  const [isHover, setIsHover] = useState(false);
  const navScreen = 'Post'; // Define the screen to navigate to

  // Navigation
  const navigation = useNavigation<any>();

  // Global loading state
  const { isCtaLoading, setCtaLoading } = useLoading();

  // Handle click and fetch random post
  function handleClick() {
    setCtaLoading(true);
    fetchData('random-post')
      .then((data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const post = data[0];
          // Save to visited posts
          const postSummary = {
            id: post.id,
            title: post.title,
            post_type: (post.video_link ? 'video' : post.audio_link ? 'audio' : 'social') as 'video' | 'audio' | 'social'
          };
          storage.saveVisitedPost(postSummary);
          navigation.navigate(navScreen, {id: post.id});
        }
      })
      .catch((error) => {
        console.error('Error fetching random post:', error);
        setCtaLoading(false);
      });
  }

  return (
    <Pressable
      onPress={handleClick}
      className={`
        duration-600
        w-10/12
        overflow-hidden
        rounded-xl
        transition
        ${isHover ? 'scale-110' : 'scale-100'}
      `}
      onPressIn={() => setIsHover(true)}
      onPressOut={() => setIsHover(false)}>
      <LinearGradient
        colors={['#9B85AC', '#3A2647BB']}
        start={[0, 0]}
        end={[1, 0]}
        className={`
          duration-600
          relative
          flex
          w-full
          flex-row
          items-center
          justify-center
          py-4
          transition
          ${isHover ? 'opacity-75' : 'opacity-100'}
        `}>

        {isCtaLoading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <Title
            className={`
              !my-2
              mr-5
              w-full
              text-center
            `}>
            {text}
          </Title>
        )}

        <Image
          source={glow}
          className={`
            absolute
            right-0
            top-0
            mr-12
            h-16
            w-auto
          `}
        />

        <FontAwesome
          name="random"
          size={24}
          color="white"
          className={`
            absolute
            right-0
            mr-8
          `}
        />
      </LinearGradient>
    </Pressable>
  );
}
