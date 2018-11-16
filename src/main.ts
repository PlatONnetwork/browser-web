import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueI18n from 'vue-i18n'
import messages from '@/lang/index'
import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import VueClipboard from 'vue-clipboard2'
import filters from './filters/index'
import { mapActions } from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// css
import '../static/css/reset.css'
import '../static/css/element-ui.css'
import '../static/css/iconfont.css'
import 'swiper/dist/css/swiper.css'
// less
import '@/less/index.less'

Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
// window.responseInfo = '';
const browserLanguage: string = navigator.language.toLowerCase()
const i18n = new VueI18n({
    locale: browserLanguage,
    messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default window.vueVm= new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
    methods: {
        ...mapActions(['initJsonData'])
    },
    beforeCreate(){
        store.dispatch('initJsonData', i18n.locale);
    },
    created() {
        // this.initJsonData(i18n.locale)
    }
}).$mount('#app')
// window.vueVm = new Vue({
//     el: '#app',
//     router,
//     store,
//     i18n,
//     // render: h => h(App),
//     methods: {
//         ...mapActions(['initJsonData'])
//     },
//     created() {
//         this.initJsonData(i18n.locale)
//     }
// })


