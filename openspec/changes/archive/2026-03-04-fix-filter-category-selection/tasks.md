# Tasks: Fix Filter Category Selection

## 1. Implement Single Category Selection in FilterModal
- [x] 1.1 Update `FilterModalProps` in `components/layouts/FilterModal.tsx` to replace `categoryIds` with `categoryId`.
- [x] 1.2 Replace `selectedCategories` array state with `selectedCategoryId` nullable number state.
- [x] 1.3 Update `toggleCategory` logic to set or unset a single ID.
- [x] 1.4 Update UI conditional styling to check against `selectedCategoryId`.
- [x] 1.5 Update `handleApplyFilters` to send the single `selectedCategoryId`.

## 2. Update ResultsScreen Filter Handling
- [x] 2.1 Update `onApplyFilters` callback in `screens/ResultsScreen.tsx` to handle `categoryId` instead of `categoryIds`.
- [x] 2.2 Correct the API query construction in `onApplyFilters` to use the single category ID directly.

## 3. Validation
- [x] 3.1 Verify only one category can be selected in the UI at a time.
- [x] 3.2 Verify the API call is correct (e.g., `posts/?category=5`) when applying filters.
