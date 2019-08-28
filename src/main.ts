import "babel-polyfill"

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueI18n from 'vue-i18n'
import messages from '@/lang/index'
import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import VueClipboard from 'vue-clipboard2'
import { mapActions } from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './filters'
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
// router.beforeEach((to,from,next)=>{
//     console.log('开始啦啦啦')
// })
router.afterEach(function (to) {
    window.scrollTo(0, 0)
})

Vue.config.productionTip = false
// window.responseInfo = '';
// const browserLanguage: string = navigator.language.toLowerCase()
//获取location后的search信息
const GetQueryString = (name) => {
    let  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(decodeURI(r[2])); return null;
}
if (GetQueryString('lang')){
    if (GetQueryString('lang')=='zh'){
        //中文
        localStorage.setItem('i18nLocale', 'zh-cn')
    } else if (GetQueryString('lang') == 'en'){
        //英文
        localStorage.setItem('i18nLocale', 'en')
    }
}
console.warn('GetQueryString>>>>>.', GetQueryString('lang'))
const language = navigator.language || window.navigator['browserLanguage'];
const browserLanguage: string = localStorage.getItem('i18nLocale') ? localStorage.getItem('i18nLocale'):language.toLowerCase()
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
        // console.warn('hahahahahahaha')
        store.dispatch('initJsonData', i18n.locale);
        // if(sessionStorage.getItem('commandId')){

        // }else{
        //     store.dispatch('initJsonData', i18n.locale);
        // }

    },
    created() {
        // this.initJsonData(i18n.locale)
    },
    beforeDestroy() {
        localStorage.removeItem('i18nLocale');
    },
    destroyed() {
        localStorage.removeItem('i18nLocale');
    }
}).$mount('#app')

// console.warn(window.vueVm.$i18n.t('elseInfo.minutes'))
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

//提案类型   1：文本提案； 2：升级提案；  3参数提案。
Vue.filter("proposalType", (type: string): string => {
  if (type === "1") return "文本提案";
  if (type === "2") return "升级提案";
  if (type === "3") return "参数提案";
  return "未知类型"
});

//状态  1：投票中  2：通过  3：失败   4：预升级  5：升级完成    已通过=2 或4 或 5
Vue.filter("proposalStatus", (status: string): string => {
  if (status === "1") return "投票中";
  if (status === "2" || status === "4" || status === "5") return "已通过";
  if (status === "3") return "已拒绝";
  return "未知状态"
});

//投票选型  1：支持；  2：反对；  3弃权
Vue.filter("votePropotype", (status: string): string => {
  if (status === "1") return "支持";
  if (status === "2") return "反对";
  if (status === "3") return "弃权";
  return "未知类型"
});