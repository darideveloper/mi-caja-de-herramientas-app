import { Text as NativeText, TextStyle } from 'react-native'
import { useFonts } from 'expo-font'
import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode
  style?: TextStyle
  className?: string
}

export default function Text({ children, style={}, className=""}: TextProps) {

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "Quicksand-Regular": require("../../assets/fonts/Quicksand-Regular.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NativeText 
      style={[{ fontFamily: 'Quicksand-Regular' }, style]}
      className={className}
    >
      {children}
    </NativeText>
  )
}