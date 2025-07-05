<!--
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2024-12-18 16:35:27
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-07-05 08:18:25
 * @FilePath: \open-reobot-ui\src\renderer\src\views\index.vue
 * @Description: Fuck Bug
 * 微信：lizx2066
-->
<template>
  <div class="p-2">
    123
    <el-button @click="sendIPC">打开test窗口</el-button>
    <el-button @click="sendlevitation">打开悬浮窗</el-button>
  </div>
</template>

<script setup>
const { proxy } = getCurrentInstance()
const getTest = async () => {
  proxy?.$modal.msgSuccess('成功！')
}
const sendIPC = () => {
  window.electron.ipcRenderer.send('ping')
}

const sendlevitation = () => {
  window.electron.ipcRenderer.send('levitation')
}
onMounted(() => {
  console.log('获取', window.electron)
  getTest()
})
</script>

<style scoped lang="scss">
.p-2{
  width: 1920px;
  height: 1080px;
  background-color: red;
}
</style>
