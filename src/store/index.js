import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE != 'production',
    state: { a: 12, b: 5 },
    mutations: {

    },
    actions: {},
    getters: {
        count(state) {
            return state.a + state.b
        }
    },
    modules: {}
})
