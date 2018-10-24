import Vue from "vue";
//交易状态
Vue.filter('tradeStatus',function(state){
  if(state==1){
    return '成功'
  }else if(state==0){
    return '失败'
  }else{
    return 'pending'
  }
})