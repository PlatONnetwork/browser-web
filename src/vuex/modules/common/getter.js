/**
 * Created by 15236 on 2017/10/25.
 */
export const commonGetter = {
	// 获取
    chainList(state){
        return state.chainList
	},
    //获取链id
    chainId(state){
        return state.chainId
    },
    //获取链http
    chainHttp(state) {
      return state.chainHttp
    },
    //获取title
    walletTitle(state) {
        return state.data
      }
}