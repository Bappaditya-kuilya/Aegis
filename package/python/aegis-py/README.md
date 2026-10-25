# aegis-py

Official Python helper for [Eunomia Aegis](https://github.com/Bappaditya-kuilya/Aegis).

`aegis-py` is the PyPI package name because the bare PyPI name
`aegis` is owned by an unrelated project. The canonical Aegis collector
is still installed with `cargo install aegis`; the scoped npm package is
published as `@aegis-oss/aegis`.

This package is a small, real Python utility for inspecting Aegis exported
snapshots:

```bash
pipx install aegis-py
aegis-py --version
aegis-py summary snapshot.json
aegis-py summary snapshot.json --json
```

Create a snapshot with the Aegis collector:

```bash
aegis report export -o snapshot.json
```

The package is experimental and intentionally does not implement eBPF capture.
Live capture remains the job of the Linux Aegis collector.
