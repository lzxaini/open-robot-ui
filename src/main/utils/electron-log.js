/*
 * @Author: lizhixiang 1245634367@qq.com
 * @Date: 2024-10-05 22:30:41
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-02-15 08:29:30
 * @FilePath: \beasun-plug-in\src\main\utils\electron-log.js
 * @Description: Fuck Bug
 * 微信：My-World-40
 */
import { app } from 'electron'
import log from 'electron-log'

log.transports.file.level = true //是否输出到 日志文件
log.transports.file.maxSize = 1002430 // 10M
log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}'
let date = new Date()
date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
// log.transports.file.resolvePathFn = () => `logs\\logs${date}.log`
log.transports.file.resolvePathFn = () => `${app.getPath('userData')}/logs/logs${date}.log`
log.transports.console.level = false //是否输出到 控制台
export default {
  info(param) {
    log.info(param)
  },
  warn(param) {
    log.warn(param)
  },
  error(param) {
    log.error(param)
  },
  debug(param) {
    log.debug(param)
  },
  verbose(param) {
    log.verbose(param)
  },
  silly(param) {
    log.silly(param)
  }
}
