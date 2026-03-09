#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Open in Codex
# @raycast.mode silent
# @raycast.packageName Finder

# Optional parameters:
# @raycast.icon 🤖

set -e

TARGET_DIR=$(
osascript <<'APPLESCRIPT'
tell application "Finder"
	if not (exists Finder window 1) then
		return ""
	end if

	set sel to selection

	if (count of sel) > 0 then
		set item1 to item 1 of sel
		if class of item1 is folder then
			return POSIX path of (item1 as alias)
		else
			return POSIX path of ((container of item1) as alias)
		end if
	else
		return POSIX path of ((target of front Finder window) as alias)
	end if
end tell
APPLESCRIPT
)

if [ -z "$TARGET_DIR" ]; then
	exit 1
fi

# 第一步：把目录交给 Codex
open -a "Codex" "$TARGET_DIR"

# 第二步：强制把 Codex 拉到前台
/usr/bin/osascript <<'APPLESCRIPT'
delay 0.2

tell application "Codex"
	activate
	reopen
end tell

delay 0.15

tell application "System Events"
	if exists process "Codex" then
		set frontmost of process "Codex" to true
	end if
end tell
APPLESCRIPT