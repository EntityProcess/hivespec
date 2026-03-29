---
name: hs-verify
description: >-
  Use when implementation is complete and you need to prove it works before claiming
  completion, when asked to "verify", "test end-to-end", "run e2e", "check the blast
  radius", "review the code", or before any claim that the work is "done", "complete",
  "ready", or "passing".
---

# Verify

## Overview

Prove the implementation works before claiming completion. E2E red/green testing, code review, blast radius check, and verification evidence. No completion claims without fresh evidence.

## Iron Law

**No completion claims without verification evidence.** Run the command, read the output, THEN claim the result. "Should work", "I'm confident", and "tests are passing" (without output) are not evidence.

## Process

### Step 1: Build, test, lint

Run the full check chain and capture the output:

```bash
bun run build && bun run test && bun run lint
```

All three must pass. If any fails, fix it before proceeding.

### Step 2: E2E red/green protocol

Unit tests prove units work. E2E verification proves the feature works. Both are required.

1. **Red E2E** — verify current behavior before your changes (establish baseline). If on a worktree branch, check out main temporarily or use the main worktree.
2. **Green E2E** — verify new behavior matches expectations after your changes.
3. **All modes** — identify all user-facing entry points that exercise the change. Test each one. A feature that works in mode A but not mode B is a bug.

Run the actual feature as a user would — create real test data, exercise the real pipeline, hit the real API. Do not substitute unit test output for e2e verification.

### Step 3: Blast radius check

After implementation, grep for the modified type/function across the entire codebase:

```bash
# For each modified type, interface, or shared function:
grep -r "TypeName\|functionName" --include="*.ts" .
```

Any untouched consumer is a potential regression. This check is mandatory for changes to types, interfaces, or shared utilities.

### Step 4: Code review

Dispatch an isolated reviewer subagent with:

- The diff (`git diff main...HEAD`)
- The design spec (if one exists)
- The implementation plan (if one exists)
- Instructions to review for spec compliance first, then code quality

**Receiving review feedback:**

Review feedback requires technical evaluation, not emotional performance.

**The response pattern:**
1. **READ** — complete feedback without reacting
2. **UNDERSTAND** — restate the requirement in your own words. If unclear, STOP — do not implement anything until all items are clarified. Items may be related; partial understanding leads to wrong implementation.
3. **VERIFY** — check against codebase reality. Is the suggestion technically correct for THIS codebase?
4. **EVALUATE** — is it sound? Does it break existing functionality? Does the reviewer have full context?
5. **RESPOND** — technical acknowledgment or reasoned pushback. Then implement (or don't).

**Forbidden responses:**
- NEVER: "You're absolutely right!", "Great point!", "Let me implement that right away"
- Instead: restate requirement, verify technically, then act or push back

**YAGNI check for "professional" suggestions:**
If a reviewer suggests "implementing properly" or adding abstraction, grep the codebase for actual usage. If unused: push back with "Remove it (YAGNI)?". If used: implement properly.

**When to push back:**
- Suggestion breaks existing functionality
- Reviewer lacks context about why current implementation exists
- Violates YAGNI (adds unused abstraction)
- Technically incorrect for this stack/codebase
- Conflicts with architectural decisions in the design spec

**Acknowledging correct feedback:**
- "Fixed. [Description]"
- "Good catch — [specific issue]. Fixed in [location]."
- Or just fix it silently and show in the diff

### Step 5: Final evidence

Before proceeding to hs-ship, confirm:

- [ ] Build passes (with output)
- [ ] All tests pass (with output showing test count)
- [ ] Lint passes (with output)
- [ ] E2E red/green completed (with evidence of both states)
- [ ] All execution modes tested
- [ ] Blast radius check completed (no untouched consumers of modified interfaces)
- [ ] Code review feedback addressed

## Verification Red Flags — Stop Immediately

- Using "should", "probably", "seems to" when describing results
- Expressing satisfaction before running verification commands
- About to commit/push/PR without fresh verification output
- Relying on a previous run instead of running again now
- Trusting subagent success reports without checking output
- ANY wording implying success without showing command output

## Hard Gates

- Must run build, tests, and lint before claiming completion
- Must have verification command output as evidence
- E2E must show red-then-green (not just green)
- Must check blast radius for any change to types, interfaces, or shared utilities
