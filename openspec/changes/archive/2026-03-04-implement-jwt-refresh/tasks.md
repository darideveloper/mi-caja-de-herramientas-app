# Tasks: Implement JWT Refresh System

- [x] Create `refreshTokens` function in `lib/auth.ts` to call the `/token/refresh/` endpoint.
- [x] Refactor `fetchData` in `lib/api.ts` to handle 401 responses.
- [x] Implement retry logic in `fetchData` after a successful token refresh.
- [x] Add error handling for failed refresh attempts (e.g., return empty array/log error).
- [x] Verify fix by simulating an expired token or waiting for token expiration.
