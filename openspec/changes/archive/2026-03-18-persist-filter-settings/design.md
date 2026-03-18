# Persistent Filter Settings Design

## Problem
The current application allows users to filter content by mood (group), category, and duration, but these selections are lost when the user navigates away or closes the filter modal. Users expect their preferences to be remembered.

## Solution
Use React Native's `AsyncStorage` via the existing `lib/storage.ts` utility to persist and retrieve filter settings.

### Detailed Changes

#### 1. `lib/storage.ts`
Add a new key `APPLIED_FILTERS_KEY = 'applied_filters'` and two new methods:
- `saveFilters(filters: AppliedFilters): Promise<void>`
- `getFilters(): Promise<AppliedFilters | null>`

```typescript
export interface AppliedFilters {
  groupId?: number;
  categoryId?: number;
  duration?: number;
}
```

#### 2. `components/layouts/FilterModal.tsx`

**State initialization:**
The component will fetch stored filters on mount and apply them to `selectedGroup`, `selectedCategoryId`, and `selectedDuration`.

**Fetching logic update:**
- In the `useEffect` that fetches `groups`, after receiving the data, if a stored `groupId` exists, the corresponding group will be selected from the list.
- In the `useEffect` that fetches `categories`, after receiving the data, if a stored `categoryId` exists, it will be set as selected.

**Persistence on apply:**
- `handleApplyFilters` will call `storage.saveFilters` with the current selection before triggering `onApplyFilters`.

### State Management Detail

```typescript
// Example of the updated groups fetch
useEffect(() => {
  setGroupsLoading(true);
  fetchData('groups')
    .then(async (data: any) => {
      setGroups(data);
      const stored = await storage.getFilters();
      if (stored?.groupId) {
        const group = data.find((g: any) => g.id === stored.groupId);
        setSelectedGroup(group || data[0] || null);
      } else {
        setSelectedGroup(data[0] || null);
      }
      setGroupsLoading(false);
    })
    ...
```

```typescript
// Example of the updated categories fetch
useEffect(() => {
  setCategoriesLoading(true);
  fetchData('categories')
    .then(async (data: any) => {
      setCategories(data);
      const stored = await storage.getFilters();
      if (stored?.categoryId) {
        setSelectedCategoryId(stored.categoryId);
      }
      setCategoriesLoading(false);
    })
    ...
```

```typescript
// Initial duration from storage
useEffect(() => {
  const loadDuration = async () => {
    const stored = await storage.getFilters();
    if (stored?.duration) {
      setSelectedDuration(stored.duration);
    }
  };
  loadDuration();
}, []);
```

## Data Model
```json
{
  "groupId": 123,
  "categoryId": 456,
  "duration": 15
}
```

## Risks and Trade-offs
-   **Stale IDs**: If a group or category is deleted on the server, the stored ID will be invalid. The `FilterModal` handles this by defaulting to `data[0]` (for groups) or `null` if the stored ID is not found in the list.
