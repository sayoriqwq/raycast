import type { Application } from '@raycast/api'
import { execFileSync, execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getApplications, getSelectedFinderItems, open, showToast, Toast } from '@raycast/api'

type OpenPath = (path: string, app: Application) => Promise<void> | void

interface OpenInEditorOptions {
  openPath?: OpenPath
}

function getFinderWindowPath(): string {
  const script = `
    if application "Finder" is running and frontmost of application "Finder" then
      tell app "Finder"
        set finderWindow to window 1
        set finderWindowPath to (POSIX path of (target of finderWindow as alias))
        return finderWindowPath
      end tell
    else
      error "Could not get the selected Finder window"
    end if
  `
  return execSync(`osascript -e '${script.replace(/'/g, '\'\\\'\'')}'`, { encoding: 'utf-8' }).trim()
}

async function openPath(path: string, app: Application, options: OpenInEditorOptions): Promise<void> {
  if (options.openPath) {
    await options.openPath(path, app)
    return
  }

  await open(path, app)
}

export async function openInEditor(bundleId: string, appName: string, options: OpenInEditorOptions = {}): Promise<void> {
  const apps = await getApplications()
  const app = apps.find(a => a.bundleId === bundleId)

  if (!app) {
    await showToast({
      style: Toast.Style.Failure,
      title: `${appName} is not installed`,
    })
    return
  }

  const items = await (async () => {
    try {
      return await getSelectedFinderItems()
    }
    catch {
      return []
    }
  })()

  if (items.length > 0) {
    for (const item of items) {
      await openPath(item.path, app, options)
    }
    return
  }

  let windowPath = ''
  try {
    windowPath = getFinderWindowPath()
  }
  catch {
    // Could not get window path
  }

  if (windowPath) {
    await openPath(windowPath, app, options)
    return
  }

  await showToast({
    style: Toast.Style.Failure,
    title: 'No Finder items or window selected',
  })
}

export function openInZedNewWindow(path: string, app: Application): void {
  const cliPath = join(app.path, 'Contents', 'MacOS', 'cli')
  const zedPath = existsSync(cliPath) ? cliPath : '/usr/local/bin/zed'

  execFileSync(zedPath, ['-n', path], {
    stdio: 'ignore',
  })
}
