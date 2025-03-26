// Components
import { View } from 'react-native';
import Nav from '../components/layouts/Nav';

// Libs
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loginGuest } from '../lib/auth'


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  const insets = useSafeAreaInsets();

  // Auto auth || skip login system
  loginGuest()

  return (
    <View 
      className={`
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

      {children}
    </View>
  );
}
