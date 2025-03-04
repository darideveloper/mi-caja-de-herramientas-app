import { Text, TextStyle } from 'react-native'
import { useFonts } from 'expo-font'
import { ReactNode } from 'react';


interface TitleProps {
  children: ReactNode
  style?: TextStyle
  className?: string
}

export default function Title({ children, style={}, className="" }: TitleProps) {

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "BalsamiqSans-Regular": require("../../assets/fonts/BalsamiqSans-Regular.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Text 
      style={[{ fontFamily: 'BalsamiqSans-Regular' }, style]}
      className={`
        text-3xl 
        my-4
        text-white
        ${className}
      `}
    >
      {children}
    </Text>
  )
}