# Causal Timeline

A plain timeline easily degenerates into an event log:

```text
10:01 LLM call
10:02 process exec
10:03 file write
10:04 network request
```

That is not enough. The Aegis timeline must show cross-layer causality:

> Which semantic decision caused which system action, and which system result changed the next agent decision?

## When it fits

- Debugging an agent failure
- Finding retries, loops, waits, stalls, and no-op actions
- Seeing how a tool result affects the next LLM turn
- Checking cases where the agent claims success but the system produced no matching result

## Visual structure

```text
Time ───────────────────────────────────────────────────────────>

User goal     fix failing API test

LLM intent    inspect failure ───── run test ───── patch ─ verify
Tool call     Read test file        Bash npm test  Edit    Bash npm test
Process       open                  npm -> node           npm -> node
Files         tests/api.test.ts     read src/tests write  read src/tests
Network                            registry.npmjs.org
Result                             exit 1          diff   exit 0

Causal links:
  exit 1 -> next LLM turn "patch handler"
  diff -> next tool call "rerun focused test"
```

## Feedback loops are mandatory

Agent behavior is not a single request. It is a feedback loop:

```text
intent -> action -> observation -> revised intent -> action
```

So the most valuable line on the timeline is not the line from LLM to tool, but the line from system result back to the next LLM turn:

```text
test failed
  -> model decides to inspect src/api/handler.ts

network timeout
  -> model retries with npm cache clean

file not found
  -> model runs rg to locate renamed module
```

Without this feedback arrow, the timeline is just a log player.

## Visual encoding

- The horizontal axis is time.
- Rows are not telemetry sources but causal layers: intent, tool, process, effect, result.
- Cross-row lines express attribution.
- Loop-back lines express feedback.
- Gray lanes mark system activity that cannot be attributed to a specific LLM or tool.
- User approval/rejection can appear as prominent nodes, showing where a human changed the agent trajectory.

## Query entry points

The timeline should support questions like:

- Which failed command made the next prompt longer?
- Which tool result did the agent ignore?
- Which system action happened before any tool intent?
- Which retry repeated the same input and burned tokens for nothing?
- Which LLM turn claims completion, but no file/network/test effect follows?

This view suits deep inspection, not the first screen. The first screen should be the [Agent Run Map](agent-run-map.md); the timeline is the detail expanded after clicking a phase.
