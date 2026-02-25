# Tasks: Fix System Bar Color

- [x] **Install `expo-navigation-bar` and `expo-system-ui`**
    - `npx expo install expo-navigation-bar expo-system-ui`
    - *Validation*: Check `package.json` and ensure no build errors.

- [x] **Configure `app.json` (Static Settings)**
    - Add `backgroundColor: "#3a2546"` at the top level.
    - Add `androidNavigationBar: { backgroundColor: "#3a2546", barStyle: "light-content" }` inside the `expo` object.
    - *Validation*: Inspect `app.json` for correct structure.

- [x] **Update `App.tsx` (Runtime Settings)**
    - Import `expo-navigation-bar` (as `NavigationBar`) and `expo-system-ui` (as `SystemUI`).
    - Use `SystemUI.setBackgroundColorAsync("#3a2546")` in the root component (outside the `App` component or in a `useEffect`).
    - Set `NavigationBar.setBackgroundColorAsync("#3a2546")` and `NavigationBar.setButtonStyleAsync("light")` for Android in a `useEffect`.
    - *Validation*: Confirm imports and runtime logic in `App.tsx`.

- [x] **Update `lib/safeArea.ts` (Visual Buffering)**
    - Ensure `getBottomPadding` provides adequate spacing for the system navigation bar when it's colored similarly to the `Nav` component.
    - *Validation*: Review logic for Android and iOS in `lib/safeArea.ts`.

- [x] **Verify Consistency Across Screens**
    - Check if `RootLayout.tsx`'s `bg-purple` (lighter purple) background matches the `purpleDark` navigation bar visually, or if it should be updated to `purpleDark` as the root container.
    - *Validation*: Run the app on Android and iOS and verify the bottom bar color matches the brand purple (`#3a2546`).
