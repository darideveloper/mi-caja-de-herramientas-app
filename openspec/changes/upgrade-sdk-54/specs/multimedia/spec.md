# Multimedia Support

## ADDED Requirements

### Requirement: Audio playback MUST work using `expo-audio`

The application MUST use the `expo-audio` library for playing audio files, replacing the deprecated `expo-av`.

#### Scenario: Play Audio
Given I am on a screen with audio content
When I tap the play button
Then the audio track plays
And the UI updates to show the playing state

#### Scenario: Pause Audio
Given an audio track is playing
When I tap the pause button
Then the audio output stops
And the UI updates to show the paused state
