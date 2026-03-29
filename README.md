# SwarmSpec

**Spec-driven delivery lifecycle for AI agent swarms.**

Claim → Explore → Design → Plan → Implement → Verify → Ship

---

## The Problem

You give an AI agent a GitHub issue. It jumps straight to coding. Skips the design. Doesn't check what already exists. Claims "all tests pass" without running them. Ships a PR that breaks three other files.

Now multiply that by a team of agents working in parallel.

SwarmSpec is the protocol that prevents this. Each agent in the swarm follows the same disciplined lifecycle — from claiming an issue to shipping a verified PR. The spec can live in the issue body, a design doc, or an OpenSpec `specs/` directory. SwarmSpec doesn't care where your spec lives. It cares that you have one before writing code.

## How It Works

```
ss-claim     →  Claim an issue. Read the repo guidelines. Set up the workspace.
ss-explore   →  Search the codebase. Find what already exists. Find all consumers.
ss-design    →  Brainstorm approaches. Write a spec. Get approval.
ss-plan      →  Break the spec into TDD tasks with exact code.
ss-implement →  Red → green → refactor → commit. Dispatch subagents for parallel work.
ss-verify    →  Run the actual commands. E2E red/green. Blast radius check.
ss-ship      →  Risk classification. Final verification. Merge. Clean up.
```

Not every change needs every phase. A typo fix skips straight from claim to implement. A bug fix with a clear root cause skips design and plan. SwarmSpec knows the difference.

## The Swarm

SwarmSpec is a single-agent protocol. The swarm emerges from the coordination layer.

Any agent — Claude, Codex, Copilot, Pi — claims an issue from a shared board (GitHub Projects, Linear, Jira). It runs the SwarmSpec lifecycle independently. Ships a PR. Picks up the next issue. Ten agents running SwarmSpec concurrently on the same repo is a swarm that delivers like a well-run team.

The board is the coordination. SwarmSpec is the discipline.

## Quick Start

### Claude Code

```bash
claude plugin add EntityProcess/swarmspec
```

### Any agent

Copy `skills/` to your repo's `.claude/skills/`, `.agents/skills/`, or `.codex/skills/`.

Then tell your agent:

> Claim issue #42 and start the SwarmSpec lifecycle.

## What SwarmSpec Enforces

| Discipline | How |
|---|---|
| **No coding without specs** | ss-design blocks implementation until a design is approved |
| **No guessing at impact** | ss-explore finds all consumers of shared interfaces before proposing changes |
| **No blind TDD** | ss-implement watches tests fail before writing implementation (red → green) |
| **No "tests pass" without evidence** | ss-verify requires actual command output, not claims |
| **No shipping without blast radius check** | ss-ship greps for untouched consumers of modified types |
| **No auto-merge of breaking changes** | ss-ship classifies risk and requires confirmation for elevated-risk PRs |

## Flexible Specs

The spec can live anywhere:

- **In the issue body** — lightweight, no extra files. The agent reads it during ss-claim.
- **In `.agents/plans/`** — written during ss-design, lives on the branch, deleted after merge.
- **In OpenSpec `specs/` directory** — for repos that use [OpenSpec](https://openspec.dev) conventions. SwarmSpec is compatible.

## Design Principles

1. **Phase-based, not concern-based** — Each skill is a delivery phase that embeds its own discipline. TDD lives inside implement, not as a separate concern.
2. **Convention over configuration** — Reads your repo's CLAUDE.md / AGENTS.md for conventions. Sensible defaults for everything else.
3. **Client-agnostic** — SKILL.md files. Works with any agent that reads them.
4. **Platform-agnostic** — Claims work from GitHub, Linear, Jira, or any task board.
5. **Spec-flexible** — Issue body, design doc, or OpenSpec directory. Your call.

## Eval Results

Tested with [AgentV](https://github.com/EntityProcess/agentv) across two agent targets:

| Target | Pass Rate | Mean Score |
|---|---|---|
| Claude CLI | 4/4 pass (first 4 tests)* | 1.000 |
| Pi CLI (GPT-5.1 Codex) | 10/17 | 0.824 |

*Claude CLI hits a [session management issue](https://github.com/EntityProcess/agentv/issues/830) after ~4 sequential tests. Individual eval files all pass.

Full results: [swarmspec-evals](https://github.com/EntityProcess/swarmspec-evals)

## Companion Projects

| Project | Role |
|---|---|
| [AgentV](https://github.com/EntityProcess/agentv) | Evaluation framework. Evals at `agentv/evals/swarmspec/` |
| [swarmspec-evals](https://github.com/EntityProcess/swarmspec-evals) | Published eval result artifacts |
| [OpenSpec](https://openspec.dev) | Spec format. SwarmSpec is compatible |
| [Agentic Engineering](https://github.com/EntityProcess/agentv/tree/main/plugins/agentic-engineering) | Design-time companion — agent architecture patterns |

## License

MIT
