# Aegis npm package

Official npm entrypoint for [Eunomia Aegis](https://github.com/Bappaditya-kuilya/Aegis).

This package claims the global `aegis` command for the Node ecosystem and
ships the Aegis Web viewer for exported trace snapshots. The Linux eBPF
collector remains the Rust `aegis` binary published through crates.io and
GitHub Releases.

## Install

```bash
npm install -g @aegis-oss/aegis
aegis --help
```

## Web viewer

```bash
aegis serve --snapshot snapshot.json --port 7395
aegis open snapshot.json
```

Create a snapshot with the Rust collector:

```bash
cargo install aegis
aegis report export -o snapshot.json
```

## Collector commands

Commands such as `aegis record`, `aegis top`, `aegis monitor`,
`aegis stat`, and `aegis report` delegate to a real Aegis
collector binary when one is available. eBPF capture requires Linux privileges.

Install the collector with:

```bash
cargo install aegis
```

or download the official binary from:

```text
https://github.com/Bappaditya-kuilya/Aegis/releases/latest
```

This npm package does not download or execute hidden binaries during
installation, and it does not run privileged commands from `postinstall`.
