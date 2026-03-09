#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title GitHub (Switch or Open)
# @raycast.mode silent
# @raycast.packageName Navigation
# @raycast.description Switch to an existing GitHub tab in Google Chrome; otherwise open GitHub.
# @raycast.icon 🐙

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec "$SCRIPT_DIR/chrome-switch.sh" "$SCRIPT_DIR/config/github-switch.json"
