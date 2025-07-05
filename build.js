/*
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2025-07-05 08:59:42
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-07-05 08:59:44
 * @FilePath: \open-reobot-ui\build.js
 * @Description: Fuck Bug
 * 微信：lizx2066
 */
const { execSync } = require('child_process')

if (process.platform === 'win32') {
  execSync('chcp 65001', { stdio: 'inherit' })
}

execSync('electron-vite build', { stdio: 'inherit' })
