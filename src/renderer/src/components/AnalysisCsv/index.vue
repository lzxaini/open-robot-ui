<!--
 * @Author: 17630921248 1245634367@qq.com
 * @Date: 2025-03-28 15:19:05
 * @LastEditors: 17630921248 1245634367@qq.com
 * @LastEditTime: 2025-04-23 12:55:41
 * @FilePath: \beasun-plug-in\src\renderer\src\components\AnalysisCsv\index.vue
 * @Description: Fuck Bug
 * 微信：lizx2066
-->
<template>
  <div
    class="csv-container"
    v-loading.fullscreen.lock="loading"
    element-loading-text="正在加载..."
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <table v-if="tableData.length" class="csv-table">
      <thead>
        <tr v-for="header in tableHeaders" :key="header">
          <th v-for="info in header" :key="info" v-show="info">{{ info }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableList" :key="rowIndex">
          <td
            v-for="(cell, cellIndex) in row.data"
            :key="cellIndex"
            :class="row.highlight ? 'highlight' : ''"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios'
import iconv from 'iconv-lite'
import Papa from 'papaparse'
import { nextTick, ref } from 'vue'
const fileInput = ref(null)
const tableData = ref([])
const tableList = ref([])
const tableHeaders = ref([])
const jsonData = ref([])
const headerKeyword = '机器编号' // 这里假设包含 "ID" 的行是表头，可修改
const loading = ref(true)
const emit = defineEmits(['getData'])

// 远程 CSV 链接示例（你可以换成自己的）
const csvUrl = `https://cdn.fxnws.com/beasun/test.csv?${new Date().getTime()}`

const props = defineProps({
  fileUrl: {
    type: String,
    default: ''
  }
})

/** 处理数据 */
const handleData = (result) => {
  const rawData = result.data
  // 自动找到表头
  let headerIndex = rawData.findIndex((row) => row.includes(headerKeyword))
  if (headerIndex === -1) {
    // proxy.$modal.msgError('未找到指定表头！');
    return
  }

  tableHeaders.value = rawData.slice(0, headerIndex + 1) // 取出表头
  console.log('tableHeaders.value', tableHeaders.value)
  tableData.value = rawData.slice(headerIndex + 1) // 取出数据
  // 加上标记字段，方便处理
  tableList.value = tableData.value.map((row) => ({ data: row, highlight: false }))

  // 转换为 JSON 格式
  jsonData.value = tableData.value.map((row) => {
    let obj = {}
    tableHeaders.value.forEach((key, index) => {
      obj[key] = row[index] || '' // 避免 undefined
    })
    return obj
  })
  loading.value = false // 关闭加载动画
  emit('getData', tableList.value) // 触发事件，传递数据
}
async function loadCSVWithEncoding(url, encoding = 'gb2312') {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer' // 获取二进制内容
    })

    const buffer = Buffer.from(response.data)
    const decodedStr = iconv.decode(buffer, encoding)

    return new Promise((resolve, reject) => {
      Papa.parse(decodedStr, {
        skipEmptyLines: true, // 忽略空行
        encoding: 'gb2312',
        download: false,
        header: false, // 将第一行作为表头，后续行作为数据对象
        complete: (results) => resolve(results),
        error: (err) => reject(err)
      })
    })
  } catch (err) {
    console.error('加载 CSV 失败:', err)
    throw err
  }
}
const getTableData = () => {
  return tableData.value
}
watch(
  () => props.fileUrl,
  async (val) => {
    if (val) {
      let res = await loadCSVWithEncoding(props.fileUrl, 'gb2312')
      // let res = await loadCSVWithEncoding(csvUrl, 'gb2312')
      if (res) {
        nextTick(() => {
          handleData(res)
        })
      } else {
        proxy.$modal.msgError('数据解析失败！')
      }
    }
  },
  { deep: true, immediate: true }
)
onMounted(() => {})
defineExpose({
  getTableData
})
</script>
<style scoped>
.csv-container {
  text-align: center;
  padding: 20px;
}
.csv-table {
  width: 100%;
  border-collapse: collapse;
}

.csv-table th,
.csv-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.csv-table th {
  background-color: #f4f4f4;
}
.highlight {
  background-color: #67c23a !important;
  color: #333 !important;
  font-weight: bold !important;
  font-size: 16px !important;
  text-align: center !important;
  border-radius: 5px !important;
  transition: all 0.7s ease-in-out !important;
}
</style>
