# Tasks: Repair Image Infrastructure

## 1. Setup & Utilities
- [x] 1.1 Register `expo-image` with NativeWind in `App.tsx` (using `cssInterop`).
- [x] 1.2 Implement `getAbsoluteUrl` helper in `lib/api.ts`.

## 2. Component Updates
- [x] 2.1 Update `components/ui/Btn.tsx` to handle `className` correctly for `expo-image`.
- [x] 2.2 Update `components/layouts/GroupButtons.tsx` to use `getAbsoluteUrl` for remote icons.
- [x] 2.3 Update `components/layouts/FilterModal.tsx` to use `getAbsoluteUrl` for category and group icons.
- [x] 2.4 Update `components/ui/Dropdown.tsx` to use `getAbsoluteUrl` for option icons.
- [x] 2.5 Refactor `components/layouts/PostBody.tsx`:
    - Fix z-index (`-z-10`) and negative margins (`-mb-52`, `-mb-28`).
    - Use `getAbsoluteUrl` for the main post image and link icons.
- [x] 2.6 Update `components/layouts/PostHeader.tsx` to use `expo-image` for its background and Fav icon.

## 3. Validation
- [x] 3.1 Verify group icons are visible on the Home screen.
- [x] 3.2 Verify category and group icons are visible in the Filter Modal.
- [x] 3.3 Verify main post image is visible in the Post screen and not clipped or behind the background.
- [x] 3.4 Verify link icons in the Post screen are correctly sized and visible.
- [x] 3.5 Verify local icons (Close, Fav, Back) are visible.
