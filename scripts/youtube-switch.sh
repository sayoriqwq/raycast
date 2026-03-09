#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title YouTube (Switch or Open)
# @raycast.mode silent
# @raycast.packageName Navigation
# @raycast.description Switch to an existing YouTube tab in Google Chrome; otherwise open YouTube.
# @raycast.icon 📺

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec "$SCRIPT_DIR/chrome-switch.sh" "$SCRIPT_DIR/config/youtube-switch.json"
