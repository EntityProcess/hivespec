# HiveSpec

Phase-based delivery lifecycle for AI agent swarms.

**Claim → Explore → Design → Plan → Implement → Verify → Ship**

HiveSpec gives each agent in a swarm the same disciplined workflow. Agents claim issues from a shared task board (GitHub, Linear, etc.), execute the delivery lifecycle independently, and ship PRs. The swarm emerges from many agents running the same protocol concurrently.

## Skills

| Skill | Phase | What Happens |
|---|---|---|
| `hs-using-hivespec` | Entry point | Lifecycle enforcement, phase skip rules |
| `hs-claim` | Claim | Claim issue, read guidelines, create worktree + branch + draft PR |
| `hs-explore` | Explore | Find prior art, all consumers, structured summary |
| `hs-design` | Design | Multiple approaches, section-by-section approval, write spec |
| `hs-plan` | Plan | Convert spec to TDD tasks with exact code |
| `hs-implement` | Implement | TDD red/green, subagent dispatch, systematic debugging |
| `hs-verify` | Verify | E2E red/green, blast radius check, code review |
| `hs-ship` | Ship | Final verification, risk classification, merge, cleanup |

## Phase Skip Rules

Not every change needs every phase:

- **Trivial** (< 5 lines, docs, config): claim → implement → verify → ship
- **Bug fix with clear root cause**: claim → explore → implement → verify → ship
- **Well-specified issue**: claim → explore → plan → implement → verify → ship

## Installation

### As a Claude Code plugin

```bash
claude plugin add EntityProcess/hivespec
```

### As standalone skills

Copy the `skills/` directory to your repo's `.claude/skills/`, `.agents/skills/`, or `.codex/skills/`.

### In CLAUDE.md / AGENTS.md

Reference the skills directly:

```markdown
## Workflow

Use HiveSpec for all development work. Skills are in `.claude/skills/hs-*/`.
```

## Design Principles

1. **Phase-based, not concern-based** — Skills map to delivery phases, each embeds relevant discipline (TDD inside implement, verification inside verify)
2. **Convention over configuration** — Sensible defaults, repo CLAUDE.md/AGENTS.md overrides all
3. **Client-agnostic** — Works with Claude Code, Codex, Pi, Copilot, or any agent that reads SKILL.md files
4. **Plans on branches** — Design specs and plans live at `.agents/plans/` on the worktree branch, not main
5. **Platform-agnostic coordination** — Agents claim work from GitHub, Linear, Jira, or any task board

## Companion Projects

- [AgentV](https://github.com/EntityProcess/agentv) — Evaluation framework. Evals for HiveSpec live at `agentv/evals/hivespec/`
- [HiveSpec Evals](https://github.com/EntityProcess/hivespec-evals) — Eval result artifacts
- [OpenSpec](https://openspec.dev/) — Spec-driven development framework. HiveSpec is compatible with OpenSpec conventions
- [Agentic Engineering](https://github.com/EntityProcess/agentv/tree/main/plugins/agentic-engineering) — Design patterns for agent systems (design-time companion)

## License

MIT
