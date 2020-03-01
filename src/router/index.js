import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Add_problem from '@/pages/add_problem'
import Problem from '@/pages/problem'
import Set from '@/pages/set'
import Admin from '@/pages/admin'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/set',
      name: 'set',
      component: Set
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/add_problem',
      name: 'add_problem',
      component: Add_problem
    },
    {
      path: '/problem',
      name: 'problem',
      component: Problem
    },
  ]
})
