---
name: hs-using-swarmspec
description: >-
  Use when starting any conversation or session to establish the agentic delivery
  lifecycle. Determines which phase skills to invoke and prevents rationalization
  ("this is too simple", "I'll just do this one thing first"). Skip this skill if
  dispatched as a subagent to execute a specific task.
---

# Using SwarmSpec

## Overview

Entry point skill that establishes the phase-based delivery lifecycle and enforces skill invocation discipline.

## Subagent Stop

If you were dispatched as a subagent to execute a specific task, skip this skill entirely.

## Lifecycle

```
ss-claim → ss-explore → ss-design → ss-plan → ss-implement → ss-verify → ss-ship
```

| Phase | Skill | What Happens |
|---|---|---|
| Claim | ss-claim | Claim issue, create worktree + branch + draft PR |
| Explore | ss-explore | Understand the codebase and problem space |
| Design | ss-design | Brainstorm approaches, write approved spec |
| Plan | ss-plan | Convert spec into bite-sized implementation plan |
| Implement | ss-implement | TDD execution with subagent dispatch |
| Verify | ss-verify | E2E red/green testing, code review, blast radius check |
| Ship | ss-ship | Mark PR ready, merge, clean up worktree |

## Phase Skip Rules

Not every change needs every phase:

- **Trivial changes** (< 5 lines, docs-only, config-only): claim → implement → verify → ship
- **Bug fixes with clear root cause**: claim → explore → implement → verify → ship
- **Well-specified issues** (full spec in issue body): claim → explore → plan → implement → verify → ship

When in doubt, do not skip phases. Skipping design on a "simple" change that turns out to be complex is more expensive than spending 5 minutes on design.

## The 1% Rule

If there is even a 1% chance a phase skill applies to the current task, invoke it. Check for applicable skills BEFORE any response or action — including clarifying questions.

## Red Flags

These thoughts mean STOP — you are rationalizing your way out of a phase:

| Thought | Reality |
|---|---|
| "This is just a simple question" | Questions are tasks. Check the lifecycle. |
| "I need more context first" | That is what ss-explore does. |
| "Let me just write the code quickly" | That is what ss-implement does, with TDD. |
| "I can skip the design for this" | Every project needs a design, regardless of perceived simplicity. |
| "Tests are passing, we're done" | Unit tests ≠ verified. That is what ss-verify does. |
| "I'll clean up the PR later" | That is what ss-ship does, with blast radius checks. |
| "Let me explore the code first" | Use ss-explore — it has structured output. |
| "I know what needs to change" | Verify with ss-explore. Partial implementations may already exist. |

## Skill Priority

When multiple skills could apply:

1. **Process skills first** (ss-explore, ss-design) — determine HOW to approach
2. **Execution skills second** (ss-implement, ss-verify) — guide what to do

"Let's build X" → ss-explore first, then ss-design, then ss-plan.
"Fix this bug" → ss-explore first, then ss-implement.

## Artifact Locations

All plan and design artifacts live on the worktree branch, not in the main repo tree:

| Artifact | Location |
|---|---|
| Design specs | `.agents/plans/YYYY-MM-DD-<topic>-design.md` |
| Implementation plans | `.agents/plans/YYYY-MM-DD-<topic>-plan.md` |

## Configuration

The plugin reads conventions from the repo's CLAUDE.md, AGENTS.md, and contributing guides. Repo guidelines always override plugin defaults. The plugin provides workflow discipline — project-specific concerns belong in the project's guidelines.
