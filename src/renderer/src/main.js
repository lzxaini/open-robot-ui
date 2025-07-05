import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import elementZhCn from 'element-plus/es/locale/lang/zh-cn'
import store from './store'
import router from './router'
// 注册指令
import plugins from './plugins' // plugins
import { download } from '@renderer/utils/request'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon/index.vue'
import elementIcons from './components/SvgIcon/svgicon'

import App from './App.vue'
const app = createApp(App)
// 全局方法挂载
app.config.globalProperties.download = download

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: elementZhCn,
  // 支持 large、default、small
  size: 'default'
})

app.mount('#app')
