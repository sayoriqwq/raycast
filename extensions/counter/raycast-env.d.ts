/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Default Counter - Used when command argument is empty */
  "defaultCounter"?: string,
  /** Counter Aliases - Format: alias=counter, alias2=counter2 */
  "counterAliases"?: string,
  /** Data Directory - Storage path for daily and audit logs */
  "dataDirectory": string,
  /** Time Zone - IANA time zone, e.g. Asia/Shanghai */
  "timeZone": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `increment-counter` command */
  export type IncrementCounter = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `increment-counter` command */
  export type IncrementCounter = {
  /** Target key/name, e.g. qq */
  "target": string
}
}

