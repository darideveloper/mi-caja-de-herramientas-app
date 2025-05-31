import React from 'react';
// Components
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Icons
import Btn from '../ui/Btn';

interface HeaderProps {
  onMenuPress: () => void;
  screenName: string;
}

export default function Header({ onMenuPress, screenName }: HeaderProps) {
  const navigation = useNavigation();
  const isHomeScreen = screenName === 'Home';

  return (
    <>
      {/* Back button container - only show on non-home screens */}
      {!isHomeScreen && (
        <View
          className={`
            absolute
            top-10
            left-0
            z-50
            p-4
          `}
        >
          <Btn
            iconSource={require('../../assets/icons/back.png')}
            onPress={() => navigation.goBack()}
            className={`
              !h-12
              !w-12
              !bg-transparent
              !p-0
            `}
            classNameIcon={`
              w-8
              h-8
            `}
          />
        </View>
      )}

      {/* Menu button container - show on all screens */}
      <View
        className={`
          absolute
          top-10
          right-0
          z-50
          p-4
        `}
      >
        <Btn
          iconSource={require('../../assets/icons/menu.png')}
          onPress={onMenuPress}
          className={`
            !h-12
            !w-12
            !bg-transparent
            !p-0
          `}
          classNameIcon={`
            w-8
            h-8
          `}
        />
      </View>
    </>
  );
} 