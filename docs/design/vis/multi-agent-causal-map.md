# Multi-Agent Causal Map

The hardest part of reading a multi-agent system is not the message volume — it is that causality is scattered.

One sentence from Agent A may trigger Agent B's tool call; Agent B's failure may make Agent C change plans; an MCP server or background worker may change system state outside both agents.

The Multi-Agent Causal Map answers:

> Between agents, tool workers, and system actions, who influenced whom?

## When it fits

- Multi-agent coding
- Agent handoff debugging
- Understanding MCP server behavior
- Parallel agent solving and merge conflicts
- Resource and outcome attribution for an agent swarm

## Visual structure

```text
Agent A: planner
  semantic: assign API test fix
    -> handoff to Agent B

Agent B: coder
  semantic: patch handler
    -> tool: Edit src/api/handler.ts
      -> system: write src/api/handler.ts
    -> tool: Bash("npm test")
      -> system: npm -> node -> jest
      -> result: exit 1
        -> feedback to Agent A

Agent C: verifier
  semantic: investigate failing test
    -> tool: Read tests/api.test.ts
      -> system: open tests/api.test.ts
    -> message to Agent B: "handler returns wrong status"

Unattributed worker
  system: background process writes cache
```

## It must span agents and system layers

A conversation graph alone is not enough:

```text
Agent A -> Agent B -> Agent C
```

A process tree alone is not enough either:

```text
npm -> node -> jest
```

A proper Multi-Agent Causal Map shows:

```text
Agent A semantic decision
  -> Agent B tool call
    -> process/file/network effect
      -> result
        -> Agent C or Agent A next decision
```

## Conflict view

A strong use case in multi-agent coding is explaining conflicts:

```text
Agent B
  intent: fix API status
  write: src/api/handler.ts
  reason: unit test failed

Agent C
  intent: add auth fallback
  write: src/api/handler.ts
  reason: integration test failed

Conflict:
  same file, same function, different failure source
```

Conflict types can be split into:

- text conflict
- semantic conflict
- test-result conflict
- dependency conflict
- workspace state conflict
- human approval conflict

## Visual encoding

- One swimlane per agent.
- Tool/process/file/network effects are child nodes under the agent lane.
- Cross-agent messages use solid lines.
- System result feedback uses loop-back lines.
- Shared-resource conflicts use converging nodes.
- Unattributed workers get their own lane.

## Value of this view

It is not there to show that "multi-agent is complex". It is there to find:

- Which agent's judgment influenced the other agents?
- Which tool result was propagated incorrectly?
- Which system action bypassed the agent message layer?
- Which workspace/resource conflict caused the final failure?
- Which agent can be re-run, and which cannot?

This view should interlock with the [Causal Timeline](causal-timeline.md): the timeline shows time order, the Multi-Agent Causal Map shows cross-actor causality.
