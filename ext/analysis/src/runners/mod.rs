// SPDX-License-Identifier: MIT
// Copyright (c) 2026 aegis-oss org.

#[cfg(any(test, feature = "test-support"))]
pub use aegis_capture_core::runners::FakeRunner;
pub use aegis_capture_core::runners::agent;
pub use aegis_capture_core::runners::common;
pub use aegis_capture_core::runners::process;
pub use aegis_capture_core::runners::{
    AgentRunner, BinaryRunner, EventStream, ProcessRunner, Runner, RunnerError,
};

pub mod system;
pub use system::{SystemConfig, SystemRunner};
