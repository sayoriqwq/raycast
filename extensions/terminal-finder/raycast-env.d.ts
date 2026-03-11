/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `finder-to-wezterm` command */
  export type FinderToWezterm = ExtensionPreferences & {}
  /** Preferences accessible in the `finder-to-ghostty` command */
  export type FinderToGhostty = ExtensionPreferences & {}
  /** Preferences accessible in the `wezterm-to-finder` command */
  export type WeztermToFinder = ExtensionPreferences & {}
  /** Preferences accessible in the `ghostty-to-finder` command */
  export type GhosttyToFinder = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `finder-to-wezterm` command */
  export type FinderToWezterm = {}
  /** Arguments passed to the `finder-to-ghostty` command */
  export type FinderToGhostty = {}
  /** Arguments passed to the `wezterm-to-finder` command */
  export type WeztermToFinder = {}
  /** Arguments passed to the `ghostty-to-finder` command */
  export type GhosttyToFinder = {}
}

