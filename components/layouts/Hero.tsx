// Component
import { View } from 'react-native';
import Title from '../ui/Title';
import Video from '../ui/Video';
import Cta from '../ui/Cta';

// Hooks
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


export default function Hero() {

  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const isFirstOpen = await AsyncStorage.getItem('isFirstOpen')
      if (isFirstOpen) {
        setAutoplay(true);
      }
    }
    checkUser();
  }, []);


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

      <Cta />
    </View>
  );
}
