# auth Specification Delta

## MODIFIED Requirements

### Requirement: Automatic Token Refresh on 401
The application MUST automatically attempt to refresh the JWT `accessToken` when a request fails with a 401 status and a "token_not_valid" code.

#### Scenario: Expired Refresh Token (Fallback to Guest Login)
- **GIVEN** the stored `refreshToken` is expired or invalid.
- **WHEN** `fetchData` attempts to refresh the token after a 401.
- **AND** the refresh request fails.
- **THEN** `fetchData` MUST attempt to log in as a guest using `loginGuest()`.
- **AND** if the guest login is successful, it MUST update the stored tokens.
- **AND** it MUST retry the original request with the new `accessToken`.
- **AND** if both refresh and guest login fail, it MUST return an empty array or handle the error gracefully.
