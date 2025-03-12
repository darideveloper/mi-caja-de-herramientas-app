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
import { useNavigation } from '@react-navigation/native';

export default function Cta({}) {

  // States
  const [isHover, setIsHover] = useState(false);

  // Navigation
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Favorites') }
      className={`
        duration-600
        w-10/12
        overflow-hidden
        rounded-xl
        transition
        ${isHover ? 'scale-110' : 'scale-100'}
      `}
      onPressIn={() => setIsHover(true)}
      onPressOut={() => setIsHover(false)}
    >

      <LinearGradient
        colors={['#9B85AC', '#3A2647BB']}
        start={[0, 0]}
        end={[1, 0]}
        className={`
          relative
          w-full
          flex
          flex-row
          items-center
          justify-center
          transition
          duration-600
          py-4
          ${isHover ? 'opacity-75' : 'opacity-100'}
        `}>

        <Title
          className={`
            w-full
            text-center
            !my-0
            mr-5
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
