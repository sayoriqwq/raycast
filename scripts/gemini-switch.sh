#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Gemini (Switch or Open)
# @raycast.mode silent
# @raycast.packageName Navigation
# @raycast.description Switch to an existing Gemini tab in Google Chrome; otherwise open Gemini.
# @raycast.icon 🌟

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec "$SCRIPT_DIR/chrome-switch.sh" "$SCRIPT_DIR/config/gemini-switch.json"
