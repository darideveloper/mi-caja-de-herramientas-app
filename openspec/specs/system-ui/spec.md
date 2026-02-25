# system-ui Specification

## Purpose
TBD - created by archiving change fix-system-bar-color. Update Purpose after archive.
## Requirements
### Requirement: Android Navigation Bar Color MUST match brand
The bottom system navigation bar on Android MUST match the brand purple color (`#3a2546`).
#### Scenario: Launching the App on Android
- **GIVEN** the application is installed on an Android device.
- **WHEN** the user launches the application.
- **THEN** the system navigation bar (at the bottom) background color MUST be `#3a2546`.
- **AND** the navigation bar icons (back, home, recents) MUST be a light color (white) for accessibility.

### Requirement: iOS Root View Background Color MUST match brand
The root view background color on iOS MUST match the brand purple color (`#3a2546`).
#### Scenario: Launching the App on iOS
- **GIVEN** the application is installed on an iOS device.
- **WHEN** the user launches the application and navigates to any screen.
- **THEN** the root view background (visible behind the home indicator and in safe areas) MUST be `#3a2546`.
- **AND** the status bar MUST be a light color (already configured, but must be consistent).

### Requirement: Global Brand Identity Consistency SHALL be maintained
The brand's primary dark purple (`#3a2546`) SHALL be the default background for all system-level UI elements (bars, splash screen, and root background).
#### Scenario: Consistency Check
- **GIVEN** the app's splash screen background is `#3a2546`.
- **WHEN** the transition from splash screen to the main application view occurs.
- **THEN** there SHOULD NOT be any visual jump or flash of a different color (like white or black) in the system bars or the root background area.

