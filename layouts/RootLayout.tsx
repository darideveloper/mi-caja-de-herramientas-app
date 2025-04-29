// Components
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';


// Libs
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loginGuest } from '../lib/auth'


interface RootLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function RootLayout({ children, className }: RootLayoutProps) {

  const insets = useSafeAreaInsets();

  // Auto auth || skip login system
  loginGuest()

  return (
    <View 
      className={`
        ${className}
        bg-purple
        text-black
        flex-1
        relative
        items-center
        justify-center
      `}
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: 65,
      }}
    > 
      <StatusBar style="light" />
      {children}
    </View>
  );
}
