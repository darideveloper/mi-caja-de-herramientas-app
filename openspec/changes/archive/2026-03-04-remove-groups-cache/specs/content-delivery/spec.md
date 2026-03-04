# remove-groups-cache Specification Delta

## ADDED Requirements

### Requirement: Always Fetch Group Data from API
The application MUST fetch group data (moods/categories) from the API on every mount of the `GroupButtons` component to ensure content is always up-to-date.

#### Scenario: Displaying Home Screen Groups
- **GIVEN** the application is launched and the Home screen is displayed.
- **WHEN** the `GroupButtons` component mounts.
- **THEN** it MUST perform a network request to `/api/groups/`.
- **AND** it MUST NOT attempt to load this data from local persistence (AsyncStorage).
- **AND** it MUST NOT persist the fetched data back to AsyncStorage.
- **AND** the group buttons MUST be rendered once the API response is received.
