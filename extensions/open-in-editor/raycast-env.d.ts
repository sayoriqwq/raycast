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
  /** Preferences accessible in the `open-in-zed` command */
  export type OpenInZed = ExtensionPreferences & {}
  /** Preferences accessible in the `open-in-kiro` command */
  export type OpenInKiro = ExtensionPreferences & {}
  /** Preferences accessible in the `open-in-antigravity` command */
  export type OpenInAntigravity = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `open-in-vscode` command */
  export type OpenInVscode = {}
  /** Arguments passed to the `open-in-zed` command */
  export type OpenInZed = {}
  /** Arguments passed to the `open-in-kiro` command */
  export type OpenInKiro = {}
  /** Arguments passed to the `open-in-antigravity` command */
  export type OpenInAntigravity = {}
}

