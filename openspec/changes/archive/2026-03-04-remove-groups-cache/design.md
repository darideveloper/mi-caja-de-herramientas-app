# Design: Transitioning from Cache-First to Network-Only Groups

The current implementation uses `AsyncStorage` to store groups (moods) under the key `groups`. The loading strategy is implemented in `components/layouts/GroupButtons.tsx` as follows:
1. `getGroups()` from `AsyncStorage`.
2. If found, set state and finish.
3. If not, `fetchData('groups')`, `setGroups(data)` in `AsyncStorage`, and set state.

## Proposed Architectural Change
The new strategy will be:
1. `fetchData('groups')` from the API.
2. Set state and finish.

This removes the need for `AsyncStorage` persistence for groups.

### Impact on Storage
- The `groups` key in `AsyncStorage` will no longer be used.
- The utility file `store/groups.ts` which provides `getGroups`, `setGroups`, and `clearGroups` will be deleted to avoid confusion and redundant code.
- Any references to this caching strategy in `docs/storage.md` will be updated to clarify that groups are now always fetched from the network.

### Performance Consideration
Fetching from the API on every mount might introduce a small delay (spinner visibility). However, this ensures data consistency which is prioritized in this change.
