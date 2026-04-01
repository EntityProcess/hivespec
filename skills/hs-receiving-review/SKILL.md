---
name: hs-receiving-review
description: >-
  Use when receiving code review feedback on a PR, before implementing any
  suggestions. Triggers when a reviewer comments, requests changes, or when
  asked to "address review feedback", "fix review comments", or "respond to
  reviewer". Prevents blind implementation and performative agreement.
---

# Receiving Review

## Overview

Code review requires technical evaluation, not emotional performance. Verify before implementing. Push back with reasoning if wrong.

## Response Protocol

```
1. READ — complete feedback without reacting
2. UNDERSTAND — restate requirement in own words (or ask)
3. VERIFY — check against codebase reality
4. EVALUATE — technically sound for THIS codebase?
5. RESPOND — technical acknowledgment or reasoned pushback
6. IMPLEMENT — one item at a time, test each
```

## Forbidden Responses

Never write: "You're absolutely right!", "Great point!", "Thanks for catching that!"

Instead: restate the technical requirement, or just fix it. Actions > words.

## Handling Unclear Feedback

If any item is unclear, **stop — do not implement anything yet**. Ask for clarification on all unclear items first. Items may be related — partial understanding leads to wrong implementation.

## Before Implementing External Feedback

```
1. Technically correct for THIS codebase?
2. Breaks existing functionality?
3. Reason for current implementation?
4. Works on all platforms/versions?
5. Does reviewer understand full context?
```

If suggestion seems wrong: push back with technical reasoning.

If conflicts with user's prior decisions: stop and discuss with user first.

## When to Push Back

- Suggestion breaks existing functionality
- Reviewer lacks full context
- Violates YAGNI (unused feature — grep codebase for actual usage)
- Technically incorrect for this stack
- Legacy/compatibility reasons exist
- Conflicts with architectural decisions

**How:** technical reasoning, specific questions, reference working tests/code.

## Implementation Order

For multi-item feedback:
1. Clarify anything unclear FIRST
2. Blocking issues (breaks, security)
3. Simple fixes (typos, imports)
4. Complex fixes (refactoring, logic)
5. Test each fix individually
6. Verify no regressions

## Common Mistakes

| Mistake | Fix |
|---|---|
| Performative agreement | State requirement or just act |
| Blind implementation | Verify against codebase first |
| Batch without testing | One at a time, test each |
| Assuming reviewer is right | Check if it breaks things |
| Avoiding pushback | Technical correctness > comfort |
| Partial implementation | Clarify all items first |

## GitHub Thread Replies

Reply in the comment thread (`gh api repos/{owner}/{repo}/pulls/{pr}/comments/{id}/replies`), not as a top-level PR comment.
