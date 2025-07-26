import React from 'react';
import { View, Text } from 'react-native';
import { usePlatformSafeArea } from '../../lib/safeArea';

interface DebugSpacingProps {
  visible?: boolean;
}

export default function DebugSpacing({ visible = false }: DebugSpacingProps) {
  const { insets, getNavigationBarHeight } = usePlatformSafeArea();

  if (!visible) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 100,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 10,
        borderRadius: 5,
        zIndex: 9999,
      }}
    >
      <Text style={{ color: 'white', fontSize: 12 }}>
        Safe Areas:
      </Text>
      <Text style={{ color: 'white', fontSize: 10 }}>
        Top: {insets.top}
      </Text>
      <Text style={{ color: 'white', fontSize: 10 }}>
        Bottom: {insets.bottom}
      </Text>
      <Text style={{ color: 'white', fontSize: 10 }}>
        Left: {insets.left}
      </Text>
      <Text style={{ color: 'white', fontSize: 10 }}>
        Right: {insets.right}
      </Text>
      <Text style={{ color: 'white', fontSize: 10 }}>
        Nav Height: {getNavigationBarHeight()}
      </Text>
    </View>
  );
} 