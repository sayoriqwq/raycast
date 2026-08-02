#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Gemini Notebook (Switch or Open)
# @raycast.mode silent
# @raycast.packageName Navigation
# @raycast.description Switch to an existing Gemini Notebook tab in Google Chrome; otherwise open Gemini Notebook.
# @raycast.icon icons/gemini-notebook-light.png
# @raycast.iconDark icons/gemini-notebook-dark.png

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec "$SCRIPT_DIR/chrome-switch.sh" "$SCRIPT_DIR/config/notebook-switch.json"
