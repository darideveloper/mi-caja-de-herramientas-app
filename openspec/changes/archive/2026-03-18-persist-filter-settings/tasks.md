# Persistent Filter Settings Tasks

- [x] **Task 1: Update Storage Utility**
  - [x] Add `APPLIED_FILTERS_KEY` to `lib/storage.ts`.
  - [x] Implement `saveFilters` and `getFilters` in the `storage` object.
  - [x] Add `AppliedFilters` interface to `lib/storage.ts`.

- [x] **Task 2: Update FilterModal Component**
  - [x] Import `storage` from `../../lib/storage`.
  - [x] Use `useEffect` to load stored filters on mount.
  - [x] Update groups fetching logic to use stored `groupId` if available.
  - [x] Update categories fetching logic to use stored `categoryId` if available.
  - [x] Ensure `selectedDuration` is initialized from stored value.
  - [x] Update `handleApplyFilters` to call `storage.saveFilters` before `onApplyFilters`.
  - [x] Added `useEffect` for `isVisible` to reset state to stored values on open.

- [x] **Task 3: Update Filter Specification**
  - [x] Add "Filter Persistence" requirement to `openspec/specs/filter/spec.md`.
  - [x] Include scenarios for loading stored filters and saving filters on apply.

- [x] **Task 4: Validation**
  - [x] Verify that filters are correctly loaded when opening the `FilterModal`.
  - [x] Verify that filters are correctly saved when clicking "Aplicar".
  - [x] Verify that "Cancelar" does not save the current selections.
