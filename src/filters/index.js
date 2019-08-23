import Vue from 'vue'

// 数字国际千分位
const formatNumber = Vue.filter("formatNumber", (num,count) => {
    const reg=/\d{1,3}(?=(\d{3})+$)/g;
    let str= num + '';                                   
    if(str.indexOf('.')==-1){
        return str.replace(reg, '$&,'); 
    }else{
        if(count){
            str=Number(num).toFixed(count).toString()
        }else{
            str=Number(num).toFixed(2).toString()
        }         
        return str.split('.')[0].replace(reg, '$&,')+'.'+str.split('.')[1];
    } 
});
// 金额国际千分位
const formatMoney = Vue.filter("formatMoney", (num) => {
    const reg=/\d{1,3}(?=(\d{3})+$)/g;
    let str= num + '';                                   
    if(str.indexOf('.')==-1){
        return str.replace(reg, '$&,'); 
    }else{       
        return str.split('.')[0].replace(reg, '$&,')+'.'+str.split('.')[1];
    }
});
// 百分比
const percentage = Vue.filter("percentage", (a,b) => {
    if(a&&b){
        const x = a/b*100;
        if(x%1==0){
            return x;
        }
        return x.toFixed(2);
    }
    return 0;   
});
//超过1k,以K为单位，超过1000K，单位M，小数点2位
const unit = Vue.filter("unit", (value) => {    
    if ( (value) < 1000){
        return value
    }else if(1000 < (value) && (value) < 1000000){
        return (value/1000).toFixed(2)+'K'
    }else if((value) >1000000 ){
        return (value/1000000).toFixed(2)+'M'
    }  
});
// 字符串截取
const sliceStr = Vue.filter("sliceStr", (str,num) => {
    return str.slice(0,num)+"..."
});
export default [formatNumber,percentage,unit,formatMoney,sliceStr]