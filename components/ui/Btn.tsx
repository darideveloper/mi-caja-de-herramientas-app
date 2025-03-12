// Components
import { Pressable, Image, View } from 'react-native'

// Libs 
import { useState } from 'react'

interface BtnProps {
  iconSource?: any,
  className?: string,
  variant?: 'light' | 'dark',
  children: React.ReactNode
}

export default function Btn({ iconSource = "", className = "", variant="light", children }: BtnProps) {

  const [isHover, setIsHover] = useState(false)

  if (variant === 'light') {
    className += ' bg-white'
  } else {
    className += ' bg-purpleDark'
  }

  return (
    <Pressable
      onPress={() => alert('Hello World!')}
      onPressIn={() => setIsHover(true)}
      onPressOut={() => setIsHover(false)}
      className={`
        w-10/12
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

        {children}
      </View>
    </Pressable>

  )
}