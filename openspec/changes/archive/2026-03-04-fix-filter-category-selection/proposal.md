# Change: Fix Filter Category Selection

## Why
Currently, the `FilterModal` allows selecting multiple categories simultaneously, but the backend API only supports filtering by a single category. This discrepancy leads to unexpected behavior or potential errors when applying multiple filters.

## What Changes
- **MODIFIED** `FilterModal.tsx`: Change category selection logic from multiple (array) to single (number | null).
- **MODIFIED** `ResultsScreen.tsx`: Update filter application callback to handle a single category ID instead of an array and construct the API query correctly.
- **MODIFIED** `FilterModalProps` interface: Update `onApplyFilters` to reflect single category selection.

## Impact
- Affected specs: `filter` (new capability spec)
- Affected code: `components/layouts/FilterModal.tsx`, `screens/ResultsScreen.tsx`
