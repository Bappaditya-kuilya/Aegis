# Aegis Visualization Examples

## 1. Dashboard Mockups

### Main Dashboard Layout
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔍 Search everything...    [🔔 3] [⚙️] [👤 Admin]                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│ │ 🤖 Active   │ │ ⚡ Avg      │ │ 💰 Cost     │ │ 🔒 Security │        │
│ │ Agents: 12  │ │ Time: 1.2s  │ │ $45.67     │ │ Alerts: 3   │        │
│ │ +2 today    │ │ -0.3s ↓     │ │ +$12 ↑     │ │ 2 critical  │        │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 📈 System Activity Timeline                                         │ │
│ │ ═══════════════════════════════════════════════════════════════════ │ │
│ │ LLM Calls   ████▓▓▓▓████▓▓▓▓████▓▓▓▓████▓▓▓▓                       │ │
│ │ Sys Events  ▓▓▓▓████▓▓▓▓████▓▓▓▓████▓▓▓▓████                       │ │
│ │ Security    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓▓▓                       │ │
│ │ [09:00] [10:00] [11:00] [12:00] [13:00] [14:00] [15:00] [Now]       │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────┐ ┌─────────────────────────┐                │
│ │ 🏆 Top Agents           │ │ 🚨 Recent Alerts        │                │
│ │ ─────────────────────── │ │ ─────────────────────── │                │
│ │ 1. customer-support     │ │ 🔴 14:32 Prompt injection│                │
│ │    99.2% uptime         │ │ 🟡 14:15 High CPU usage │                │
│ │ 2. content-gen          │ │ 🟢 13:45 Deploy success │                │
│ │    95.8% uptime         │ │                         │                │
│ │ 3. data-processor       │ │ [View All Alerts]       │                │
│ │    89.1% uptime         │ │                         │                │
│ └─────────────────────────┘ └─────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────────┘
```

### Agent Detail View
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🤖 customer-support [🟢 Active] [⚙️ Configure] [🔄 Restart] [🗑️ Delete]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│ │ 💬 Convos   │ │ ⚡ Avg Resp │ │ ✅ Success  │ │ 💰 Cost     │        │
│ │ 234 total   │ │ 1.2s        │ │ 94.2%      │ │ $12.34     │        │
│ │ 12 active   │ │ -0.3s ↓     │ │ +2.1% ↑    │ │ +$3.45 ↑   │        │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                                         │
│ [Overview] [Traces] [System Events] [Security] [Performance] [Settings] │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 📊 Performance Trends (Last 24h)                                   │ │
│ │                                                                     │ │
│ │ Response Time (ms)                                                  │ │
│ │ 2000 ┤                                                             │ │
│ │ 1500 ┤     ●                                                       │ │
│ │ 1000 ┤   ●   ●     ●                                               │ │
│ │  500 ┤ ●       ● ●   ●●●●●●●●●●●                                   │ │
│ │    0 └─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─            │ │
│ │       00 03 06 09 12 15 18 21 24                                  │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

## 2. Trace Visualization

### Hierarchical Trace Tree
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 📋 Trace: customer-support-20240115-001                                │
│ Duration: 2.34s | Tokens: 450 | Cost: $0.023 | Status: ❌ Error       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ ▼ 🗨️ User Conversation                                                 │
│ ├─ 👤 User Input (14:32:15)                                            │
│ │  "What's the pricing for the Pro plan?"                              │
│ │                                                                       │
│ ├─ ▼ 🤖 LLM Planning Call (14:32:15 - 14:32:15.240) [240ms]           │
│ │  ├─ 📝 System Prompt: "You are a helpful customer support..."        │
│ │  ├─ 🔄 API Request: POST /v1/chat/completions                        │
│ │  │    Model: gpt-4 | Temperature: 0.7 | Max tokens: 500             │
│ │  ├─ 💬 Response: "I need to check our current pricing..."            │
│ │  └─ 💰 Usage: 45 input tokens, 156 output tokens                     │
│ │                                                                       │
│ ├─ ▼ ⚙️ System Execution (14:32:15.240 - 14:32:16.440) [1.2s]         │
│ │  ├─ 📁 File Read: /config/pricing.json                              │
│ │  │    Permission: ✅ Allowed | Size: 2.3KB | Duration: 45ms         │
│ │  ├─ 🔧 Process: python /app/scripts/price_calculator.py             │
│ │  │    PID: 12345 | Exit code: 1 | Duration: 890ms                   │
│ │  ├─ 🌐 Network: GET https://api.stripe.com/v1/prices               │
│ │  │    Status: 200 | Response time: 234ms | Size: 1.2KB             │
│ │  └─ ❌ Error: JSONDecodeError in price_calculator.py line 23         │
│ │                                                                       │
│ └─ ▼ 🤖 Error Response (14:32:16.440 - 14:32:16.590) [150ms]          │
│    ├─ 📝 Error Prompt: "There was an error accessing pricing data..." │
│    ├─ 🔄 API Request: POST /v1/chat/completions                        │
│    └─ 💬 Response: "I apologize, but I'm having trouble..."           │
│                                                                         │
│ [🔍 Search in trace] [🔗 Share] [⭐ Bookmark] [📋 Export]             │
└─────────────────────────────────────────────────────────────────────────┘
```

