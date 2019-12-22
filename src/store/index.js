import Vue from 'vue'
import Vuex from 'vuex'
import Problem from './problem'
import { Server } from "@/config";

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE != 'production',
    state: {
        catalogSelected: ["-1", "-1", "-1"],
        parentID: 0,
        catalog_id: 0,
        currentPage: 1,
        tag: 1,
        total: 0,
        list: null,
        catalogs: null,
        catalogs_index: 0,
        menu: null
    },
    mutations: {
        getProblems(state, list) {
            state.list = list
        },
        setTag(state, tag) {
            state.tag = tag
            console.log("当前标签", tag)
        },
        setIndex(state, catalogs_index) {
            state.catalogs_index = catalogs_index
        },
        setTotal(state, total) {
            state.total = total
        },
        setPage(state, val) {
            console.log("当前页", val)
            state.currentPage = val
        },
        setCatalogs(state, catalogs) {
            if (state.catalogs == null) {
                state.catalogs = catalogs
            } else {
                state.catalogs = state.catalogs.splice(0, state.catalogs_index + 1);
                state.catalogs.push(catalogs[0]);
                // console.log(state.catalogs[0])
            }
        },
        setCatalog_id(state, catalog_id) {
            state.catalog_id = catalog_id
        },
        setParentID(state, ParentID) {
            state.ParentID = ParentID
        },
        setCatalogSelected(state, { index, catalogSelected }) {
            state.catalogSelected[index] = catalogSelected
        },
        getMenus(state, menu) {
            state.menu = menu
        }
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
        setIndex({ commit }, index) {
            commit('setIndex', index)
        },
        setCatalog_id({ commit }, parentID) {
            commit('setCatalog_id', parentID)
        },
        async setCatalogs({ commit, dispatch, state }, { parentID, index }) {
            let res = await fetch(Server + "/api/catalog/" + parentID);
            let result = await res.json();
            commit('setIndex', index)
            if (result.length > 0) {
                commit('setCatalogs', [result])
            }
            commit('setParentID', state.catalog_id)
            commit('setCatalog_id', parentID)
            await dispatch('getProblems')
        },
        async getMenus({ commit, dispatch, state }) {
            let res = await fetch(Server + "/api/catalog/0");
            let result = await res.json();
            commit('getMenus', [result])

        },
        setCatalogSelected({ commit }, { index, catalogSelected }) {
            commit('setCatalogSelected', { index: index, catalogSelected: catalogSelected })
        }
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
