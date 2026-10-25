# Agent Behavior Analysis Skills

This directory contains repo-local skills for analyzing AI agent behavior from
local logs, observability traces, and Aegis evidence. These are prototypes
for a shareable skills pack, not Aegis runtime code.

## Skills

| Skill | Use for |
|-------|---------|
| `agentpprof-flamegraph` | Generate semantic flamegraphs to visualize where token budget went |
| `agent-interaction-insights` | Analyze transcripts to reduce corrections, improve trust, stop loops |
| `aegis-system-friction` | Analyze Aegis system data for resource/retry/cleanup improvements |
| `aegis-testing` | Validate Aegis changes with automated tests, TUI/UI checks, and real agent CLIs |

## Design Principles

- Split by evidence boundary, not by pipeline stage: semantic interaction vs
  system-level Aegis facts.
- Treat Aegis as a specialized strong evidence source, not a requirement
  for generic interaction analysis.
- Prefer evidence-backed findings over fixed dashboard layouts.
- Generate user-facing decision reports and dashboard layers on demand from
  the user's question; keep source manifests, ids, and handoff JSON in
  appendices unless the user asks for debug output.
- Use `agent-interaction-insights` for conversation-level analysis and
  `aegis-system-friction` for OS/runtime analysis; combine them through
  the handoff contract when both matter.
- Do not include raw prompts, responses, auth headers, or secrets by default.
- Add scripts only after an adapter pattern repeats and needs deterministic
  behavior.

## Usage

**In this repo**: Skills are symlinked from `.claude/skills` and work directly.

**In other projects**: Symlink or copy individual skill directories to `.claude/skills/`:

```bash
ln -s /path/to/aegis/skills/agentpprof-flamegraph .claude/skills/
```

Or install the full pack:

```bash
ln -s /path/to/aegis/skills .claude/skills
```
