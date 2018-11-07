/**
 * Created by 15236 on 2017/10/25.
 */
import { commonAction } from './action'
import { commonGetter } from './getter'
import { commonMutation } from './mutation'
export const common = {
    state: {
        chainList:[],
        chainId:'',
        chainHttp:''
    },
    actions: commonAction,
    getters: commonGetter,
    mutations: commonMutation
}
export default common
