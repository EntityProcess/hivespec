---
name: hs-retro
description: >-
  Use after completing a session or delivery cycle to mine human interventions
  for skill gaps. Triggers when asked to "retro", "retrospective", "analyze
  session", "what did I have to remind you", "improve skills from this session",
  or when a session had multiple user corrections or redirections.
---

# Retro

## Overview

Mine completed session transcripts for human interventions — corrections, redirections, and reminders that signal skill gaps. Turn patterns into skill updates or new skills.

## Iron Law

**Every human intervention is a skill failure.** If the user had to remind, correct, or redirect the agent, a skill either doesn't exist, wasn't invoked, or is incomplete.

## Process

### Step 1: Import the session transcript

```bash
# Current session (Claude Code)
agentv import claude --discover latest

# Specific session
agentv import claude --session-id <uuid>

# List recent sessions
agentv import claude --list
```

If `agentv import` is not available, read the raw transcript directly from `~/.claude/projects/<encoded-path>/<session-id>.jsonl`.

### Step 2: Extract human interventions

Scan the transcript for user messages that indicate the agent missed something. Intervention signals:

| Signal | Example |
|---|---|
| **Correction** | "that's brittle", "this is wrong", "don't do it that way" |
| **Reminder** | "did you do X?", "you forgot to", "what about" |
| **Redirection** | "actually, let's", "no, I meant", "try this instead" |
| **Simplification** | "why do we need", "can we just", "that's unnecessary" |
| **Escalation** | "this should be in a skill", "add this to hivespec" |

Skip: clarifying questions about requirements, preference choices, approval prompts. These are normal collaboration, not skill failures.

### Step 3: Classify each intervention

For each intervention, determine:

```
[INTERVENTION]: <quote or paraphrase>
[CLASSIFICATION]: gap-invoke | gap-content | gap-new
[TARGET]: <skill name or "new: proposed-name">
[FIX]: <specific addition or change>
```

**Classifications:**

- **gap-invoke** — an existing skill covers this, but the agent didn't invoke it. Fix: update skill description triggers or add to red flags table.
- **gap-content** — an existing skill was invoked but is missing a check. Fix: add checklist item, red flag, or process step.
- **gap-new** — no existing skill covers this pattern. Fix: propose new skill.

### Step 4: Apply fixes

For each classified intervention:

**gap-invoke:** Update the skill's `description` field to include the missed trigger, or add the rationalization to its red flags table.

**gap-content:** Add the specific checklist item, red flag, or process step to the existing skill. Keep additions minimal — one line per gap, not a paragraph.

**gap-new:** Only create a new skill if the pattern doesn't fit any existing skill. Most interventions are gap-content, not gap-new.

### Step 5: Verify fixes

For each change, ask: "If this skill/checklist existed at the start of the session, would the agent have avoided the intervention?" If no, the fix is insufficient — revise.

## Example

From a real session (agentv issue implementation):

```
[INTERVENTION]: "did you do code review and manual e2e tests"
[CLASSIFICATION]: gap-invoke
[TARGET]: hs-verify
[FIX]: Agent should auto-invoke hs-verify after hs-implement completes

[INTERVENTION]: "it seems like it is brittle"
[CLASSIFICATION]: gap-content
[TARGET]: hs-implement/references/code-quality-reviewer-prompt.md
[FIX]: Add "industry alignment" checklist item — flag heuristics where conventions exist

[INTERVENTION]: "that's an extra edge case surface"
[CLASSIFICATION]: gap-content
[TARGET]: hs-implement/references/code-quality-reviewer-prompt.md
[FIX]: Add "iteration cruft" checklist item — catch superseded approaches

[INTERVENTION]: "do we have any unnecessary unit tests"
[CLASSIFICATION]: gap-content
[TARGET]: hs-implement/references/code-quality-reviewer-prompt.md
[FIX]: Update test quality item — flag redundant tests covering same code path
```

All four gaps were fixed by adding 2 checklist items to an existing reviewer prompt. No new skill needed.

## Red Flags

- Dismissing an intervention as "user preference" when it reveals a process gap
- Creating a new skill when an existing skill just needs a checklist item
- Writing vague fixes ("improve code review") instead of specific ones ("add checklist item: flag heuristics where conventions exist")
- Skipping Step 5 verification — untested fixes are as bad as no fixes
