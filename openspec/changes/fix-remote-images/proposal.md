# Proposal: Fix Remote Images Not Loading

Remote images (icons) fetched from the API (hosted on S3) are not visible in the app, although they work in the browser. Other remote resources (videos/audio) are working. This proposal aims to fix this by replacing the standard React Native `Image` component with `expo-image`, which is more robust and specifically designed for Expo applications.

## Problem Analysis
- The current implementation uses the standard React Native `Image` component.
- Remote images in React Native require explicit width and height.
- In `Btn.tsx`, width and height are applied via `className`. If NativeWind fails to correctly apply these styles to the `Image` component, it will have 0 size.
- Standard `Image` can be flaky with certain S3 URL configurations, redirects, or SSL certificates.
- `expo-image` provides better performance, caching, and reliability for remote images.

## Proposed Solution
- Install `expo-image`.
- Replace `Image` imports from `react-native` with `Image` from `expo-image` in components that render remote icons.
- Ensure that `expo-image` is used with explicit dimensions and proper `contentFit` settings.

## Scope
- `components/ui/Btn.tsx`: Update to use `expo-image`.
- `components/ui/Dropdown.tsx`: Update to use `expo-image`.
- `components/layouts/FilterModal.tsx`: Update to use `expo-image`.
- `components/layouts/PostBody.tsx`: Update to use `expo-image`.
- `components/ui/Video.tsx`: Update to use `expo-image` for the overlay image.
- `package.json`: Add `expo-image` dependency.
