# Spec Delta: Remote Image Reliability

This spec delta ensures that all remote images fetched from the API are rendered reliably using `expo-image`.

## ADDED Requirements

### Requirement: Reliable Remote Image Rendering
The application MUST render remote images (PNG/JPG) fetched from the API (S3) reliably across both iOS and Android platforms.

#### Scenario: Rendering Group Icons on Home Screen
- **Given** the app has fetched group data from `/api/groups/`
- **When** the Home screen is displayed
- **Then** the group icons must be visible inside the buttons, rendered using `expo-image` for maximum compatibility.

#### Scenario: Rendering Category Icons in Filter Modal
- **Given** the app has fetched category data from `/api/categories/`
- **When** the Filter Modal is opened
- **Then** the category icons must be visible next to the category names.

#### Scenario: Rendering Post Images
- **Given** a post has a valid `image` URL
- **When** the Post screen is displayed
- **Then** the main post image must be visible and correctly scaled.

#### Scenario: Rendering Video Overlay
- **Given** a video has a valid `overlaySrc` URL
- **When** the Video component is rendered with `autoPlay={false}`
- **Then** the overlay image must be visible, rendered using `expo-image`.
