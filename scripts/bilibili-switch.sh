#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Bilibili (Switch or Open)
# @raycast.mode silent
# @raycast.packageName Navigation
# @raycast.description Switch to an existing Bilibili tab in Google Chrome; otherwise open Bilibili.
# @raycast.icon 📺

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec "$SCRIPT_DIR/chrome-switch.sh" "$SCRIPT_DIR/config/bilibili-switch.json"
