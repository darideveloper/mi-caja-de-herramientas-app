# Design: JWT Refresh System

## Overview
The goal is to implement a transparent token refresh mechanism in the `fetchData` function of `lib/api.ts`.

## Architecture
1. **Detection**: `fetchData` will monitor the HTTP status of responses.
2. **Evaluation**: If a `401 Unauthorized` status is returned, the response body will be checked for the error code `token_not_valid`.
3. **Refreshing**:
    - Retrieve `refreshToken` from `AsyncStorage`.
    - Call the refresh endpoint (e.g., `${EXPO_PUBLIC_API_BASE}/token/refresh/`) with the `refreshToken`.
    - If successful, update both `accessToken` and `refreshToken` in storage.
4. **Retry**: After a successful refresh, the original request is re-executed with the new `accessToken`.
5. **Logout on Failure**: If the `refreshToken` is also expired or invalid (e.g., another 401 during refresh), the app should ideally clear the tokens and potentially trigger a re-login flow.

## Considerations
- **Concurrency**: If multiple requests fail simultaneously, we should ensure only one refresh call is made. For simplicity in this first iteration, we will implement a basic sequential refresh.
- **Endpoint**: We assume the refresh endpoint is `/token/refresh/` following standard JWT patterns.
