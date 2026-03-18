# DESIGN: Auto Guest Login on Refresh Failure

## Core Components

### `lib/api.ts`
The `fetchData` function is the primary entry point for all API requests. It currently contains the logic for token refresh and retry.

#### Current Logic:
1.  Try to get `accessToken`.
2.  Perform request.
3.  If response status is `401` AND `data.code === 'token_not_valid'`:
    - Call `refreshTokens()`.
    - If `refreshTokens()` fails, log error and return `[]`.
    - If success, retry request ONCE with new token.

#### Proposed Logic:
1.  Try to get `accessToken`.
2.  Perform request.
3.  If response status is `401` AND `data.code === 'token_not_valid'`:
    - Call `refreshTokens()`.
    - **IF** `refreshTokens()` fails:
        - **THEN** Call `loginGuest()` from `lib/auth.ts`.
        - **IF** `loginGuest()` succeeds, update the token and proceed to retry.
        - **ELSE** log error and return `[]`.
    - If success (from either refresh or guest login), retry request ONCE with new token.

### `lib/auth.ts`
The `loginGuest()` function is already implemented and can be reused.

## Sequential Analysis (Edge Case)

1.  **Request Fails (401)**: User had an old session, but now both tokens are invalid.
2.  **Refresh Fails (401)**: `refreshTokens()` returns a non-200 status.
3.  **Guest Login Succeeds**: `loginGuest()` is called, it gets new guest tokens and saves them.
4.  **Retry Succeeds**: The original request is retried with the new guest token.

This ensures that even if a user's local session is corrupted or expired beyond refresh, the app gracefully falls back to a working guest session.

## Validation Strategy
Since there are no existing automated tests, verification will be manual by simulating an invalid `refreshToken` in `AsyncStorage`.
