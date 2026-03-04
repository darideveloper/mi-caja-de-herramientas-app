---
id: implement-jwt-refresh
title: Implement JWT Refresh System
status: implemented
author: Gemini CLI
---

# Proposal: Implement JWT Refresh System

## Why
The application uses JWT tokens for authentication, but it lacks a refresh mechanism. When the `accessToken` expires (as evidenced by 401 errors from the API), the app fails to fetch data, and the UI crashes because it expects an array but receives an error object.

## What Changes
Update the API fetch logic in `lib/api.ts` to automatically handle 401 errors. If a 401 is received due to an expired token, the app should attempt to refresh the token using the `refreshToken` stored in `AsyncStorage`. If successful, it should retry the original request with the new token.

## Capabilities
- **auth**: Update authentication logic to handle token expiration and refreshing.
