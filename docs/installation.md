# Installation and Automatic Startup

This guide installs the portable Aegis CLI for one user and keeps its
background processes running after restart.

`monitor` and `bind` have different jobs:

- `monitor` samples active agent sessions and writes weekly databases under
  `~/.aegis/monitor`.
- `bind` serves the authenticated Node API and maintains the outbound Controller
  relay. The examples below listen only on `127.0.0.1:7395`; they do not expose a
  new LAN or public port.

The portable commands use native Claude, Codex, Gemini, OpenCode, and OpenClaw
session files on Windows, macOS, and Linux. The eBPF-backed `record` and debug
commands remain Linux-only and have additional privilege requirements.

## Linux

### Install with Homebrew

On Linux x86-64:

```bash
brew tap aegis-oss/tap
brew install aegis-oss/tap/aegis
aegis --version
```

### Install a release binary

GitHub Releases publish Linux binaries for x86-64 and ARM64:

```bash
set -euo pipefail
case "$(uname -m)" in
  x86_64) asset=aegis-x86_64 ;;
  aarch64|arm64) asset=aegis-aarch64 ;;
  *) echo "unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac
mkdir -p "$HOME/.local/bin"
curl -fL --retry 3 \
  "https://github.com/aegis-oss/aegis/releases/latest/download/$asset" \
  -o "$HOME/.local/bin/aegis"
chmod 0755 "$HOME/.local/bin/aegis"
"$HOME/.local/bin/aegis" --version
```

Before running the binary in a sensitive environment, compare its SHA-256
digest with the digest shown for that asset on the GitHub Release page. Ensure
`~/.local/bin` is in `PATH`, or keep using the absolute path.

### Start the monitor at boot

Aegis creates and starts its systemd user unit:

```bash
"$HOME/.local/bin/aegis" monitor install-service
systemctl --user is-enabled aegis-monitor.service
systemctl --user is-active aegis-monitor.service
```

On a headless machine, enable systemd user lingering so the unit starts during
boot without waiting for an interactive login:

```bash
loginctl enable-linger "$USER"
loginctl show-user "$USER" -p Linger --value
```

Some distributions require an administrator to enable lingering. The expected
final value is `yes`.

### Keep a bound Node running

Run the first binding interactively so you can open its URL in a trusted
browser:

```bash
"$HOME/.local/bin/aegis" bind --no-open
```

The binding URL contains a bootstrap key. Treat it as a secret and do not paste
it into public logs. Stop the foreground command after the browser completes
binding; the key is stored in the user's platform config directory and is
reused across Node restarts.

When a browser sends a follow-up to a stopped Codex session, Aegis reads
the session's recorded `cli_version` and prefers that exact installed Codex
standalone release. This avoids resuming a newer transcript with an older
global `codex` from a background service's `PATH`. If that release is no longer
installed, Aegis falls back to `PATH`. Advanced installations can set
`AEGIS_CODEX_BIN`, `AEGIS_CLAUDE_BIN`, or `AEGIS_GEMINI_BIN` to
an explicit provider executable; these values are paths, not credentials.

For a headless remote host, forward its loopback port to the workstation that
runs the browser:

```bash
ssh -L 17400:127.0.0.1:7395 user@remote-host
```

In that SSH session, run:

```bash
"$HOME/.local/bin/aegis" bind --no-open \
  --endpoint http://127.0.0.1:17400
```

Then open its URL on the workstation. If a persistent Bind service already
occupies the remote port 7395, stop it before this one-time pairing and start it
again afterward. The SSH tunnel is not needed once Controller relay is
registered. Choose another unused workstation port if 17400 is also occupied.

Create `~/.config/systemd/user/aegis-bind.service`:

```ini
[Unit]
Description=Aegis local Node API and Controller relay
Documentation=https://github.com/aegis-oss/aegis
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
ExecStart=%h/.local/bin/aegis --listen 127.0.0.1 bind --no-open --server-port 7395 --app-url https://app.aegis.us/
Restart=on-failure
RestartSec=5
KillSignal=SIGTERM
UMask=0077
StandardOutput=null
StandardError=journal

[Install]
WantedBy=default.target
```

Enable and verify it:

```bash
systemctl --user daemon-reload
systemctl --user enable --now aegis-bind.service
systemctl --user is-enabled aegis-bind.service
systemctl --user is-active aegis-bind.service
curl -fsS http://127.0.0.1:7395/api/v1/info
```

The public info response should say `"authorization_required":true`. A request
to `/api/v1/snapshot` without an access token should return HTTP `401`.

## Windows

### Install the native artifact

Until a Windows asset is attached to GitHub Releases, the repository's
successful **Windows native** workflow uploads `aegis-windows-x86_64`.
Download the latest successful artifact with an authenticated GitHub CLI:

```powershell
$repo = 'aegis-oss/aegis'
$runs = gh run list --repo $repo --workflow windows.yml --limit 50 `
  --json databaseId,conclusion,headSha,url | ConvertFrom-Json
