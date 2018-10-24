/**
 * Created by zjw on 2018/7/11.
 */
import Vue from "vue";
const currencyId = {
	USD:{
		name: '美元',
		symbol: '$'
	},
	CNY:{
		name: '人民币',
		symbol: '￥'
	},
	HKD:{
		name: '港币',
		symbol: 'HKD'
	}
}
Vue.filter('currency',function(value,code,rate){
	if (!value) return ''
	rate = rate || 1
	return currencyId[code].symbol + value*rate
})


