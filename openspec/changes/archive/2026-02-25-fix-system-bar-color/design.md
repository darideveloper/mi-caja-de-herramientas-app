# Design: Fix System Bar Color

The approach chosen is to use both **static configuration** (in `app.json`) and **runtime configuration** (via `App.tsx` and potentially `expo-navigation-bar`) to ensure consistent behavior across all environments.

## Static Configuration (`app.json`)
The most robust way to set global system UI colors in Expo is through `app.json`. This ensures that the system-level colors are applied as early as possible (during application boot).

- **`backgroundColor`**: Sets the root view color for both platforms. On iOS, this is visible behind the "Home Indicator" area if the application is edge-to-edge.
- **`androidNavigationBar`**: Specifically for Android, sets the background color and the bar style (light/dark icons).

## Runtime Configuration
While `app.json` is effective, some developer environments (like Expo Go) may not fully respect all static settings for all system-level configurations at all times. By using the `StatusBar` and `NavigationBar` (via `expo-navigation-bar`) in `App.tsx`, we can guarantee that the colors are applied as soon as the React context is available.

### Android Navigation Bar
On Android, the navigation bar is a separate system element. By setting it to a solid color that matches our `Nav` component (`#3a2546`), we provide a consistent look. 

We will also evaluate setting the navigation bar to **translucent** (edge-to-edge) if the `Nav` component's padding is sufficient to cover the bottom safe area. This is the more "modern" approach and is consistent with iOS.

### iOS Home Indicator
iOS doesn't have a direct API to color the "Home Indicator" bar itself (it is always a semi-transparent horizontal line). Instead, the background of the underlying view is visible. Setting the root view's `backgroundColor` ensures that if there's any bleed-through or if the `Nav` component doesn't fully cover the area, the correct brand color is shown.

## Technical Details
- **Brand Color (`purpleDark`)**: `#3a2546`
- **Icon Style**: `light-content` (to ensure white icons on a dark background).
- **Library**: Install `expo-navigation-bar` if needed for runtime control on Android.
