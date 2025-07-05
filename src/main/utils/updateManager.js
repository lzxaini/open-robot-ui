/*
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2024-11-27 14:38:00
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-02-15 08:59:06
 * @FilePath: \beasun-plug-in\src\main\utils\updateManager.js
 * @Description: Fuck Bug
 * 微信：lizx2066
 */
/****************  检查版本更新 start ****************
 * autoUpdater.checkForUpdates(); 检测是否最新版
 * autoUpdater.downloadUpdate(); 下载最新版
 */
import { autoUpdater } from 'electron-updater'
import { BrowserWindow, dialog } from 'electron'

// 配置项
// autoUpdater.forceDevUpdateConfig = false //开发环境下强制更新
// autoUpdater.autoDownload = false; // 自动下载
// autoUpdater.autoInstallOnAppQuit = true; // 应用退出后自动安装

// 是否开启了检测
let isStartCheckForUpdates = false
const forceDevUpdateConfig = false // 开发环境下强制更新
const autoDownloadFlag = true // 是否自动下载更新
const autoInstallFlag = true // 下载完成自动安装
let customDialog = null
function checkForUpdates(mainWindow, url) {
  if (isStartCheckForUpdates) {
    return
  }
  isStartCheckForUpdates = true
  if (typeof url !== 'string') {
    url = 'https://cdn.fxnws.com/beasun/app/plugin/x64/'
  }
  // 指定更新地址
  autoUpdater.setFeedURL(url)
  autoUpdater.autoDownload = autoDownloadFlag
  autoUpdater.forceDevUpdateConfig = forceDevUpdateConfig
  autoUpdater.checkForUpdates()
  // 开始检查更新事件; 提示语: '正在检查更新';
  autoUpdater.on('checking-for-update', function () {})
  // 发现可更新版本; 提示语: 检测到新版本，准备下载
  autoUpdater.on('update-available', function () {
    if (customDialog) {
      customDialog.close()
      customDialog = null
    }
    // 是否自动下载
    if (autoDownloadFlag) {
      autoUpdater.downloadUpdate()
      // 系统原生弹窗让用户选择是否更新
      customDialog = dialog
        .showMessageBox(mainWindow, {
          type: 'info',
          title: '检测到有新版本',
          message:
            '正在后台为您下载最新版本，下载完成后将会自动安装更新！安装过程中软件退出重启是正常现象！',
          buttons: ['好的'],
          cancelId: 1 // 指定“取消”按钮的索引
        })
        .then((result) => {
          customDialog = null
          isStartCheckForUpdates = false
        })
        .catch(() => {
          customDialog = null
          isStartCheckForUpdates = false
        })
      return
    }
    // 系统原生弹窗让用户选择是否更新
    customDialog = dialog
      .showMessageBox(mainWindow, {
        type: 'info',
        title: '检测到有新版本',
        message: '检测到新版本,是否立即更新?',
        buttons: ['确定', '取消'],
        cancelId: 1 // 指定“取消”按钮的索引
      })
      .then((result) => {
        customDialog = null
        if (result.response === 0) {
          // 下载最新版
          autoUpdater.downloadUpdate()
        } else {
          // 用户点击了“取消”
        }
        isStartCheckForUpdates = false
      })
      .catch(() => {
        customDialog = null
        isStartCheckForUpdates = false
      })
  })
  // 没有可更新版本事件; 提示语: '已经是最新版本';
  autoUpdater.on('update-not-available', function () {
    console.log('已经是最新版本')
    isStartCheckForUpdates = false
  })
  // 更新发生错误时事件; 提示语: '软件更新异常,请重试';
  autoUpdater.on('error', function () {
    if (customDialog) {
      customDialog.close()
      customDialog = null
    }
    // 提示用户更新失败
    customDialog = dialog
      .showMessageBox({
        type: 'info',
        title: '更新检查',
        message: '软件更新异常,请重试!',
        buttons: ['好的']
      })
      .then(() => {
        customDialog = null
      })
  })
  // 更新下载完毕后事件; 提示语: '下载完成,准备安装';
  autoUpdater.on('update-downloaded', function () {
    if (customDialog) {
      customDialog.close()
      customDialog = null
    }
    // 是否自动安装
    if (autoInstallFlag) {
      autoUpdater.quitAndInstall()
      // setTimeout(() => {
      //   autoUpdater.quitAndInstall();
      // }, 1000 * 6);
      // 下载后安装更新
      // customDialog = dialog
      //   .showMessageBox({
      //     type: 'info',
      //     title: '更新完成',
      //     message: '5s后将为您自动安装更新！安装过程中系统将会退出重启！',
      //     buttons: ['好的']
      //   })
      //   .then((result) => {
      //     customDialog = null;
      //   })
      //   .catch(() => {
      //     customDialog = null;
      //   });
      return
    }
    // 下载后安装更新
    customDialog = dialog
      .showMessageBox({
        type: 'info',
        title: '更新完成',
        message: '更新已下载完成，是否立即安装应用?',
        buttons: ['立即安装']
      })
      .then((result) => {
        customDialog = null
        if (result.response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
      .catch(() => {
        customDialog = null
      })
  })
  // 更新下载进度事件; 提示语: '软件下载中,请耐心等待';
  autoUpdater.on('download-progress', function (progressObj) {
    /** progressObj {
        total: 1000000, // 总字节数，例如 1MB
        delta: 1024, // 自上次事件以来下载的字节数，例如 1KB
        transferred: 512000, // 已下载的总字节数，例如 512KB
        percent: 0.5, // 下载进度的百分比，例如 50%
        bytesPerSecond: 2048 // 当前下载速度，例如 2KB/s
      }
    */
    // 使用原生进度条
    if (progressObj.percent !== undefined) {
      const progress = Math.round(progressObj.percent)
      mainWindow.setProgressBar(progress / 100) // 设置任务栏进度
    } else {
      mainWindow.setProgressBar(-1)
    }
  })
}
export default checkForUpdates
/****************  检查版本更新 end *****************/
