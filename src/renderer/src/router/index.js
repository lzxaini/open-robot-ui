/*
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2024-12-18 15:51:28
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-07-05 08:04:31
 * @FilePath: \open-reobot-ui\src\renderer\src\router\index.js
 * @Description: Fuck Bug
 * 微信：lizx2066
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@renderer/views/index.vue'),
    meta: { title: '首页' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
