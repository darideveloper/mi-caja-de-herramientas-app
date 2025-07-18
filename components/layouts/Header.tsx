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
      <View
        className={`
          absolute
          left-0
          right-0
          top-0
          z-[9999]
          flex-row
          justify-between
          p-4
          pt-10
        `}
        style={{
          elevation: 1000,
          zIndex: 1000,
        }}>
        {/* Back button - only show on non-home screens */}
        {!isHomeScreen ? (
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
        ) : (
          <View style={{ width: 48, height: 48 }} />
        )}

        {/* Menu button - show on all screens */}
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
