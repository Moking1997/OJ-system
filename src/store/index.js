import Vue from 'vue'
import Vuex from 'vuex'
import Problem from './problem'
import User from './user'
import { Server } from "@/config";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE != 'production',
    // strict: false,
    state: {
        tree: [],
        catalogSelected: ["-1", "-1", "-1"],
        parentID: 0,
        catalog_id: 0,
        currentPage: 1,
        tag: 1,
        total: 0,
        list: null,
        catalogs: null,
        catalogs_index: 0,
        menu: null,
        catalogsName:"",
    },
    mutations: {
        getProblems(state, list) {
            state.list = list
        },
        setCatalogsName(state, name) {
            state.catalogsName = name
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
        setSelected(state, catalogSelected) {
            state.catalogSelected = catalogSelected
        },
        getMenus(state, menu) {
            state.menu = menu
        },
        getTree(state, tree) {
            state.tree = tree
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
        },
        setSelected({ commit }, catalogSelected) {
            commit('setSelected', catalogSelected)
        },
        setCatalogsName({commit}, name) {
            commit('setCatalogsName', name)
        },
        async getTree({ commit }) {
            let res = await axios.get("http://localhost:8088/api/catalog/0");
            let tree = res.data;

            async function readTree(element) {
                try {
                    let res = await axios.get(
                        "http://localhost:8088/api/catalog/" + element.ID
                    );
                    let children = res.data;
                    // this.$set(element, "children", children);
                    element.children = children
                    if (children.length != 0) {
                        element.children.forEach(async element => {
                            readTree(element);
                        });
                    }
                } catch (err) {
                    console.log(err);
                    alert("请求出错！");
                }
            }
            tree.forEach(async element => {
                readTree(element);
            });
            commit('getTree', tree)
        },
    },
    getters: {
        count(state) {
            return state.a + state.b
        }
    },
    modules: {
        problems: Problem,
        user: User,
    }
})
