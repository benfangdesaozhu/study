// vuex使用：actions通过commit触发 mutations的方法，从而更改state
// actions是通过store.dispatch触发.也可以直接this.$store.commit('LOGIN_DATA', {text: 'new text'})进行

import { actions } from './actions'
import * as getters from './getters'
import { mutations } from './mutations'
const state = {
    loginData: {
        text: 'store test text'
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}