# Platform Support

## ADDED Requirements

### Requirement: The application MUST run on Expo SDK 54

The project configuration and dependencies MUST be updated to target Expo SDK 54 to ensure compatibility with the latest Expo Go app and access new features.

#### Scenario: Startup
Given the project is installed
When I run `npx expo start`
Then the bundler starts without errors
And the Expo Go app can connect and load the bundle

#### Scenario: Dependencies
Given the `package.json` file
Then `expo` dependency is at version `^54.0.0`
And `react-native` dependency is compatible with Expo SDK 54