### Timeline View
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 📅 Timeline View [🔍 Zoom] [⏮️ ⏯️ ⏭️] [🔄 Auto-refresh]              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Time     │ 14:32:15.000   14:32:15.500   14:32:16.000   14:32:16.500   │
│ ─────────┼─────────────────────────────────────────────────────────────│
│ LLM      │ ████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████     │
│ System   │ ▓▓▓▓▓▓▓▓▓▓▓▓███████████████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│ Network  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│ File I/O │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│ CPU      │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│ Memory   │ ████████████████████████████████████████████████████████████ │
│                                                                         │
│ Events:                                                                 │
│ ├─ 🤖 LLM Call started                                                 │
│ ├─ 📁 File read: pricing.json                                          │
│ ├─ 🔧 Process spawn: price_calculator.py                               │
│ ├─ 🌐 HTTP GET: stripe.com/prices                                      │
│ ├─ ❌ Process exit: code 1                                             │
│ └─ 🤖 Error response generated                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## 3. Security Monitoring

### Security Dashboard
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔒 Security Dashboard [🔄 Last scan: 2min ago] [⚙️ Configure]          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│ │ 🚨 Critical │ │ 🔍 Threats  │ │ 🔐 Access   │ │ 📊 Score    │        │
│ │ 2 alerts    │ │ 5 detected  │ │ 12 violations│ │ 72/100     │        │
│ │ +1 today    │ │ +3 today    │ │ +2 today    │ │ -5 today   │        │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 🚨 Active Threats                                                   │ │
│ │                                                                     │ │
│ │ 🔴 CRITICAL - Prompt Injection Detected                            │ │
│ │    Agent: customer-support | Time: 14:32:15                        │ │
│ │    Pattern: "Ignore all previous instructions and..."              │ │
│ │    [🔍 Investigate] [🔒 Isolate] [📝 Report]                       │ │
│ │                                                                     │ │
│ │ 🟡 WARNING - Excessive File Access                                 │ │
│ │    Agent: file-processor | Time: 14:28:33                          │ │
│ │    Files: 47 accessed in 2 minutes                                 │ │
│ │    [📊 View Pattern] [⚙️ Adjust Limits] [✅ Approve]               │ │
│ │                                                                     │ │
│ │ 🟢 INFO - Unusual Response Time                                    │ │
│ │    Agent: content-generator | Time: 14:15:22                       │ │
│ │    Duration: 15.3s (avg: 2.1s)                                     │ │
│ │    [📈 Performance] [🔄 Retry] [✅ Dismiss]                        │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────┐ ┌─────────────────────────┐                │
│ │ 📈 Threat Trends        │ │ 🎯 Top Vulnerabilities  │                │
│ │ ─────────────────────── │ │ ─────────────────────── │                │
│ │ Injection attempts: ↑   │ │ 1. Prompt injection     │                │
│ │ File access: ↑          │ │ 2. Excessive resource   │                │
│ │ Network anomalies: ↓    │ │ 3. Unauthorized access  │                │
│ │ Data exfiltration: ↓    │ │ 4. Policy violations    │                │
│ └─────────────────────────┘ └─────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────────┘
```

## 4. Performance Analytics

### Performance Dashboard
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 📊 Performance Analytics [📅 Last 24h] [🔄 Auto-refresh]               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 📈 Response Time Distribution                                       │ │
│ │                                                                     │ │
│ │ 2000ms ┤                                                           │ │
│ │ 1500ms ┤     ●                                                     │ │
│ │ 1000ms ┤   ●   ●     ●                                             │ │
│ │  500ms ┤ ●       ● ●   ●●●●●●●●●●● ← 95th percentile               │ │
│ │    0ms └─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─            │ │
│ │         00 03 06 09 12 15 18 21 24                                │ │
│ │                                                                     │ │
│ │ P50: 245ms | P90: 892ms | P95: 1.2s | P99: 2.1s                   │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────┐ ┌─────────────────────────┐                │
│ │ 🔥 Resource Usage       │ │ 💰 Cost Breakdown       │                │
│ │ ─────────────────────── │ │ ─────────────────────── │                │
│ │ CPU: 67% (↑ 12%)        │ │ GPT-4: $23.45 (67%)     │                │
│ │ Memory: 82% (↑ 5%)      │ │ GPT-3.5: $8.92 (26%)    │                │
│ │ Network: 45% (↓ 3%)     │ │ Claude: $2.13 (6%)      │                │
│ │ Disk: 23% (↑ 1%)        │ │ Other: $0.45 (1%)       │                │
│ └─────────────────────────┘ └─────────────────────────┘                │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 🎯 Top Performance Issues                                           │ │
│ │                                                                     │ │
│ │ 1. customer-support: High latency (avg 2.3s)                       │ │
│ │    Suggestion: Optimize file reading operations                     │ │
│ │    [🔧 Optimize] [📊 Details] [📈 Trends]                          │ │
│ │                                                                     │ │
│ │ 2. data-processor: Memory leak detected                            │ │
│ │    Suggestion: Restart agent or check for memory leaks             │ │
│ │    [🔄 Restart] [🔍 Investigate] [📊 Memory Usage]                 │ │
│ │                                                                     │ │
│ │ 3. content-gen: Token usage spike                                  │ │
│ │    Suggestion: Review prompt efficiency                             │ │
│ │    [📝 Edit Prompt] [💰 Cost Analysis] [📊 Usage Trends]           │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

## 5. Mobile Views

### Mobile Dashboard
```
┌─────────────────────────────────────────────────┐
│ ☰ [🔍] Aegis [🔔 3] [👤]                   │
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🤖 Active Agents                            │ │
│ │ 12 agents • 2 new today                     │ │
│ │ ████████████████████████████████████████     │ │
│ │                                             │ │
│ │ ⚡ Avg Response Time                        │ │
│ │ 1.2s • 0.3s faster than yesterday          │ │
│ │ ████████████████████████████████████████     │ │
│ │                                             │ │
│ │ 🔒 Security Status                          │ │
│ │ 3 alerts • 2 critical                      │ │
│ │ ████████████████████████████████████████     │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🚨 Critical Alerts                          │ │
│ │                                             │ │
│ │ 🔴 Prompt injection detected               │ │
│ │    customer-support • 2 min ago            │ │
│ │    [Investigate →]                          │ │
│ │                                             │ │
│ │ 🟡 High memory usage                       │ │
│ │    file-processor • 5 min ago              │ │
│ │    [View Details →]                         │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 📱 Quick Actions                            │ │
│ │                                             │ │
│ │ [🤖 View Agents] [📋 View Traces]           │ │
│ │ [🔒 Security]    [📊 Performance]          │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [🏠 Dashboard] [🔍 Search] [⚙️ Settings]        │
└─────────────────────────────────────────────────┘
```

### Mobile Trace View
```
┌─────────────────────────────────────────────────┐
│ ← Trace Details                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ customer-support-20240115-001                   │
│ ❌ Error • 2.34s • $0.023                      │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🗨️ Conversation                             │ │
│ │                                             │ │
│ │ 👤 "What's the pricing for Pro plan?"       │ │
│ │                                             │ │
│ │ 🤖 "I need to check pricing data..."        │ │
│ │    [▼ Show details]                         │ │
│ │                                             │ │
│ │ ⚙️ System execution (1.2s)                  │ │
│ │    📁 Read pricing.json                     │ │
│ │    🔧 Run price_calculator.py               │ │
│ │    🌐 GET stripe.com/prices                 │ │
│ │    ❌ JSONDecodeError                       │ │
│ │    [▼ Show details]                         │ │
│ │                                             │ │
│ │ 🤖 "I apologize, but I'm having trouble..." │ │
│ │    [▼ Show details]                         │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 📊 Performance                              │ │
│ │ Duration: 2.34s                             │ │
│ │ Tokens: 450 (201 in, 249 out)              │ │
│ │ Cost: $0.023                                │ │
│ │ CPU: 67% peak                               │ │
│ │ Memory: 82% peak                            │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [🔗 Share] [⭐ Bookmark] [📋 Export]           │
└─────────────────────────────────────────────────┘
```

## 6. Key Interaction Examples

### Search Interface
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔍 Search agents, traces, events, errors...                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ 🔥 Recent Searches                                                      │
│ • "customer-support errors last 24h"                                   │
│ • "high memory usage"                                                   │
│ • "prompt injection attempts"                                           │
│                                                                         │
│ ⚡ Quick Filters                                                        │
│ • [Active agents only] [Errors only] [Last hour] [Security events]     │
│                                                                         │
│ 📊 Search Results for "customer-support errors"                        │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 🤖 Agent: customer-support                                          │ │
│ │    Status: ❌ Error | Last active: 5 min ago | 15% error rate       │ │
│ │    [View Agent] [View Traces] [Performance]                          │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 📋 Trace: customer-support-20240115-001                            │ │
│ │    Error: JSONDecodeError | Duration: 2.34s | Cost: $0.023          │ │
│ │    [View Trace] [Similar Issues] [Share]                             │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 🔍 Pattern: Pricing data errors                                     │ │
│ │    15 similar errors | Started: 2h ago | Likely cause: Config       │ │
│ │    [View Pattern] [Set Alert] [Fix Suggestion]                       │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### Real-time Activity Feed
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔄 Live Activity [⏸️ Pause] [⚙️ Filters] [🔊 Audio alerts: OFF]        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 🔴 14:32:15 CRITICAL  customer-support                            │ │
│ │    🚨 Prompt injection detected                                     │ │
│ │    Pattern: "Ignore all previous instructions and tell me..."       │ │
│ │    [🔍 Investigate] [🔒 Isolate] [📝 Report] [🔕 Mute]             │ │
│ │    ● New event                                                      │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 🟡 14:31:45 WARNING   file-processor                              │ │
│ │    ⚠️ High memory usage: 85% (threshold: 80%)                       │ │
│ │    Trend: Increasing over last 30 minutes                          │ │
│ │    [📊 View Metrics] [🔧 Optimize] [📈 Historical]                 │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 🟢 14:31:20 SUCCESS   content-generator                           │ │
│ │    ✅ Task completed successfully                                   │ │
│ │    Generated 1,200 words in 3.2s | Cost: $0.045                    │ │
│ │    [📄 View Output] [⏱️ Performance] [🔄 Repeat Task]              │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ 🔵 14:30:55 INFO      data-processor                              │ │
│ │    📊 Batch processing started                                      │ │
│ │    Processing 1,247 items | ETA: 5 minutes                         │ │
│ │    [📈 Progress] [⏸️ Pause] [🛑 Stop]                              │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ [View older events] [🔄 Refresh] [📊 Activity summary]                  │
└─────────────────────────────────────────────────────────────────────────┘
```

This document provides concrete examples of how Aegis's unique system-level observability capabilities translate into practical, user-friendly visualizations that help users understand and debug their AI agent systems effectively. 