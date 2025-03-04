// Components
import Title from './Title'
import { Pressable, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

// Icons
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Images
import glow from '../../assets/imgs/glow.png'

// Libs 
import { useState } from 'react'


export default function Cta({ }) {

  const [isHover, setIsHover] = useState(false)

  return (
    <Pressable
      onPress={() => alert('Hello World!')}
      className={`
        rounded-xl
        overflow-hidden
        w-10/12
        duration-600
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
          flex
          items-center
          justify-center
          flex-row
          gap-16
          relative
          w-full
          duration-600
          transition
          ${isHover ? 'opacity-75' : 'opacity-100'}
        `}
      >
        <Title
          className={`
          `}
        >
          Sorpréndeme
        </Title>
        <Image
          source={glow}
          className={`
            w-auto
            h-10
            mt-2
            absolute
            top-0
            right-0
            mr-12
          `}
        />
        <FontAwesome
          name="random"
          size={24}
          color="white"
          className={`
            absolute
            top-1/2
            right-0
            mr-8
            -translate-y-1/2
          `}
        />
      </LinearGradient>
    </Pressable>
  )
}