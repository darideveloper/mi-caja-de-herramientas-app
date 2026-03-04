# Design: Repair Image Infrastructure

## Context
The application transitioned to `expo-image` but images are not visible. This is a regression in both remote and local asset rendering caused by how NativeWind v4 interacts with non-primitive components.

## Goals
- Render all local assets correctly in buttons and headers.
- Render all remote API images (S3) by ensuring absolute URLs.
- Fix layout issues that hide images behind background elements.

## Decisions

### 1. Register `expo-image` with NativeWind
We will add `cssInterop` for `Image` from `expo-image`. NativeWind v4 only maps `className` to styles for standard primitives (`View`, `Text`, etc.). For third-party components like `expo-image`, we must explicitly register them.
**Note**: Since `expo-image` is used throughout the app, we will register it in a global location (e.g., `App.tsx` or `global.css` if handled via NativeWind plugin, but `App.tsx` is more direct).

### 2. URL Normalization Helper
Remote image paths from the API are often relative (e.g., `/media/images/...`). While a browser can resolve these, a mobile app cannot. We will implement `getAbsoluteUrl(url)` in `lib/api.ts` or a dedicated `lib/images.ts`.
- **Logic**: If the URL starts with `http` or `https`, return it as is. Otherwise, prepend `EXPO_PUBLIC_API_BASE`.

### 3. Layout Refactor in `PostBody.tsx`
The current `-z-10` on the `body` container in `PostBody.tsx` pushes the entire content behind the background if not careful. We will replace this with proper absolute positioning or padding that doesn't affect visibility.
- **Problem**: `-z-10` + `-mt-12` on a `View` with `bg-white` might be pushing the image *under* the `PostHeader`.
- **Solution**: Use relative positioning with positive z-index or adjust margins without affecting the layering.

### 4. Updating Components to use absolute URLs
Components that fetch data directly (`FilterModal`, `Dropdown`, `PostBody`, `GroupButtons`) will pass their image URIs through the normalization helper.

## Alternatives considered
- **Reverting to standard RN `Image`**: Standard `Image` is less reliable for S3/Redirects and doesn't handle caching as well as `expo-image`. The interop fix is the superior technical path.
- **Using `style` props everywhere**: This would work but bypasses the project's preference for NativeWind (`className`). Registering `cssInterop` is the correct "NativeWind way".

## Risks / Trade-offs
- **cssInterop Performance**: Negligible for a small number of registered components.
- **URL Handling**: If `EXPO_PUBLIC_API_BASE` is misconfigured, all remote images will fail. We must ensure the base URL is consistent (e.g., including or excluding the trailing slash).

## Migration Plan
1. Update `App.tsx` or a dedicated config file with `cssInterop`.
2. Update `lib/api.ts` with `getAbsoluteUrl`.
3. Update `Btn.tsx`, `PostBody.tsx`, `FilterModal.tsx`, `Dropdown.tsx`, and `GroupButtons.tsx`.
4. Replace `Image` in `PostHeader.tsx` with `expo-image` for consistency.
