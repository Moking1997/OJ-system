export default {
    state: {
        list: [{
            id: 0,
            name: 1,
            password: 1,
        }],
        idd: 1,
    },
    mutations: {
        setList(state, list) {
            state.list = list
        },
    },
    actions: {
        setList({ commit }, list) {
            commit('setList', list)
        },
    }
}