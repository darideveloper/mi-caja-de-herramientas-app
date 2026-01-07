# Project Context

## Purpose
"Mi Caja de Herramientas" (My Toolbox) is a React Native mobile application built with Expo. It appears to be a utility application designed to provide various tools or resources to the user, managing navigation through a custom UI implementation.

## Tech Stack
- **Core Framework**: React Native (via Expo SDK 53)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: React Navigation v7 (Native Stack)
- **State Management**: React Context API
- **Icons**: React Icons
- **Animations**: React Native Reanimated
- **Multimedia**: Expo AV, Expo Video, Expo Audio

## Project Conventions

### Code Style
- **Formatting**: Prettier (Universe preset) with Tailwind plugin.
- **Linting**: ESLint (Universe preset).
- **Styling**: Functional components with Tailwind CSS classes via `className` prop (NativeWind).
- **Imports**: standard ES6 imports.

### Architecture Patterns
- **Directory Structure**:
    - `/screens`: Top-level route components.
    - `/components`: Reusable UI elements.
    - `/components/layouts`: Layout-specific components (Nav, Header, Drawer).
    - `/context`: Global state providers.
    - `/assets`: Static assets.
    - `/types`: TypeScript definitions.
- **Navigation**:
    - Uses `NativeStackNavigator` for routing but hides default headers (`headerShown: false`).
    - Implements custom overlay Navigation (`Nav`, `Header`, `DrawerMenu`) handled in `App.tsx`.
- **Safe Area**: Handled via `react-native-safe-area-context`.

### Testing Strategy
- Currently no dedicated test runner (Jest/RNTL) configured in `package.json`.

### Git Workflow
- Standard feature-branch workflow implies.

## Domain Context
- The app uses a "Drawer" menu pattern and a bottom navigation bar (`Nav`), both manually controlled in `App.tsx`.
- Dark mode UI seems prevalent (`userInterfaceStyle: "dark"` in `app.json`, dark colors in `tailwind.config.js`).

## Important Constraints
- **Navigation Structure**: The app manually manages the visibility of the Drawer and the active screen name state in `App.tsx`, rather than strictly relying on React Navigation's built-in drawer navigator or bottom tabs navigator.
- **Layout**: `global.css` is imported in the entry file.

## External Dependencies
- Expo ecosystem.
