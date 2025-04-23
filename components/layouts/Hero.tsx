// Component
import { View } from 'react-native';
import Title from '../ui/Title';
import Video from '../ui/Video';
import Cta from '../ui/Cta';

// Hooks
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { useCallback } from 'react';

// Libs
import { fetchData } from '../../lib/api';

export default function Hero() {

  const [autoplay, setAutoplay] = useState(false);
  const [randomPostId, setRandomPostId] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const isFirstOpen = await AsyncStorage.getItem('isFirstOpen')
      if (isFirstOpen) {
        setAutoplay(true);
      }
    }
    checkUser();
  }, []);

  // Refresh randomPostId each time the page gains focus
  useFocusEffect(
    useCallback(() => {
      fetchData('random-post')
        .then((data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            setRandomPostId(data[0].id);
          }
        })
        .catch((error) => {
          console.error('Error fetching random post:', error);
        });
    }, [])
  );

  return (
    <View
      className={`
        w-full
        flex
        flex-col
        items-center
        justify-center
        px-6
        mx-auto
      `}
    >
      <Title >
        !Bienvenido!
      </Title>

      <Video
        src={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        autoPlay={autoplay}
        overlaySrc={require('../../assets/imgs/video-hero-overlay.png')}
      />

      <Cta 
        text={'Sorpréndeme'}
        navScreen={'Post'}
        navData={{ id: randomPostId }}
        isLoading={randomPostId ? false : true}
      />
    </View>
  );
}
