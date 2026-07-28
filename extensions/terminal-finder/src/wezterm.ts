import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { userInfo } from 'node:os'

export function getWezTermExecutable(): string {
  const loginShell = userInfo().shell

  if (!loginShell || !existsSync(loginShell)) {
    throw new Error('Could not find the user\'s login shell')
  }

  const executable = execFileSync(loginShell, ['-lc', 'command -v wezterm'], {
    encoding: 'utf-8',
  }).trim()

  if (!executable || !existsSync(executable)) {
    throw new Error('WezTerm is not available in the login shell PATH')
  }

  return executable
}
