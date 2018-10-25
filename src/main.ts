import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueI18n from 'vue-i18n'
import messages from '@/lang/index'
import ElementUI from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import filters from './filters/index'
// css
import '../static/css/reset.css'
import '../static/css/element-ui.css'

// less
import '@/less/index.less'
import {mapActions} from 'vuex'
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VueClipboard)

Vue.config.productionTip = false

const browserLanguage: string = navigator.language.toLowerCase()
const i18n = new VueI18n({
    locale: browserLanguage,
    messages
})

export default new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
    methods: {
        ...mapActions(['initJsonData']),
    },
    created(){
        this.initJsonData(i18n.locale)
    },
})
// (<any>window).vueVm = new Vue({
//     el: '#app',
//     i18n,
//     router,
//     store,
//     render: h => h(App),
//     beforeCreate(){
//         store.dispatch('initJsonData', i18n.locale)
//     }
// })
