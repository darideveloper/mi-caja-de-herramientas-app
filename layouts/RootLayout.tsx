// Components
import { View } from 'react-native';

// Libs
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  const insets = useSafeAreaInsets();

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
      style={{paddingTop: insets.top + 10}}
    >
      {children}
    </View>
  );
}
