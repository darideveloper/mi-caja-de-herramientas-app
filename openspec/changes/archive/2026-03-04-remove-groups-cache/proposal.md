# Change: Remove Groups Caching and Always Fetch from API

## Why
Currently, the application implements a "cache-first" strategy for groups (moods/categories) to improve perceived performance. However, this causes inconsistencies when groups change on the server. This proposal aims to transition the groups loading strategy to "network-always" to ensure users always see the most up-to-date categories.

## What Changes
- Remove groups data persistence in `AsyncStorage`.
- Ensure `GroupButtons` (moods/categories) component always fetches fresh data from the API on mount.
- Clean up unused storage utilities and documentation.

## Goals
- Remove groups data persistence in `AsyncStorage`.
- Ensure `GroupButtons` (moods/categories) component always fetches fresh data from the API on mount.
- Clean up unused storage utilities and documentation.

## Scope
- `components/layouts/GroupButtons.tsx`: Modify `loadGroups` to bypass `AsyncStorage`.
- `store/groups.ts`: Remove or delete this file as it becomes redundant.
- `docs/storage.md`: Update documentation to reflect the removal of groups caching.
