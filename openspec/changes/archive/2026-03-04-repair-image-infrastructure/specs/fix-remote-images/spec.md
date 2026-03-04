## MODIFIED Requirements

### Requirement: Reliable Remote Image Rendering
The application MUST render remote images (PNG/JPG) fetched from the API (S3) reliably across both iOS and Android platforms by ensuring absolute URLs and proper NativeWind integration.

#### Scenario: Rendering Group Icons on Home Screen
- **GIVEN** the app has fetched group data from `/api/groups/`
- **WHEN** the Home screen is displayed
- **THEN** the group icons must be visible inside the buttons, rendered using `expo-image` with correctly applied `className` styles.

#### Scenario: Rendering Category Icons in Filter Modal
- **GIVEN** the app has fetched category data from `/api/categories/`
- **WHEN** the Filter Modal is opened
- **THEN** the category icons must be visible next to the category names, resolved to absolute URLs if relative.

#### Scenario: Rendering Post Images
- **GIVEN** a post has a valid (absolute or relative) `image` URL
- **WHEN** the Post screen is displayed
- **THEN** the main post image must be visible, correctly scaled, and not obscured by negative z-indices or margins.

#### Scenario: Rendering Link Icons in Post Body
- **GIVEN** a post has link objects with `icon` URLs
- **WHEN** the Post screen is displayed
- **THEN** the link icons inside the buttons must be visible and have the specified `className` dimensions (e.g., `w-14 h-14`).

#### Scenario: Rendering Local Assets
- **GIVEN** a component uses a local asset via `require('../../assets/...')`
- **WHEN** the component is rendered
- **THEN** the local asset must be visible even when using `expo-image` with NativeWind `className` props.
