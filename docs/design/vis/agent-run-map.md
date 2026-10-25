# Agent Run Map: the first screen of one agent run

Users run an agent not to watch a string of telemetry. They want to know:

> Starting from my goal, how did this run actually get to the final result?

The Agent Run Map is Aegis's top-level entry chart. It is not focused on the file system, nor on the LLM trace. It splits one run into readable phases: goal, plan, tools, system actions, result.

## When it fits

- The first summary screen after an agent run ends
- A user quickly judging "is it still making progress toward my goal?"
- A team lead or reviewer wanting the story behind an AI-generated change
- Another agent taking over the fix, needing to understand what the previous round did

## Questions it answers

```text
What are the main phases of this run?
What is the semantic purpose of each phase?
Which commands, processes, file and network actions did each purpose trigger?
Which results succeeded, failed, retried, or never actually happened?
Are there system actions that cannot be attributed to a clear agent intent?
```

## Visual structure

```text
User goal
  "fix the failing API test"

┌─ Phase 1: Understand failure ───────────────────────────────┐
│ Semantic: inspect failing test                              │
│ Tool: Read tests/api.test.ts                                │
│ System: open tests/api.test.ts                              │
│ Result: found assertion mismatch                            │
└──────────────────────────────────────────────────────────────┘

┌─ Phase 2: Reproduce ─────────────────────────────────────────┐
│ Semantic: run focused test                                  │
│ Tool: Bash("npm test tests/api.test.ts")                    │
│ System: npm -> node -> jest                                 │
│ Files: package.json, tests/api.test.ts, src/api/handler.ts  │
│ Network: none                                               │
│ Result: exit 1                                              │
└──────────────────────────────────────────────────────────────┘

┌─ Phase 3: Patch ─────────────────────────────────────────────┐
│ Semantic: update handler behavior                           │
│ Tool: Edit src/api/handler.ts                               │
│ System: write src/api/handler.ts                            │
│ Result: diff +12 -4                                         │
└──────────────────────────────────────────────────────────────┘

┌─ Phase 4: Verify ────────────────────────────────────────────┐
│ Semantic: rerun test                                        │
│ Tool: Bash("npm test tests/api.test.ts")                    │
│ System: npm -> node -> jest                                 │
│ Result: exit 0                                              │
└──────────────────────────────────────────────────────────────┘

Unattributed:
  git status x6
  background process touched ~/.config/tool/config.json
```

## It must show all layers

Every phase of the Agent Run Map contains at least:

- `Semantic`: what the agent thought it was doing in this phase
- `Tool`: which tool or command the agent chose
- `System`: real process, file, network, resource actions
- `Result`: success, failure, retry, output, diff, test results

If any column is missing, the view degrades into an ordinary trace or an ordinary system dashboard.

## Visual encoding

- Phase blocks are ordered by time.
- Semantic purpose on the left, system result on the right.
- Lines connect tool intent to system effect.
- Gray blocks mark unattributed activity.
- Red or highlighting is only for behavior that clearly diverges from the user's goal; do not turn the whole chart into a security alert panel.

## Relation to the other views

The Agent Run Map is the first screen, not the detail page.

From here users go to:

- See which step was most expensive: [Intent-to-Effect Flame Graph](intent-to-effect-flame-graph.md)
- See the time order: [Causal Timeline](causal-timeline.md)
- See the change blast radius: [Run Impact Map](run-impact-map.md)
- See multiple agents: [Multi-Agent Causal Map](multi-agent-causal-map.md)
