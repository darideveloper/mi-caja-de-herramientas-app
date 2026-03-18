# filter Specification

## MODIFIED Requirements

### Requirement: Filter Persistence
The `FilterModal` SHALL persist and restore the user's selected filters across application sessions using local storage.

#### Scenario: Saving filters on apply
- **GIVEN** the `FilterModal` is open and the user has modified one or more filter values (group, category, or duration).
- **WHEN** the user taps "Aplicar".
- **THEN** the application SHALL save the selected filter values to local storage before applying them.

#### Scenario: Restoring filters on open
- **GIVEN** the `FilterModal` is being opened.
- **WHEN** the application has previously saved filter values in local storage.
- **THEN** the `FilterModal` SHALL automatically restore these values as the initial selection.
- **AND** if a stored ID is no longer valid (e.g., deleted from the server), the `FilterModal` SHALL gracefully default to no selection or the first available option.

#### Scenario: No persistence on cancel
- **GIVEN** the `FilterModal` is open and the user has modified one or more filter values.
- **WHEN** the user taps "Cancelar".
- **THEN** the application SHALL NOT save any changes to local storage.
- **AND** the previously saved values SHALL remain unchanged in storage.
