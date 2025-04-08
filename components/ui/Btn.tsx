// Components
import { Pressable, Image, View } from 'react-native';

// Libs
import { useState } from 'react';

interface BtnProps {
  iconSource?: any;
  className?: string;
  variant?: 'light' | 'dark' | 'purple';
  children?: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  classNameIcon?: string;
}

export default function Btn({
  iconSource = '',
  className = '',
  variant = 'light',
  children,
  onPress = () => {},
  disabled = false,
  classNameIcon = '',
}: BtnProps) {
  const [isHover, setIsHover] = useState(false);

  console.log({ iconSource });

  const variants = {
    light: ' bg-white text-black',
    dark: ' bg-purpleDark text-white',
    purple: ' bg-purple text-white',
  }

  className += variants[variant];

  return (
    <Pressable
      onPress={() => onPress()}
      onPressIn={() => setIsHover(true)}
      onPressOut={() => setIsHover(false)}
      className={`
        duration-600
        w-10/12
        rounded-full
        transition
        ${className}
        ${isHover ? 'scale-105' : 'scale-100'}
        ${isHover ? 'opacity-75' : 'opacity-100'}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${disabled ? 'opacity-50' : 'opacity-100'}
      `}
      disabled={disabled}>
      <View
        className={`
          flex
          flex-row
          items-center
          justify-center
          gap-4
          px-6
          py-2
        `}>
        {iconSource && (
          <Image
            source={iconSource}
            className={`
              h-10
              w-10
              ${classNameIcon}
            `}
          />
        )}

        {children}
      </View>
    </Pressable>
  );
}
