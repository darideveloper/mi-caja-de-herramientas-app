# filter Specification

## Purpose
TBD - created by archiving change fix-filter-category-selection. Update Purpose after archive.
## Requirements
### Requirement: Single Category Selection
The `FilterModal` SHALL allow users to select at most one category at a time from the available options.

#### Scenario: Selecting a category
- **GIVEN** the `FilterModal` is open and no category is selected.
- **WHEN** the user taps on a category icon/label.
- **THEN** that category SHALL be marked as selected.
- **AND** any other previously selected category SHALL be deselected.

#### Scenario: Deselecting a category
- **GIVEN** the `FilterModal` is open and a category is already selected.
- **WHEN** the user taps on the same selected category icon/label.
- **THEN** the category SHALL be deselected.
- **AND** no category SHALL be marked as selected.

### Requirement: Apply Filter with Single Category
When filters are applied, only the single selected category ID SHALL be sent to the API.

#### Scenario: Applying filters with one category
- **GIVEN** the user has selected a single category in the `FilterModal`.
- **WHEN** the user taps "Aplicar".
- **THEN** the application SHALL perform a network request to `/api/posts/` with the `category` parameter set to the selected category ID.
- **AND** the request SHALL NOT contain multiple category IDs joined by commas.

