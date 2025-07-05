/*
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2024-05-25 16:30:54
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2024-12-18 16:21:50
 * @FilePath: \beasun-plug-in\src\store\modules\useMQTTStore.js
 * @Description: Fuck Bug
 * 微信：My-World-40
 */
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import * as mqtt from 'mqtt/dist/mqtt.min'
import { dayjs } from 'element-plus'
let options = {
  password: 'Beasun@13579',
  username: '',
  cleanSession: true,
  keepAlive: 30,
  clientId: 'web-' + Math.random().toString(16).substr(2),
  connectTimeout: 10000
}
// 配置Mqtt地址
let brokerUrl = import.meta.env.VITE_APP_EMQX_SERVER_URL
if (brokerUrl == '') {
  brokerUrl = 'ws://' + window.location.hostname + ':8083/mqtt'
  console.log('自动获取地址')
}
console.log('mqtt地址：', brokerUrl, options)
export const useMQTTStore = defineStore('mqtt', () => {
  const state = reactive({
    client: null,
    isConnected: false
  })
  const getNowDateTime = () => {
    return dayjs(new Date()).format('YYYY-MM-DD HH:mm')
  }
  // 连接MQTT服务器，支持传入brokerUrl和options
  const connect = () => {
    state.client = mqtt.connect(brokerUrl, options)
    state.client.on('connect', () => {
      state.isConnected = true
      console.log('已连接到MQTT服务器', getNowDateTime(), state.isConnected)
    })

    state.client.on('error', (err) => {
      console.error('MQTT连接错误:', getNowDateTime(), err)
    })

    state.client.on('close', () => {
      state.isConnected = false
      console.log('MQTT连接已关闭', getNowDateTime())
    })

    state.client.on('offline', () => {
      console.log('MQTT客户端离线', getNowDateTime())
    })

    state.client.on('reconnect', () => {
      console.log('正在重新连接MQTT服务器...', getNowDateTime())
    })
  }

  // 断开连接
  const disconnect = () => {
    if (state.client) {
      state.client.end()
      state.client = null
      state.isConnected = false
      console.log('已断开MQTT连接')
    }
  }

  // 发布消息
  const publish = (topic, message) => {
    if (state.client && state.isConnected) {
      state.client.publish(topic, message)
    } else {
      console.error('无法发布消息，MQTT客户端未连接')
    }
  }

  // 订阅主题
  const subscribe = (topic) => {
    if (state.client && state.isConnected) {
      state.client.subscribe(topic, (err) => {
        if (err) {
          console.error('MQTT订阅错误:', err)
        } else {
          console.log(`已订阅主题: ${topic}`)
        }
      })
    } else {
      console.error('无法订阅，MQTT客户端未连接')
    }
  }

  // 取消订阅主题
  const unsubscribe = (topic) => {
    if (state.client && state.isConnected) {
      state.client.unsubscribe(topic, (err) => {
        if (err) {
          console.error('MQTT取消订阅错误:', err)
        } else {
          console.log(`已取消订阅主题: ${topic}`)
        }
      })
    } else {
      console.error('无法取消订阅，MQTT客户端未连接')
    }
  }
  // 消息监听
  const onMessage = (func) => {
    if (state.isConnected) {
      state.client.on('message', func)
    }
  }
  return {
    state,
    connect,
    disconnect,
    publish,
    subscribe,
    unsubscribe,
    onMessage
  }
})
