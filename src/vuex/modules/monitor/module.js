/**
 * Created by 15236 on 2017/10/25.
 */
import { monitorAction } from './action'
import { monitorGetter } from './getter'
import { monitorMutation } from './mutation'
export const monitor = {
    state: {
        nodeObj:{},//节点监控图标数据
        indexObj:{},//实时监控指标
        statisticObj:{},//出块时间及交易数据
        blockList:[],//实时区块列表
        tradeList:[],//实时交易列表
    },
    actions: monitorAction,
    getters: monitorGetter,
    mutations: monitorMutation
}
export default monitor
