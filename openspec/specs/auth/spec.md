# auth Specification

## Purpose
TBD - created by archiving change implement-jwt-refresh. Update Purpose after archive.
## Requirements
### Requirement: Automatic Token Refresh on 401
The application MUST automatically attempt to refresh the JWT `accessToken` when a request fails with a 401 status and a "token_not_valid" code.

#### Scenario: Expired Access Token
- **GIVEN** a valid `refreshToken` is stored in `AsyncStorage`.
- **AND** the stored `accessToken` is expired.
- **WHEN** `fetchData` is called for any endpoint.
- **THEN** the initial request MUST return a 401 status.
- **AND** `fetchData` MUST perform a POST request to `/api/token/refresh/` using the stored `refreshToken`.
- **AND** if the refresh is successful, it MUST update the stored `accessToken` and `refreshToken`.
- **AND** it MUST retry the original request with the new `accessToken`.
- **AND** it MUST return the results from the retried request to the caller.

#### Scenario: Expired Refresh Token
- **GIVEN** the stored `refreshToken` is expired or invalid.
- **WHEN** `fetchData` attempts to refresh the token after a 401.
- **THEN** the refresh request MUST fail.
- **AND** `fetchData` MUST return an empty array or handle the error gracefully to prevent UI crashes.

