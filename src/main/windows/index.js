/*
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2025-04-18 09:20:42
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-07-05 08:31:28
 * @FilePath: \open-reobot-ui\src\main\windows\index.js
 * @Description: Fuck Bug
 * 微信：lizx2066
 */
import { BrowserWindow, Menu, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import logger from '../utils/electron-log'

let indexWindow

// 创建在制详情进程
export function createIndexWindow() {
  // 获取屏幕尺寸
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  // 隐藏菜单栏
  Menu.setApplicationMenu(null)
  // 创建一个无边框的透明窗口
  indexWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false, // 无边框
    alwaysOnTop: true, // 始终显示在最前面
    resizable: false, // 不可调整大小
    scrollBars: false, // 这里设置为false去掉滚动条
    useContentSize: true, // 实际尺寸不包含边框
    center: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    indexWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '')
  } else {
    indexWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 确保窗口关闭时释放资源
  indexWindow.on('closed', () => {
    indexWindow = null
  })

  indexWindow.webContents.on('did-finish-load', () => {
    // indexWindow.setSkipTaskbar(true) // 设置任务栏不显示
    indexWindow.setAlwaysOnTop(true)
    indexWindow.focus()
    indexWindow.show()
    logger.info(JSON.stringify('indexWindow窗口进程did-finish-load，并且置顶聚焦显示'))
  })

  //indexWindow输入事件
  indexWindow.webContents.on('before-input-event', (event, input) => {
    if (input) {
      if (input.type === 'keyDown') {
        if (input.code === 'F12' && configInfo.debug) {
          indexWindow.webContents.openDevTools()
        }
      }
    }
  })
}

export function getIndexWindow() {
  return indexWindow
}