$run = $runs | Where-Object conclusion -eq 'success' | Where-Object {
  $prs = gh api -H 'Accept: application/vnd.github+json' `
    "repos/$repo/commits/$($_.headSha)/pulls" | ConvertFrom-Json
  $prs | Where-Object { $_.merged_at -and $_.base.ref -eq 'master' }
} | Select-Object -First 1
if (-not $run) { throw 'No successful merged Windows workflow was found.' }
$run | Select-Object databaseId,headSha,url

$download = Join-Path $env:TEMP 'aegis-windows'
New-Item -ItemType Directory -Force -Path $download | Out-Null
gh run download $run.databaseId --repo $repo `
  --name aegis-windows-x86_64 --dir $download

$installDir = Join-Path $env:LOCALAPPDATA 'Programs\Aegis'
New-Item -ItemType Directory -Force -Path $installDir | Out-Null
Copy-Item (Join-Path $download 'aegis.exe') $installDir -Force
& (Join-Path $installDir 'aegis.exe') --version
```

Actions artifacts are retained for a limited time. If none is available, build
`collector/target/release/aegis.exe` as described in
[Build From Source](build.md). The merged-PR check above excludes successful
artifacts from unmerged pull-request heads, including in repositories that use
squash merges.

Optionally add the install directory to the user `PATH`:

```powershell
$installDir = Join-Path $env:LOCALAPPDATA 'Programs\Aegis'
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$parts = @($userPath -split ';' | Where-Object { $_ })
if ($parts -notcontains $installDir) {
  [Environment]::SetEnvironmentVariable(
    'Path', (($parts + $installDir) -join ';'), 'User'
  )
}
```

New terminals see the updated `PATH`. Use the absolute executable path in the
current terminal.

### Start after sign-in

The built-in `monitor install-service` command currently targets Linux systemd.
On Windows, register two per-user scheduled tasks. They start after this user
signs in, run without elevation, restart after failures, and are allowed to run
on battery power:

```powershell
$installDir = Join-Path $env:LOCALAPPDATA 'Programs\Aegis'
$exe = Join-Path $installDir 'aegis.exe'
$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$principal = New-ScheduledTaskPrincipal `
  -UserId $currentUser -LogonType Interactive -RunLevel Limited
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $currentUser
$settings = New-ScheduledTaskSettingsSet `
  -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
  -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) `
  -ExecutionTimeLimit ([TimeSpan]::Zero) -MultipleInstances IgnoreNew

$monitor = New-ScheduledTaskAction -Execute $exe -Argument 'monitor' `
  -WorkingDirectory $installDir
$bind = New-ScheduledTaskAction -Execute $exe `
  -Argument '--listen 127.0.0.1 bind --no-open --server-port 7395 --app-url https://app.aegis.us/' `
  -WorkingDirectory $installDir

Register-ScheduledTask -TaskName 'Aegis Monitor' -Action $monitor `
  -Trigger $trigger -Principal $principal -Settings $settings -Force | Out-Null
Register-ScheduledTask -TaskName 'Aegis Bind' -Action $bind `
  -Trigger $trigger -Principal $principal -Settings $settings -Force | Out-Null
Start-ScheduledTask -TaskName 'Aegis Monitor'
Start-ScheduledTask -TaskName 'Aegis Bind'
```

Keep the Bind task at `RunLevel Limited`. Session discovery and read-only views
still work from an elevated process, but Aegis deliberately refuses to
resume or message an agent from an elevated Windows process because the selected
provider executable is owned by the transcript user. Run Bind as that same
non-administrator user to enable messaging.

If this Windows machine has not been added to the hosted app, run
`aegis bind` once in an interactive terminal before relying on the
background Bind task. Its binding URL also contains a secret bootstrap key.

Verify the tasks and API authorization boundary:

```powershell
Get-ScheduledTask -TaskName 'Aegis Monitor','Aegis Bind' |
  Select-Object TaskName,State
Get-Process aegis
Get-NetTCPConnection -State Listen -LocalPort 7395
try {
  Invoke-WebRequest http://127.0.0.1:7395/api/v1/snapshot -TimeoutSec 5
} catch {
  [int]$_.Exception.Response.StatusCode  # expected: 401
}
```

## Upgrade or remove automatic startup

After replacing the installed binary, restart the Linux services with
`systemctl --user restart aegis-monitor.service aegis-bind.service`,
or restart both Windows scheduled tasks.

To remove automatic startup on Linux:

```bash
systemctl --user disable --now aegis-monitor.service aegis-bind.service
rm -f ~/.config/systemd/user/aegis-monitor.service \
  ~/.config/systemd/user/aegis-bind.service
systemctl --user daemon-reload
```

To remove the Windows tasks:

```powershell
Unregister-ScheduledTask -TaskName 'Aegis Monitor' -Confirm:$false
Unregister-ScheduledTask -TaskName 'Aegis Bind' -Confirm:$false
```

Removing startup units or tasks does not delete captures under
`~/.aegis/monitor` or the locally stored Bind access key. Remove those
separately only when their data is no longer needed.
