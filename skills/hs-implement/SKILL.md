---
name: hs-implement
description: >-
  Use when executing an implementation plan task-by-task, writing code with TDD
  discipline, dispatching subagents for independent tasks, or debugging failures.
  Triggers when asked to "implement the plan", "start coding", "write the code",
  "execute the tasks", or when a plan exists and implementation has not started.
---

# Implement

## Overview

Execute the plan task-by-task with TDD discipline. Dispatch subagents for independent tasks. Debug systematically when things break.

## Hard Gate

Must have a plan to execute. If no plan exists at `.agents/plans/*-plan.md` on the current branch, stop and tell the user to run hs-plan first. Exception: trivial changes (< 5 lines, docs, config) may proceed without a plan.

## TDD Protocol

**Iron law: No production code without a failing test first.** If you didn't watch the test fail, you don't know if it tests the right thing.

For every task:

### RED — Write the failing test

1. **Write one minimal test** showing what should happen
2. **Run it — must fail (red).** If it passes, the test is wrong or the feature already exists. Investigate.
3. **Verify the failure:** Must fail because the feature is missing, not because of typos, import errors, or syntax mistakes. The failure message should describe the missing behavior.

### GREEN — Write minimal implementation

4. **Write the simplest code** to make the test pass — no over-engineering, no feature-creeping
5. **Run it — must pass (green).** If it fails, debug (see Systematic Debugging below). Fix the code, not the test.

### REFACTOR

6. **Refactor** if needed — remove duplication, improve names, extract helpers. Tests must still pass. Do not add new behavior during refactor.
7. **Run full pre-commit checks:** build → test → lint
8. **Commit**

Before each commit, run the full pre-commit check chain. If the repo has pre-commit hooks, run them explicitly rather than discovering failures on push:

```bash
bun run build && bun run test && bun run lint
```

Adapt the commands to the repo's actual toolchain (read from CLAUDE.md/AGENTS.md/package.json).

### TDD Rationalizations — Do Not Fall For These

| Thought | Reality |
|---|---|
| "Too simple to test" | Simple code breaks. The test takes 30 seconds to write. |
| "I'll write the test after" | A test that passes immediately proves nothing — you never saw it fail. |
| "I already tested it manually" | Ad-hoc verification is not systematic and cannot be re-run. |
| "Just this once without a test" | There is no "just this once." The discipline is the point. |
| "I wrote code already, I'll test it now" | Delete the code. Write the test. Watch it fail. Rewrite the code. |

### TDD Red Flags — Stop and Start Over

- You wrote code before writing a test
- Your test passes on the first run (you're testing existing behavior, not new behavior)
- You can't explain why the test failed
- You're rationalizing skipping the cycle

## Subagent Dispatch

When 2+ tasks are independent with no shared state, dispatch them in parallel:

- **Fresh subagent per task** — no context pollution between tasks
- **Each subagent gets:** the plan, the specific task, and any relevant context files
- **Model selection:** use cheaper models for mechanical tasks (rename, move, format), capable models for judgment tasks (architecture, complex logic)

### Subagent Review Protocol

After each subagent completes, review in two stages:

1. **Spec compliance** — does the output match the plan's requirements?
2. **Code quality** — is the code clean, tested, and consistent with the codebase?

Load `references/spec-reviewer-prompt.md` and `references/code-quality-reviewer-prompt.md` for reviewer instructions.

### Subagent Status Handling

| Status | Action |
|---|---|
| DONE | Accept, move to next task |
| DONE_WITH_CONCERNS | Review concerns, fix if valid, accept if not |
| NEEDS_CONTEXT | Provide missing context, re-dispatch |
| BLOCKED | Investigate blocker, unblock or escalate to user |

## Systematic Debugging

**Iron law:** No fixes without root cause investigation first. "It might be X" is not a root cause.

### Phase 1: Root Cause Investigation

1. **Read the full error message** — not just the first line. Error messages often contain the exact solution.
2. **Reproduce consistently** — exact steps, every time. If you can't reproduce it, you can't verify the fix.
3. **Check recent changes** — `git diff`, recent commits, environment differences.
4. **Trace data flow** — where does the bad value originate? What called this with the bad value? Keep tracing upstream until you find the source. Fix at the source, not the symptom.
5. **In multi-component systems:** log what enters and exits each component boundary. Verify environment/config propagation. Check state at each layer to identify WHERE it breaks.

### Phase 2: Pattern Analysis

1. **Find working examples** — is there similar code in the codebase that works?
2. **Compare against references** — read the working version completely, understand it fully.
3. **Identify differences** — list every difference, however small.

### Phase 3: Hypothesis and Fix

1. **Form a single hypothesis:** "I think X is the root cause because Y"
2. **Test minimally** — ONE variable at a time. Re-run after each change.
3. **Do not retry blindly** — if the same command fails twice, the problem is not transient.
4. **Do not abandon a viable approach after one failure** — diagnose before switching tactics.
5. **When stuck:** say "I don't understand X" — don't guess.

### Phase 4: Escalation

- **If < 3 fixes have failed:** return to Phase 1, re-analyze with fresh eyes.
- **If >= 3 fixes have failed:** STOP. The problem is likely architectural, not a simple bug. Question your assumptions about the system design and escalate to the user.

## Skill Resources

- `references/implementer-prompt.md` — Subagent prompt template for implementation tasks
- `references/spec-reviewer-prompt.md` — Subagent prompt template for spec compliance review
- `references/code-quality-reviewer-prompt.md` — Subagent prompt template for code quality review
