# Intent-to-Effect Flame Graph

A plain flame graph answers "where did CPU time go". The Aegis flame graph should answer:

> Which agent intents caused the biggest system effects?

The keyword is **Intent-to-Effect**. Drawing only token/cost is not enough, and neither is a bare process tree. Every wide block should expose the relationship between upper-level semantics and lower-level system actions.

## When it fits

- Quickly finding the heaviest, most expensive, most impactful phase of a run
- Spotting where the agent retried, detoured, or spun its wheels
- Comparing behavior between two agents/models/prompts
- Generating a static SVG to paste into a run summary or PR comment

## Data structure

```text
Session
  -> LLM turn / semantic phase
    -> tool intent
      -> process tree
        -> file/network/resource/test effect
```

Example:

```text
run;fix api test;run tests;npm;node;jest;read tests/api.test.ts
run;fix api test;run tests;npm;node;jest;exit 1
run;fix api test;patch handler;edit;write src/api/handler.ts
run;fix api test;verify;npm;node;jest;exit 0
run;unattributed;background git status
```

## Visual encoding

The default width should not be just token or cost. A better default is `effect weight`:

```text
effect weight =
  duration
  + process count
  + file writes
  + network destinations
  + retries
  + failed exits
  + generated diff size
```

Offer toggles:

- `width = time`
- `width = token/cost`
- `width = process count`
- `width = file/network effect`
- `width = no-progress retries`

Color expresses effect type:

- Blue: LLM/model activity
- Green: successful tool/system action
- Yellow: retry or no-progress loop
- Red: failed result or surprising effect
- Gray dashed: unattributed system activity

## How it differs from a regular flame graph

A regular process flame graph:

```text
npm -> node -> jest
```

The Aegis flame graph:

```text
semantic intent: verify API fix
  -> tool intent: Bash("npm test tests/api.test.ts")
    -> process: npm -> node -> jest
      -> file reads: tests/api.test.ts, src/api/handler.ts
      -> result: exit 0
```

Without semantic intent, the graph is just a system profiler.

Without process/file/network/result, the graph is just an LLM trace.

## The shape that grabs attention

```text
┌────────────────────────────────────────────────────────────┐
│ fix failing API test                                       │
├──────────────┬──────────────────────────┬──────────────────┤
│ understand   │ run tests                │ patch + verify   │
│ Read files   │ Bash npm test            │ Edit + npm test  │
│              ├──────────────┬───────────┤                  │
│              │ npm -> node  │ exit 1    │ write + exit 0   │
└──────────────┴──────────────┴───────────┴──────────────────┘
                 width = effect weight
```

This is the best candidate for Aegis's signature chart. It puts "how the agent thinks" and "what happened on the machine" in the same tree.
