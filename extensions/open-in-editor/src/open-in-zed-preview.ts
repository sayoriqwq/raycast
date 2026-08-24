import { openInEditor, openInZedNewWindow } from './lib'

export default async function Command() {
  await openInEditor('dev.zed.Zed-Preview', 'Zed Preview', openInZedNewWindow)
}
