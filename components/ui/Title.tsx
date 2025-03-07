import { Text } from 'react-native'
import { useFonts } from 'expo-font'
import { ReactNode } from 'react';


interface TitleProps {
  children: ReactNode
  className?: string
  variant?: 'light' | 'dark'
}

export default function Title({ children, className="", variant="light" }: TitleProps) {

  const textColor = variant === 'light' ? 'text-white' : 'text-black'

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "BalsamiqSans-Regular": require("../../assets/fonts/BalsamiqSans-Regular.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Text 
      style={[{ fontFamily: 'BalsamiqSans-Regular' }]}
      className={`
        my-6
        text-3xl 
        ${textColor}
        ${className}
      `}
    >
      {children}
    </Text>
  )
}