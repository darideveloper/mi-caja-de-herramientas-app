import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Hook to get platform-specific safe area calculations
 * @returns Object with safe area calculations for different use cases
 */
export const usePlatformSafeArea = () => {
  const insets = useSafeAreaInsets();

  const getBottomPadding = (basePadding: number = 0) => {
    const safeAreaBottom = insets.bottom;
    
    // Minimal padding for Android navigation bar
    if (Platform.OS === 'android') {
      return safeAreaBottom + basePadding + 1;
    }
    
    // iOS home indicator
    return safeAreaBottom + basePadding;
  };

  const getTopPadding = (basePadding: number = 0) => {
    return insets.top + basePadding;
  };

  const getHorizontalPadding = (basePadding: number = 0) => {
    return {
      paddingLeft: insets.left + basePadding,
      paddingRight: insets.right + basePadding,
    };
  };

  // Get navigation bar height for proper spacing
  const getNavigationBarHeight = () => {
    const baseHeight = 60; // Base height of the navigation bar
    const safeAreaBottom = insets.bottom;
    
    if (Platform.OS === 'android') {
      return baseHeight + safeAreaBottom + 2;
    }
    
    return baseHeight + safeAreaBottom;
  };

  return {
    insets,
    getBottomPadding,
    getTopPadding,
    getHorizontalPadding,
    getNavigationBarHeight,
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
  };
};

/**
 * Get safe area styles for common use cases
 */
export const getSafeAreaStyles = {
  /**
   * For components that need to be positioned at the bottom
   */
  bottomPositioned: (basePadding: number = 2) => {
    const { getBottomPadding } = usePlatformSafeArea();
    return {
      paddingBottom: getBottomPadding(basePadding),
    };
  },

  /**
   * For full-screen layouts
   */
  fullScreen: (topPadding: number = 10, bottomPadding: number = 50) => {
    const { getTopPadding, getBottomPadding } = usePlatformSafeArea();
    return {
      paddingTop: getTopPadding(topPadding),
      paddingBottom: getBottomPadding(bottomPadding),
    };
  },
}; 