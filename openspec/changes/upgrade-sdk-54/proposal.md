# Upgrade to Expo SDK 54

## Context
The project is currently running on Expo SDK 53. The user reports that the app is not working in the Expo Go app, which suggests a version mismatch as Expo Go is often updated to support the latest SDKs.

## Goals
- Upgrade Expo SDK from 53 to 54.
- Migrate `expo-av` usage to `expo-audio` (as `expo-av` is deprecated).
- Ensure all dependencies are compatible with SDK 54.
- Verify functionality on iOS and Android via Expo Go.

## Code Changes
- **Refactor**: `components/ui/Audio.tsx` to use `expo-audio`.

## Non-Goals
- Major refactoring of existing features unless directly broken by the upgrade.
