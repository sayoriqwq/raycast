#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ "$#" -ne 1 ]; then
  echo "usage: $0 <config-path>" >&2
  exit 1
fi

CONFIG_PATH="$1"

exec osascript -l JavaScript "$SCRIPT_DIR/lib/chrome-switch.js" "$CONFIG_PATH"
