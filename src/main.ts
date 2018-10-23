import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'// 多语言
import messages from '@/lang/index'

// css
import '../static/css/reset.css'

// less
import '@/less/index.less'

Vue.use(VueI18n)

Vue.config.productionTip = false

const browserLanguage: string = navigator.language.toLowerCase()
const i18n = new VueI18n({
    // 定义默认语言
    locale: browserLanguage,
    messages
})

/* eslint-disable no-new */
export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
