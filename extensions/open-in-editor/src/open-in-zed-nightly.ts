import { openInEditor, openInZedNewWindow } from './lib'

export default async function Command() {
  await openInEditor('dev.zed.Zed-Nightly', 'Zed Nightly', {
    openPath: openInZedNewWindow,
  })
}
