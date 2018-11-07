/**
 * Created by 15236 on 2017/10/25.
 */
export const commonMutation = {
    ['DONE_CHAINLIST'](state,data){
        state.chainList=data
        console.log(state.chainList)
    },
    ['CHANGE_ID'](state,id){
        state.chainId=id
    },
    ['CHANGE_HTTP'](state, http) {
      state.chainHttp = http
    }
    
}