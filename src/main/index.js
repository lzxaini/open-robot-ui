import { app, BrowserWindow, dialog } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import registerIpcHandlers from './ipc/index.js'
import { createIndexWindow } from './windows/index.js'

const gotTheLock = app.requestSingleInstanceLock() // 单例应用

/** 禁止运行多个实例 */
if (!gotTheLock) {
  dialog.showErrorBox(
    '程序已经在运行了',
    '程序已经在运行了，如果需要重新启动，请先关闭程序，然后再重新启动！'
  )
  app.quit()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// 是 Electron 提供的一个 Chromium 运行参数，用于禁用后台计时器节流（Background Timer Throttling）。
// app.commandLine.appendSwitch('disable-background-timer-throttling')
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  
  registerIpcHandlers() // 注册ipc事件

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createIndexWindow()
  })
})
app.on('ready', () => {
  if (gotTheLock) {
    createIndexWindow()
  }
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// 设置应用程序开机自启动
app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden: false, // 设置为 true 可以隐藏启动时的窗口
  args: [] // 自定义参数
})
