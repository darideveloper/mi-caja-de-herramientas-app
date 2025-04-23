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

export default function Cta({
  text,
  navScreen,
  navData,
  isLoading,
}: {
  text: string;
  navScreen: string;
  navData: any;
  isLoading: boolean;
}) {
  // States
  const [isHover, setIsHover] = useState(false);

  // Navigation
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate(navScreen, navData)}
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

        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <Title
            className={`
              !my-0
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
