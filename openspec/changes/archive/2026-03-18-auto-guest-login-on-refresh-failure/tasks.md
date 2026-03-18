# TASKS: Auto Guest Login on Refresh Failure

## Pre-requisites
- [x] Analyze `lib/api.ts` and `lib/auth.ts` logic.
- [x] Design the fallback flow.

## Implementation
- [x] Update `lib/api.ts` to include `loginGuest` in the fallback flow of `fetchData`.
- [x] Update `openspec/specs/auth/spec.md` with new requirement scenario.

## Verification
- [x] Verify `fetchData` retries with `loginGuest` when `refreshTokens` fails.
- [x] Verify `fetchData` still returns `[]` if both `refreshTokens` and `loginGuest` fail.
