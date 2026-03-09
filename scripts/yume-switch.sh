#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Yume (Switch or Open)
# @raycast.mode silent
# @raycast.packageName Navigation
# @raycast.description Switch to an existing Yume blog admin tab in Google Chrome; otherwise open it.
# @raycast.icon ☁️

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec "$SCRIPT_DIR/chrome-switch.sh" "$SCRIPT_DIR/config/yume-switch.json"
