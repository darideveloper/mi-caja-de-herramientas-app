# Persistent Filter Settings

## Why
Users expect their filter preferences to be remembered when they navigate away or close the app. Currently, all selected filters (mood, category, duration) are reset when the `FilterModal` is closed or when navigating to the `ResultsScreen`.

## What Changes
- **MODIFIED** `lib/storage.ts`: Add methods to save and retrieve filter settings using `AsyncStorage`.
- **MODIFIED** `components/layouts/FilterModal.tsx`: Load saved filter settings when the modal is initialized and save them when "Aplicar" is pressed.
- **MODIFIED** `openspec/specs/filter/spec.md`: Add a new requirement for filter persistence.

## Impact
- Affected specs: `filter`
- Affected code: `lib/storage.ts`, `components/layouts/FilterModal.tsx`
