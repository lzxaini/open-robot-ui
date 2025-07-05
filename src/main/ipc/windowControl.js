/*
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2025-04-18 09:31:46
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-07-05 08:25:55
 * @FilePath: \open-reobot-ui\src\main\ipc\windowControl.js
 * @Description: Fuck Bug
 * 微信：lizx2066
 */
import { ipcMain } from 'electron'
import logger from '../utils/electron-log'

export default function windowControl() {
  // 创建通知进程
  ipcMain.on('noticeWindow', () => {
    const configWindow = getConfigWindow()
    logger.info(JSON.stringify('渲染通知：noticeWindow'))
    if (configWindow) {
      configWindow.show()
    }
  })
  // 等待开发进程
  ipcMain.on('waitWindow', () => {
    const noticeWindow = getNoticeWindow()
    logger.info(JSON.stringify('渲染通知：waitWindow'))
    if (noticeWindow) {
      noticeWindow.show()
    } else {
      createNoticeWindow()
    }
  })
  // 创建在制详情进程
  ipcMain.on('workOrderWindow', () => {
    const workOrderWindow = getWorkOrderWindow()
    logger.info(JSON.stringify('渲染通知：workOrderWindow'))
    if (workOrderWindow) {
      workOrderWindow.show()
    } else {
      createWorkOrderWindow()
    }
  })
  // 上料验证
  ipcMain.on('loaderVerifyWindow', (event, data) => {
    const loaderVerifyWindow = getLoaderVerifyWindow()
    console.log('渲染通知：loaderVerifyWindow', loaderVerifyWindow)
    logger.info(JSON.stringify('渲染通知：loaderVerifyWindow'))
    if (loaderVerifyWindow) {
      loaderVerifyWindow.show()
    } else {
      createLoaderVerify(data.artUrl)
    }
  })
  // 关闭指定窗口
  ipcMain.on('closeWindows', (event, data) => {
    let configWindow = getConfigWindow()
    let workOrderWindow = getWorkOrderWindow()
    console.log('渲染通知：closeWindows')
    logger.info(JSON.stringify('渲染通知：closeWindows'))
    if (data == 'workOrderWindow') {
      workOrderWindow.destroy()
      workOrderWindow = null
    }
    if (data == 'configWindow') {
      configWindow.destroy()
      configWindow = null
    }
  })
}
