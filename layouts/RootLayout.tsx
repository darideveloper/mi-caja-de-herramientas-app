// Components
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Libs
import { usePlatformSafeArea } from '../lib/safeArea';
import { loginGuest } from '../lib/auth'

interface RootLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function RootLayout({ children, className }: RootLayoutProps) {

  const { getTopPadding, getNavigationBarHeight } = usePlatformSafeArea();

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
        paddingTop: getTopPadding(10),
        paddingBottom: getNavigationBarHeight(), // Use precise navigation bar height
      }}
    > 
      <StatusBar style="light" backgroundColor="#3a2546" />
      {children}
    </View>
  );
}
