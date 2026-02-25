# Design: Remote Image Loading Optimization

This document outlines the architectural approach to fixing remote image loading issues by transitioning to `expo-image`.

## Architectural Changes

### 1. Library Replacement
We are replacing the built-in `Image` component from `react-native` with `expo-image`.
- **Reasoning**: `expo-image` is built on top of high-performance native libraries (SDWebImage on iOS and Glide on Android), which handle edge cases like redirects, complex S3 headers, and specific image encodings much better than the standard RN implementation.

### 2. Component Updates

#### `Btn.tsx`
The `Btn` component is used extensively for rendering group icons and link icons. We will:
- Import `Image` from `expo-image`.
- Ensure `className` from NativeWind is correctly interpreted or convert it to `style` if needed for reliability.

#### `Dropdown.tsx` & `FilterModal.tsx`
These components use `Image` with direct `style` props. We will:
- Replace with `expo-image`.
- Maintain the current styling but benefit from `expo-image`'s reliability.

#### `PostBody.tsx`
Used for rendering large post images and link buttons.
- Replace with `expo-image`.

## Data Handling
No changes to data fetching or storage are required, as the existing URL formats are correct (absolute HTTPS URLs). The fix is purely on the rendering side.

## Dependency Management
- Added `expo-image` to `package.json`.
- No changes to `metro.config.js` or `babel.config.js` are expected to be necessary, as `expo-image` works out of the box with the current setup.
