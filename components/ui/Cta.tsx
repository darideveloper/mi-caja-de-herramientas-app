// Components
import Title from './Title';
import { Pressable, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Icons
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Images
import glow from '../../assets/imgs/glow.png';

// Libs
import { useState } from 'react';

export default function Cta({}) {
  
  const [isHover, setIsHover] = useState(false);

  return (
    <Pressable
      onPress={() => alert('Hello World!')}
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
          gap-16
          transition
          ${isHover ? 'opacity-75' : 'opacity-100'}
        `}>
        <Title
          className={`
          `}>
          Sorpréndeme
        </Title>
        <Image
          source={glow}
          className={`
            absolute
            right-0
            top-0
            mr-12
            mt-2
            h-10
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
            top-1/2
            mr-8
            -translate-y-1/2
          `}
        />
      </LinearGradient>
    </Pressable>
  );
}
