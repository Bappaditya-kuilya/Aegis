# aegis-capture-core

`aegis-capture-core` is the native collection substrate behind the
`aegis` command-line tool. It
provides embedded eBPF probe runners, agent-native and `/proc` sources, and the
normalized event stream boundary. Product analysis, views, and sinks live in
`aegis-analysis`.

The eBPF runners are Linux-only at runtime and require root or suitable BPF
capabilities. Aegis keeps the probes in isolated child processes; linking
this crate does not link libbpf into the caller.

```rust,no_run
use aegis_capture_core::{
    BinaryExtractor,
    runners::{AgentRunner, BinaryRunner, Runner},
};

# async fn example() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
let probes = BinaryExtractor::new().await?;
let ssl = BinaryRunner::ssl(probes.get_sslsniff_path())
    .with_args(["--pid", "1234"]);
let mut capture = AgentRunner::new().add_runner(Box::new(ssl));
let _events = capture.run().await?;
# Ok(())
# }
```

The `aegis` binary is the primary consumer of this API. It adds command
parsing, terminal and web views, session orchestration, and reports.
