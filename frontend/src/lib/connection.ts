// SPDX-License-Identifier: MIT
// Copyright (c) 2026 aegis-oss org.

// Temporary UI import facade. Networking lives in controllerClient/nodeClient.
export { startLogin, type CloudIdentity, type CloudNode } from '@/lib/controllerClient';
export type { LocalConnection } from '@/lib/nodeClient';
