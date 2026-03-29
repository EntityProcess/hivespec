# HiveSpec

**Spec-driven delivery lifecycle for AI agent swarms.**

Claim → Explore → Design → Plan → Implement → Verify → Ship

---

## The Problem

You give an AI agent a GitHub issue. It jumps straight to coding. Skips the design. Doesn't check what already exists. Claims "all tests pass" without running them. Ships a PR that breaks three other files.

Now multiply that by a team of agents working in parallel.

HiveSpec is the protocol that prevents this. Each agent in the swarm follows the same disciplined lifecycle — from claiming an issue to shipping a verified PR. The spec can live in the issue body, a design doc, or an OpenSpec `specs/` directory. HiveSpec doesn't care where your spec lives. It cares that you have one before writing code.

## How It Works

```
hs-claim     →  Claim an issue. Read the repo guidelines. Set up the workspace.
hs-explore   →  Search the codebase. Find what already exists. Find all consumers.
hs-design    →  Brainstorm approaches. Write a spec. Get approval.
hs-plan      →  Break the spec into TDD tasks with exact code.
hs-implement →  Red → green → refactor → commit. Dispatch subagents for parallel work.
hs-verify    →  Run the actual commands. E2E red/green. Blast radius check.
hs-ship      →  Risk classification. Final verification. Merge. Clean up.
```

Not every change needs every phase. A typo fix skips straight from claim to implement. A bug fix with a clear root cause skips design and plan. HiveSpec knows the difference.

## The Swarm

HiveSpec is a single-agent protocol. The swarm emerges from the coordination layer.

Any agent — Claude, Codex, Copilot, Pi — claims an issue from a shared board (GitHub Projects, Linear, Jira). It runs the HiveSpec lifecycle independently. Ships a PR. Picks up the next issue. Ten agents running HiveSpec concurrently on the same repo is a swarm that delivers like a well-run team.

The board is the coordination. HiveSpec is the discipline.

## Quick Start

### Claude Code

```bash
claude plugin add EntityProcess/hivespec
```

### Any agent

Copy `skills/` to your repo's `.claude/skills/`, `.agents/skills/`, or `.codex/skills/`.

Then tell your agent:

> Claim issue #42 and start the HiveSpec lifecycle.

## What HiveSpec Enforces

| Discipline | How |
|---|---|
| **No coding without specs** | hs-design blocks implementation until a design is approved |
| **No guessing at impact** | hs-explore finds all consumers of shared interfaces before proposing changes |
| **No blind TDD** | hs-implement watches tests fail before writing implementation (red → green) |
| **No "tests pass" without evidence** | hs-verify requires actual command output, not claims |
| **No shipping without blast radius check** | hs-ship greps for untouched consumers of modified types |
| **No auto-merge of breaking changes** | hs-ship classifies risk and requires confirmation for elevated-risk PRs |

## Flexible Specs

The spec can live anywhere:

- **In the issue body** — lightweight, no extra files. The agent reads it during hs-claim.
- **In `.agents/plans/`** — written during hs-design, lives on the branch, deleted after merge.
- **In OpenSpec `specs/` directory** — for repos that use [OpenSpec](https://openspec.dev) conventions. HiveSpec is compatible.

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

Full results: [hivespec-evals](https://github.com/EntityProcess/hivespec-evals)

## Companion Projects

| Project | Role |
|---|---|
| [AgentV](https://github.com/EntityProcess/agentv) | Evaluation framework. Evals at `agentv/evals/hivespec/` |
| [hivespec-evals](https://github.com/EntityProcess/hivespec-evals) | Published eval result artifacts |
| [OpenSpec](https://openspec.dev) | Spec format. HiveSpec is compatible |
| [Agentic Engineering](https://github.com/EntityProcess/agentv/tree/main/plugins/agentic-engineering) | Design-time companion — agent architecture patterns |

## Acknowledgments

HiveSpec builds on ideas and patterns from:

- **[Superpowers](https://github.com/obra/superpowers/)** — Claude Code plugin by Jesse Vincent. HiveSpec's TDD discipline, systematic debugging methodology, verification-before-completion protocol, and code review response patterns draw heavily from Superpowers' skill design.
- **[OpenSpec](https://openspec.dev)** — Spec format convention. HiveSpec is compatible with OpenSpec's `specs/` directory structure.

## License

MIT
