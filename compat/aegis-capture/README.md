# aegis-capture

`aegis-capture` preserves the public capture-and-analysis API used by
existing integrations. The implementation is split into the native
`aegis-capture-core` substrate and the composable `aegis-analysis`
extension; this crate re-exports that combined API without copying it.

New capture-only integrations may depend directly on
`aegis-capture-core`. Existing `aegis_capture` imports continue to
work unchanged.
