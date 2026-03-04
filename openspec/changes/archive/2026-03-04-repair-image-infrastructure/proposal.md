# Change: Repair Image Infrastructure and Rendering

## Why
Images (both remote from S3 and local assets) are currently invisible in the application. Despite a previous attempt to transition to `expo-image`, the implementation failed because:
1. **NativeWind v4 Interop**: `expo-image` is not a primitive, so NativeWind's `className` prop is ignored, resulting in 0x0 dimensions.
2. **Local Assets**: The `Btn.tsx` update broke local icons because they now rely on `expo-image` without proper dimension styling.
3. **URL Handling**: Remote images (e.g., in `PostBody.tsx`) likely use relative paths which `expo-image` cannot resolve automatically on native platforms.
4. **Layout/Z-index**: `PostBody.tsx` uses negative z-indices and margins that may be pushing images behind the background or off-screen.

## What Changes
- **Register `expo-image`**: Add `cssInterop` for the `Image` component from `expo-image` to enable NativeWind support.
- **Update `Btn.tsx`**: Ensure icons have explicit dimensions through `style` or correctly interpreted `className`.
- **Absolute URL Utility**: Implement a helper to ensure all remote image URIs are absolute (prepending `EXPO_PUBLIC_API_BASE`).
- **Refactor `PostBody.tsx`**: Fix z-index and margin issues that obscure the main post image.
- **Update `PostHeader.tsx`**: Transition to `expo-image` and ensure the background glow is visible.
- **Component Consistency**: Audit and update `Dropdown.tsx` and `FilterModal.tsx` for URL consistency.

## Impact
- Affected specs: `specs/system-ui/spec.md`
- Affected code: `components/ui/Btn.tsx`, `components/layouts/PostBody.tsx`, `components/layouts/PostHeader.tsx`, `components/ui/Video.tsx`, `lib/api.ts` (or new helper), `global.css` (for interop).
