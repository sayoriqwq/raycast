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
  /** Preferences accessible in the `open-in-vscode` command */
  export type OpenInVscode = ExtensionPreferences & {}
  /** Preferences accessible in the `open-in-zed-nightly` command */
  export type OpenInZedNightly = ExtensionPreferences & {}
  /** Preferences accessible in the `open-in-codex` command */
  export type OpenInCodex = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `open-in-vscode` command */
  export type OpenInVscode = {}
  /** Arguments passed to the `open-in-zed-nightly` command */
  export type OpenInZedNightly = {}
  /** Arguments passed to the `open-in-codex` command */
  export type OpenInCodex = {}
}

