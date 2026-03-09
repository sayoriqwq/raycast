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
  /** Preferences accessible in the `increment-counter` command */
  export type IncrementCounter = ExtensionPreferences & {}
  /** Preferences accessible in the `increment-qq` command */
  export type IncrementQq = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `increment-counter` command */
  export type IncrementCounter = {
  /** Counter name, e.g. qq */
  "name": string
}
  /** Arguments passed to the `increment-qq` command */
  export type IncrementQq = {}
}

