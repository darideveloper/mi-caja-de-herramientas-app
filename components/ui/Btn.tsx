// Components
import { Pressable, Image, View } from 'react-native'
import Text from './Text'

// Libs 
import { useState } from 'react'

interface BtnProps {
  iconSource?: any,
  title: string,
  className?: string
}

export default function Btn({ iconSource = "", title, className }: BtnProps) {

  const [isHover, setIsHover] = useState(false)

  return (
    <Pressable
      onPress={() => alert('Hello World!')}
      onPressIn={() => setIsHover(true)}
      onPressOut={() => setIsHover(false)}
      className={`
        w-10/12
        bg-white
        rounded-full
        duration-600
        transition
        ${isHover ? 'scale-105' : 'scale-100'}
        ${isHover ? 'opacity-75' : 'opacity-100'}
        ${className}
      `}
    >
      <View 
        className={`
          flex
          items-center
          justify-center
          flex-row
          gap-4
          px-6
          py-2
        `}
      >

        {
          iconSource && 
          <Image 
            source={iconSource}
            className={`
              w-10
              h-10
            `}
          />
        }

        <Text
          className={`
            w-10/12
          `}
        >
          {title}
        </Text>
      </View>
    </Pressable>

  )
}