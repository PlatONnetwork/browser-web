import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common/module.js'
Vue.use(Vuex)
// 创建 store 实例
export default new Vuex.Store({
	modules: {
        common,
	},
})

