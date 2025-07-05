/*
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2024-12-18 15:55:12
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-04-21 14:39:49
 * @FilePath: \beasun-plug-in\src\renderer\src\api\api.js
 * @Description: Fuck Bug
 * 微信：lizx2066
 */
import request from '@renderer/utils/request.js'
/**
 * @description 测试接口
 * @param {Object} data,
 **/
export async function testApi() {
  return await request({
    url: '/auth/code',
    method: 'GET'
  })
}
/**
 * 获取csv上料数据接口
 * @returns 
 */
export async function productProcessArtApi(workOrder) {
  return await request({
    url: `/mes/pro/productProcessArt/open/${workOrder.workOrderId}/${workOrder.deviceUid}/CSV`,
    method: 'GET'
  })
}
/**
 * 上料验证接口
 * @returns 
 */
export async function loaderVerifyApi(brandInfo) {
  return await request({
    url: `/mes/md/item/check/open/${brandInfo}`,
    method: 'GET'
  })
}
