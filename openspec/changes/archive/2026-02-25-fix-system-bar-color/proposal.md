# Proposal: Fix System Bar Color

The bottom system navigation bar (Android) and the root view background (iOS) currently do not match the brand purple color (`purpleDark: #3a2546`). This results in a visual inconsistency where the system-provided bottom bar (typically black or white) clashes with the application's brand identity and custom `Nav` component.

This proposal aims to set the system navigation bar color on Android and the root view background color on iOS to match the brand's primary dark purple color (`#3a2546`), ensuring a seamless visual experience across all devices and operating systems.

## Scope
- Update `app.json` with global system UI configurations for Android and iOS.
- Configure the Android navigation bar to use the brand purple color and light icons.
- Set the iOS root view background color to match the brand purple.
- Ensure the runtime environment (Expo) is correctly configured for these changes.

## Out of Scope
- Changes to the top status bar (already configured).
- Redesign of the `Nav` component itself.
- Per-screen navigation bar color variations (unless required for accessibility).
