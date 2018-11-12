import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common/module.js'
import monitor from './modules/monitor/module.js'
import index from './modules/index/module'
Vue.use(Vuex)
// 创建 store 实例
export default new Vuex.Store({
	modules: {
	common,
	monitor,
	index
	},
})

