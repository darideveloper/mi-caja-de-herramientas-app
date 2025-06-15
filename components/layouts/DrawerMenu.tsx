// Components
import React from 'react';
import { View, Animated, Pressable, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../ui/Text';

// Hooks
import { useEffect, useRef, useState } from 'react';

interface DrawerMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function DrawerMenu({ isVisible, onClose }: DrawerMenuProps) {
  const navigation = useNavigation<any>();
  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Animate in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 400,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [isVisible]);

  const menuItems = [
    { 
      name: 'Inicio', 
      route: 'Home',
      icon: require('../../assets/icons/home.png'),
      params: {}
    },
    { 
      name: 'Filtros', 
      route: 'Results',
      icon: require('../../assets/icons/filter.png'),
      params: { showFilters: true }
    },
    { 
      name: 'Favoritos', 
      route: 'Favorites',
      icon: require('../../assets/icons/fav.png'),
      params: {}
    },
  ];

  const handleNavigation = (route: string, params: any = {}) => {
    onClose();
    navigation.navigate(route, params);
  };

  if (!shouldRender) return null;

  return (
    <View
      className={`
        absolute
        top-0
        left-0
        z-50
        h-full
        w-full
      `}
    >
      {/* Backdrop */}
      <Animated.View
        className={`
          absolute
          h-full
          w-full
          bg-black
        `}
        style={{ opacity: fadeAnim }}
      >
        <Pressable
          className="h-full w-full"
          onPress={onClose}
        />
      </Animated.View>

      {/* Menu */}
      <Animated.View
        className={`
          absolute
          right-0
          h-full
          w-80
          bg-purple
          py-16
        `}
        style={{
          transform: [{ translateX: slideAnim }],
        }}
      >
        {/* Profile Section */}
        <View
          className={`
            mb-12
            items-center
            justify-center
          `}
        >
          <Image
            source={require('../../assets/imgs/profile.png')}
            className={`
              mb-4
              h-16
              w-16
              rounded-full
            `}
          />
          <Text
            className={`
              text-2xl
              font-bold
              text-white
            `}
          >
            Guest User
          </Text>
        </View>

        {/* Menu Items */}
        <View className={`bg-white w-full h-full p-12 rounded-l-3xl border-purple`}>
          {menuItems.map((item) => (
            <Pressable
              key={item.route}
              onPress={() => handleNavigation(item.route, item.params)}
              className={`
                mb-8
                flex-row
                items-center
                w-full
              `}
            >
              <Image
                source={item.icon}
                className={`
                  mr-4
                  h-6
                  w-6
                `}
              />
              <Text
                className={`
                  text-xl
                  text-purpleDark
                `}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </View>
  );
} 
