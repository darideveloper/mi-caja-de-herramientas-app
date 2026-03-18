# PROPOSAL: Auto Guest Login on Refresh Failure

## Summary
The current JWT implementation in `lib/api.ts` correctly handles `accessToken` expiration by attempting to refresh it via `refreshTokens()`. However, if the `refreshToken` itself is expired or invalid (resulting in a 401 on the refresh endpoint), the application stops the request and returns an empty array. This results in a poor user experience as the content is not loaded.

This proposal aims to add an automatic fallback to `loginGuest()` when `refreshTokens()` fails. This ensures that the application remains functional by using the predefined guest credentials from environment variables.

## User-Visible Impact
- **Seamless Recovery**: If the session expires and the refresh fails, the application will automatically log in as a guest, ensuring content remains visible without manual user intervention.
- **Improved Reliability**: Fewer "empty states" or silent failures due to token expiration issues.

## Scope
- **MODIFIED**: `lib/api.ts` - Update `fetchData` logic to include a secondary fallback to `loginGuest()`.
- **MODIFIED**: `openspec/specs/auth/spec.md` - Update the "Expired Refresh Token" scenario to reflect the new fallback behavior.

## Out of Scope
- **Credential Storage**: No changes to how credentials are stored in `.env`.
- **UI Feedback**: No explicit notification to the user that a guest login occurred (it should be transparent).

## Risks & Trade-offs
- **Performance**: A full fallback (refresh fail -> login guest -> retry) could result in three sequential API calls. However, this is an edge case compared to normal operations.
- **Security**: This relies on the security of the guest credentials provided in the environment variables.
