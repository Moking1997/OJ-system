<!--  -->
<template>
  <el-menu :default-openeds="['1','3']">
    <el-submenu :index="menu.index" v-for="menu in menus" :key="menu.id">
      <template slot="title">
        <router-link :to="{name:'set',params:{}}">
          <i :class="[menu.icon]"></i>
          {{menu.title}}
        </router-link>
      </template>
      <el-submenu
        :index="child.index"
        v-if="menu.type=='sub'"
        v-for="child in menu.children"
        :key="child.id"
      >
        <template slot="title">{{child.title}}</template>
        <el-submenu :index="child.index" v-for="child in child.children" :key="child.id">
          <template slot="title">{{child.title}}</template>
          <el-menu-item
            :index="child.index"
            v-for="child in child.children"
            :key="child.id"
          >{{child.title}}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          index: '1',
          type: 'sub',
          icon: 'el-icon-menu',
          title: '题库集合',
          children: [
            {
              index: '1-1',
              to: { name: 'set', params: {} },
              title: 'C语言',
              children: [
                {
                  index: '1-1-1',
                  to: { name: 'set', params: {} },
                  title: '循环',
                  children: [
                    {
                      index: '1-1-1-1',
                      to: { name: 'set', params: {} },
                      title: 'for'
                    },
                    {
                      index: '1-1-1-2',
                      to: { name: 'set', params: {} },
                      title: 'while'
                    }
                  ]
                },
                {
                  index: '1-1-2',
                  to: { name: 'set', params: {} },
                  title: '数组',
                  children: [
                    {
                      index: '1-1-2-1',
                      to: { name: 'set', params: {} },
                      title: '一维数组'
                    },
                    {
                      index: '1-1-2-2',
                      to: { name: 'set', params: {} },
                      title: '二维数组'
                    }
                  ]
                },
                {
                  index: '1-3-2',
                  to: { name: 'set', params: {} },
                  title: '函数'
                }
              ]
            },
            {
              index: '1-2',
              to: { name: 'set', params: {} },
              title: 'java',
              children: [
                {
                  index: '1-2-1',
                  to: { name: 'set', params: {} },
                  title: 'java循环',
                  children: [
                    {
                      index: '1-2-1-1',
                      to: { name: 'set', params: {} },
                      title: 'for'
                    },
                    {
                      index: '1-2-1-2',
                      to: { name: 'set', params: {} },
                      title: 'while'
                    }
                  ]
                },
                {
                  index: '1-2-2',
                  to: { name: 'set', params: {} },
                  title: '数组',
                  children: [
                    {
                      index: '1-2-2-1',
                      to: { name: 'set', params: {} },
                      title: '一维数组'
                    },
                    {
                      index: '1-2-2-2',
                      to: { name: 'set', params: {} },
                      title: '二维数组'
                    }
                  ]
                },
                {
                  index: '1-3-2',
                  to: { name: 'set', params: {} },
                  title: '函数'
                }
              ]
            },
            {
              index: '1-3',
              to: { name: 'set', params: {} },
              title: 'c++',
              children: [
                {
                  index: '1-3-1',
                  to: { name: 'set', params: {} },
                  title: 'c++循环',
                  children: [
                    {
                      index: '1-3-1-1',
                      to: { name: 'set', params: {} },
                      title: 'for'
                    },
                    {
                      index: '1-3-1-2',
                      to: { name: 'set', params: {} },
                      title: 'while'
                    }
                  ]
                },
                {
                  index: '1-3-2',
                  to: { name: 'set', params: {} },
                  title: '数组',
                  children: [
                    {
                      index: '1-3-2-1',
                      to: { name: 'set', params: {} },
                      title: '一维数组'
                    },
                    {
                      index: '1-3-2-2',
                      to: { name: 'set', params: {} },
                      title: '二维数组'
                    }
                  ]
                },
                {
                  index: '1-3-3',
                  to: { name: 'set', params: {} },
                  title: '函数'
                }
              ]
            }
          ]
        },
        {
          index: '2',
          type: 'sub',
          icon: 'el-icon-menu',
          title: '我的题库',
          children: [
            {
              index: '2-1',
              to: { name: 'set', params: {} },
              title: 'C语言',
              children: [
                {
                  index: '2-1-1',
                  to: { name: 'set', params: {} },
                  title: '循环',
                  children: [
                    {
                      index: '2-1-1-1',
                      to: { name: 'set', params: {} },
                      title: 'for'
                    },
                    {
                      index: '2-1-1-2',
                      to: { name: 'set', params: {} },
                      title: 'while'
                    }
                  ]
                },
                {
                  index: '2-1-2',
                  to: { name: 'set', params: {} },
                  title: '数组',
                  children: [
                    {
                      index: '2-1-2-1',
                      to: { name: 'set', params: {} },
                      title: '一维数组'
                    },
                    {
                      index: '2-1-2-2',
                      to: { name: 'set', params: {} },
                      title: '二维数组'
                    }
                  ]
                },
                {
                  index: '2-3-2',
                  to: { name: 'set', params: {} },
                  title: '函数'
                }
              ]
            },
            {
              index: '2-2',
              to: { name: 'set', params: {} },
              title: 'java',
              children: [
                {
                  index: '2-2-1',
                  to: { name: 'set', params: {} },
                  title: 'java循环',
                  children: [
                    {
                      index: '2-2-1-1',
                      to: { name: 'set', params: {} },
                      title: 'for'
                    },
                    {
                      index: '2-2-1-2',
                      to: { name: 'set', params: {} },
                      title: 'while'
                    }
                  ]
                },
                {
                  index: '2-2-2',
                  to: { name: 'set', params: {} },
                  title: '数组',
                  children: [
                    {
                      index: '2-2-2-1',
                      to: { name: 'set', params: {} },
                      title: '一维数组'
                    },
                    {
                      index: '2-2-2-2',
                      to: { name: 'set', params: {} },
                      title: '二维数组'
                    }
                  ]
                },
                {
                  index: '2-3-2',
                  to: { name: 'set', params: {} },
                  title: '函数'
                }
              ]
            },
            {
              index: '2-3',
              to: { name: 'set', params: {} },
              title: 'c++',
              children: [
                {
                  index: '2-3-1',
                  to: { name: 'set', params: {} },
                  title: 'c++循环',
                  children: [
                    {
                      index: '2-3-1-1',
                      to: { name: 'set', params: {} },
                      title: 'for'
                    },
                    {
                      index: '2-3-1-2',
                      to: { name: 'set', params: {} },
                      title: 'while'
                    }
                  ]
                },
                {
                  index: '2-3-2',
                  to: { name: 'set', params: {} },
                  title: '数组',
                  children: [
                    {
                      index: '2-3-2-1',
                      to: { name: 'set', params: {} },
                      title: '一维数组'
                    },
                    {
                      index: '2-3-2-2',
                      to: { name: 'set', params: {} },
                      title: '二维数组'
                    }
                  ]
                },
                {
                  index: '2-3-3',
                  to: { name: 'set', params: {} },
                  title: '函数'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>