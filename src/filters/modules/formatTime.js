/**
 * Created by zjw on 2018/7/16.
 */
import Vue from "vue";
Vue.filter('timeFormat',function(value,timezone){
	if (!value) return ''
	let targetDate;
	value = Number(value)*1000
	if(timezone){
		const offset_GMT = new Date().getTimezoneOffset();
		targetDate = new Date(value + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000).Format('yyyy-MM-dd HH:mm:ss');
		return targetDate
	}
	return new Date(value).Format('yyyy-MM-dd HH:mm:ss')
})

