# Design: Single Category Selection in Filters

## Context
The application allows users to filter posts based on mood (group), category, and duration. While the UI currently permits multiple category selections, the API is only designed to handle one category per request.

## Goals
- Align the filter UI with API capabilities by restricting category selection to a single item.
- Simplify the state management for categories in `FilterModal`.
- Ensure consistent data types throughout the filtering flow.

## Decisions

### 1. Simplify `FilterModal` State
Replace the array of selected category IDs with a single nullable ID.
- **Before**: `const [selectedCategories, setSelectedCategories] = useState<number[]>([]);`
- **After**: `const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);`

### 2. Update Selection Logic
The `toggleCategory` function will now either set the new category ID or unset it if it's already selected.
- **Action**: Clicking a selected category deselects it. Clicking an unselected category selects it and deselects any previous choice.

### 3. Adjust Component Interface
Update `FilterModalProps` to use `categoryId?: number` instead of `categoryIds: number[]`.

### 4. Update API Query Construction
In `ResultsScreen.tsx`, the `onApplyFilters` callback will receive a single category ID. The query param `category` will be set directly to this ID.

## Risks / Trade-offs
- **Risk**: Some users might have expected multi-selection if they previously saw it.
- **Mitigation**: The UI clearly highlights the single active selection, making the behavior intuitive.

## Migration Plan
1. Update `FilterModal.tsx` types and state.
2. Update `FilterModal.tsx` UI to use `selectedCategoryId`.
3. Update `ResultsScreen.tsx` to handle the new callback signature.
4. Verify API requests show `category=ID` instead of `category=ID1,ID2`.
