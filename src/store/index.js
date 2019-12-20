import Vue from 'vue'
import Vuex from 'vuex'
import Problem from './problem'
import { Server } from "@/config";

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE != 'production',
    state: {
        catalog_id: 0,
        currentPage: 1,
        tag: 1,
        total: 0,
        list: null,
        catalogs: null,
    },
    mutations: {
        getProblems(state, list) {
            state.list = list
        },
        setTag(state, tag) {
            state.tag = tag
            console.log("当前标签", tag)
        },
        setTotal(state, total) {
            state.total = total
        },
        setPage(state, val) {
            console.log("当前页", val)
            state.currentPage = val
        },
        setCatalogs(state, catalogs) {
            state.catalogs = catalogs
        },
        setCatalog_id(state, catalog_id) {
            state.catalog_id = catalog_id
        },
    },
    actions: {
        async getProblems({ commit, state }) {
            let pro = await fetch(
                Server +
                "/api/getProblemList/" +
                state.catalog_id +
                "&" +
                state.tag +
                "&" +
                state.currentPage
            );
            let problems = await pro.json();

            let list = problems.data
            let total = problems.total
            commit('setTotal', total)
            commit('getProblems', list)
        },
        async setTag({ commit, dispatch }, tag) {
            commit('setTag', tag)
            await dispatch('getProblems')
        },
        async setPage({ commit, dispatch }, val) {
            commit('setPage', val)
            await dispatch('getProblems')
        },
        async setCatalogs({ commit, dispatch, state }, parentID, index) {
            let catalogs = state.catalogs
            let catalog = null
            if (state.catalogs == null) {
                let res = await fetch(Server + "/api/catalog/0");
                catalogs = await res.json();
                commit('setCatalogs', [catalogs])
                console.log([catalogs])

            } else {
                catalog = catalogs.slice()
                catalog = catalog[0]
                catalog = catalog.splice(0, index + 1);
                console.log([catalog])

                let res = await fetch(Server + "/api/catalog/" + parentID);
                let result = await res.json();
                console.log(result)
                if (result.length > 0) {
                    catalog.push(result);
                }
                console.log([catalog])
                commit('setCatalogs', [catalog])
            }

            // this.catalogs = [catalogs];
            commit('setCatalog_id', parentID)
            await dispatch('getProblems')
        },
    },
    getters: {
        count(state) {
            return state.a + state.b
        }
    },
    modules: {
        problems: Problem,
    }
})
