# node9

**Security layer for AI coding agents — intercepts dangerous tool calls before they execute.**

[![npm](https://img.shields.io/npm/v/node9-ai.svg)](https://www.npmjs.com/package/node9-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 1. See the risk — before you install anything

```bash
npx node9-ai scan
```

Scans your Claude Code, Gemini CLI, and Codex history. Shows every command that would have been blocked or flagged — credentials leaked, destructive shell commands, dangerous SQL. No account, no daemon, no config required.

```
🔍  Scanning your AI history  — what would node9 have caught?

  47 risky operations found — none were blocked

    🛑  Would have blocked        2   operations stopped before execution
    👁   Would have flagged       44   sent to you for approval
    🔑  Credential leak           1   secret detected in tool call

  ──────────────────────────────────────────────────────────────────
  bash-safe  ·  12 findings  →  node9 shield enable bash-safe
    🛑  block-pipe-to-shell ×8  — Pipe-to-shell is a common supply-chain attack vector
    👁   review-eval ×4         — eval of dynamic content requires human approval

  ⚡ 47 operations ran unprotected. node9 would have caught them.
```

---

## 2. Turn it on

```bash
npm install -g node9-ai
node9 init
```

`init` auto-detects Claude Code, Gemini CLI, Cursor, and Codex. Wires protection in under 30 seconds. Run `node9 doctor` to verify everything is connected.

---

## 3. Watch it live

```bash
node9 tail
```

Streams every tool call as it happens — tool name, arguments, and the decision (allowed / blocked / DLP hit). Use this when you send an agent off to work and want to see what it's doing in real time.

---

## 4. Investigate later

```bash
node9 report          # security dashboard — what was blocked, what leaked, daily activity
node9 sessions        # per-session drill-down — tools used, files changed, blocked calls
```

`report` answers: was I protected? what got blocked? where is the biggest risk?

`sessions` is the incident investigation view — prompt summary, agent, tools used, blocked calls, modified files, MCP server activity.

---

## What's always on

- **Blocks** `git push --force`, `git reset --hard`, `git clean -fd`
- **Blocks** `DELETE`/`UPDATE` without `WHERE`, `DROP TABLE`, `TRUNCATE`
- **Blocks** `curl | bash`, `eval` of remote code
- **DLP** — catches AWS keys, GitHub tokens, Stripe keys, PEM private keys in any tool call argument
- **Undo** — snapshots files before every AI edit → `node9 undo` to roll back

---

## Shields — expert rules for the services your agent touches

```bash
node9 shield enable postgres   # blocks DROP TABLE, TRUNCATE, DROP COLUMN
node9 shield enable aws        # blocks S3 delete, EC2 terminate, IAM changes
node9 shield enable github     # blocks repo delete, remote branch deletion
node9 shield enable bash-safe  # blocks curl|bash, base64|sh, rm -rf /
node9 shield enable k8s        # blocks namespace delete, helm uninstall
node9 shield list              # see all shields and their status
```

---

## Advanced

- **MCP Gateway** — wrap any MCP server transparently; node9 intercepts every tool call
- **MCP Pinning** — detects rug-pull attacks when a server silently changes its tool definitions
- **Policy rules** — write custom allow/block/review rules per tool, path, or pattern
- **Cloud approvals** — approve or deny from your phone when you're away from the terminal
- **Python SDK** — govern any Python agent with two lines of code

→ [node9.ai](https://node9.ai) · [Full docs](https://github.com/node9-ai/node9-proxy)
