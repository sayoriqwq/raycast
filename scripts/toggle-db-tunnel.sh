#!/bin/bash
# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Toggle DB Tunnel
# @raycast.mode compact
# @raycast.packageName DevTools
# @raycast.icon 🛜
# @raycast.description Toggle autossh tunnel to prod DB (localhost:15432)
set -euo pipefail

# =========================
# Config
# =========================
ALIAS="ECS"
PORT="15432"
HOST="pgm-0jl6dkvhya7fdy49uo.pg.rds.aliyuncs.com"
REMOTE_PORT="5432"

PIDFILE="${HOME}/.cache/db-tunnel.pid"
LOGFILE="${HOME}/.cache/db-tunnel.log"

mkdir -p "$(dirname "$PIDFILE")"

notify() {
  local title="$1"
  local message="$2"
  local sound="${3:-false}"
  if [[ "$sound" == "true" ]]; then
    osascript -e "display notification \"${message}\" with title \"${title}\" sound name \"Submarine\""
  else
    osascript -e "display notification \"${message}\" with title \"${title}\""
  fi
}

is_pid_running() {
  [[ -f "$PIDFILE" ]] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null
}

listener_pid_on_port() {
  # returns pid if something is LISTENing, else empty
  lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null | head -n 1 || true
}

start_tunnel() {
  # If port is already occupied, don't start; report clearly.
  local lp
  lp="$(listener_pid_on_port)"
  if [[ -n "$lp" ]]; then
    notify "DB Tunnel" "❌ Port ${PORT} is already in use (pid ${lp})." "true"
    echo "Port ${PORT} is already in use (pid ${lp})."
    exit 1
  fi

  # Start autossh in background, capture pid.
  # -M 0 disables monitoring port; relies on ServerAlive*
  # ExitOnForwardFailure ensures it fails fast if forwarding can't be established.
  nohup autossh -M 0 -N "$ALIAS" \
    -L "127.0.0.1:${PORT}:${HOST}:${REMOTE_PORT}" \
    -o ExitOnForwardFailure=yes \
    -o ServerAliveInterval=30 \
    -o ServerAliveCountMax=3 \
    >>"$LOGFILE" 2>&1 &

  local pid=$!
  echo "$pid" > "$PIDFILE"

  # Quick health check: wait up to ~1s for listener to appear
  for _ in 1 2 3 4 5; do
    if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
      notify "DB Tunnel" "✅ ON  localhost:${PORT} → ${HOST}:${REMOTE_PORT}" "false"
      echo "Tunnel ON (pid ${pid})"
      return 0
    fi
    sleep 0.2
  done

  # If it didn't come up, treat as failure; show last log lines.
  notify "DB Tunnel" "❌ Failed to start. Check log: ${LOGFILE}" "true"
  echo "Failed to start. Last log:"
  tail -n 30 "$LOGFILE" || true
  exit 1
}

stop_tunnel() {
  local pid=""
  if [[ -f "$PIDFILE" ]]; then
    pid="$(cat "$PIDFILE" 2>/dev/null || true)"
  fi

  # If we have a pid and it's running, kill it.
  if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
    kill "$pid" 2>/dev/null || true
    rm -f "$PIDFILE"
    notify "DB Tunnel" "🛑 OFF (stopped pid ${pid})" "false"
    echo "Tunnel OFF (stopped pid ${pid})"
    return 0
  fi

  # If pidfile is stale, clean it.
  rm -f "$PIDFILE" 2>/dev/null || true

  # If something else is listening, we won't kill it (safer).
  local lp
  lp="$(listener_pid_on_port)"
  if [[ -n "$lp" ]]; then
    notify "DB Tunnel" "⚠️ Port ${PORT} is in use by pid ${lp} (not managed by this script)." "true"
    echo "Port ${PORT} is in use by pid ${lp} (not managed by this script)."
    return 0
  fi

  notify "DB Tunnel" "ℹ️ Already OFF" "false"
  echo "Already OFF"
}

# =========================
# Toggle
# =========================
if is_pid_running; then
  stop_tunnel
else
  start_tunnel
fi
