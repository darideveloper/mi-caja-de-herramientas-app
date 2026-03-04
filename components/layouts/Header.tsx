import React from 'react';
// Components
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDrawer } from '../../context/DrawerContext';


// Icons
import Btn from '../ui/Btn';

interface HeaderProps {
  onMenuPress?: () => void;
  screenName: string;
}

export default function Header({ onMenuPress, screenName }: HeaderProps) {
  const navigation = useNavigation();
  const { openDrawer } = useDrawer();
  const isHomeScreen = screenName === 'Home';

  const handleMenuPress = onMenuPress || openDrawer;

  return (
    <>
      <View
        className={`
          w-full
          flex-row
          justify-between
          p-4
          bg-transparent
          -mb-16
          z-20
        `}
      >

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
          onPress={handleMenuPress}
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
