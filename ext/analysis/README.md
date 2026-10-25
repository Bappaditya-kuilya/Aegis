# Aegis analysis extension

This extension contains the existing post-capture Aegis pipeline: protocol analyzers, materialized views, agent/session correlation, SQLite/OTel sinks, and local-session projection.

The native `aegis-capture-core` crate owns only the stable capture boundary (`Event`, `EventStream`, `Runner`, `Analyzer`) and platform collectors. Analysis code lives here so it can be composed and migrated to WebAssembly Components without changing eBPF or `/proc` capture. The published `aegis-capture` compatibility facade preserves the combined API for existing downstream users.
