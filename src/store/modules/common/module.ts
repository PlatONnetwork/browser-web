import { commonAction } from './action'
import { commonGetter } from './getter'
import { commonMutation } from './mutation'

export default {
    state: {
        info: {
            data: 'temp platon'
        }
    },
    actions: commonAction,
    getters: commonGetter,
    mutations: commonMutation
}
