---
name: hs-writing-skills
description: >-
  Use when creating new skills, editing existing skills, or verifying skills
  work before deployment. Triggers when asked to "create a skill", "write a
  skill", "update this skill", "improve the skill", or when hs-retro identifies
  a gap-new classification that requires a new skill.
---

# Writing Skills

## Overview

Writing skills is TDD applied to process documentation. Write test cases (pressure scenarios), watch them fail (baseline behavior), write the skill, watch tests pass (agents comply), and refactor (close loopholes).

**Iron law: No skill without a failing test first.** If you didn't watch an agent fail without the skill, you don't know if the skill teaches the right thing.

## What is a Skill?

Reusable techniques, patterns, tools, or reference guides. NOT narratives about how you solved a problem once.

**Create when:** technique wasn't obvious, you'd reference it again, pattern applies broadly.

**Don't create for:** one-off solutions, standard practices, project-specific conventions (use CLAUDE.md).

## Skill Structure

```
skills/
  skill-name/
    SKILL.md              # Main reference (required)
    references/           # Heavy reference or reusable tools (if needed)
```

**Frontmatter:** only `name` and `description` fields. Max 1024 chars total.

**Description rules:**
- Start with "Use when..." — triggering conditions only
- **Never summarize the skill's workflow** — Claude will follow the description as a shortcut and skip reading the full skill
- Write in third person

```yaml
# BAD: Summarizes workflow
description: Use when executing plans - dispatches subagent per task with code review

# GOOD: Just triggers
description: Use when executing implementation plans with independent tasks
```

## RED-GREEN-REFACTOR for Skills

### RED: Baseline Test

Run a pressure scenario with a subagent WITHOUT the skill. Document:
- What choices did the agent make?
- What rationalizations did it use (verbatim)?
- Which pressures triggered violations?

### GREEN: Write Minimal Skill

Write skill addressing those specific rationalizations. Don't add content for hypothetical cases. Run same scenario WITH skill — agent should now comply.

### REFACTOR: Close Loopholes

Agent found new rationalization? Add explicit counter. Re-test until bulletproof.

## Bulletproofing Against Rationalization

For discipline-enforcing skills, close every loophole explicitly:

```markdown
# BAD
Write code before test? Delete it.

# GOOD
Write code before test? Delete it. Start over.
**No exceptions:**
- Don't keep it as "reference"
- Don't "adapt" while running tests
- Delete means delete
```

Build a rationalization table from every excuse agents make during testing:

| Excuse | Reality |
|---|---|
| "Skill is obviously clear" | Clear to you does not equal clear to other agents. Test it. |
| "Testing is overkill" | Untested skills have issues. Always. |
| "I'll test if problems emerge" | Problems mean agents can't use the skill. Test BEFORE deploying. |

## Skill Types and Testing

| Skill Type | Test With | Success Criteria |
|---|---|---|
| Discipline (TDD, verification) | Pressure scenarios, combined pressures | Agent follows rule under maximum pressure |
| Technique (how-to guides) | Application + variation + missing info | Agent applies technique to new scenario |
| Pattern (mental models) | Recognition + application + counter-examples | Agent identifies when/how to apply |
| Reference (docs, APIs) | Retrieval + application + gap testing | Agent finds and correctly applies info |

## Keyword Coverage (CSO)

Future agents need to FIND skills. Use words they'd search for:
- Error messages and symptoms
- Synonyms (timeout/hang/freeze)
- Tool names, library names, file types

## Common Mistakes

| Mistake | Fix |
|---|---|
| Narrative storytelling | Write reusable techniques, not session logs |
| Multi-language examples | One excellent example beats many mediocre ones |
| Code in flowcharts | Use flowcharts only for non-obvious decisions |
| Workflow in description | Description = triggers only, never process |
| Batch skill creation | One skill at a time, test each before next |
| Skipping baseline test | No skill without a failing test first |
