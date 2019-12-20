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
      <el-menu-item-group>
        <el-menu-item
          :index="child.index"
          v-if="menu.type=='sub'"
          v-for="child in menu.children"
          :key="child.id"
        >{{child.title}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          index: "1",
          type: "sub",
          icon: "el-icon-menu",
          title: "题库集合",
          children: [
            {
              index: "1-1",
              to: { name: "set", params: {} },
              title: "C语言"
            },
            {
              index: "1-2",
              to: { name: "set", params: {} },
              title: "数据结构"
            },
            {
              index: "1-3",
              to: { name: "set", params: {} },
              title: "java"
            }
          ]
        },
        {
          index: "2",
          type: "sub",
          icon: "el-icon-menu",
          title: "我的题库",
          children: [
            {
              index: "1-1",
              to: { name: "set", params: {} },
              title: "C语言"
            },
            {
              index: "1-2",
              to: { name: "set", params: {} },
              title: "数据结构"
            },
            {
              index: "1-3",
              to: { name: "set", params: {} },
              title: "java"
            }
          ]
        },
        {
          index: "3",
          type: "sub",
          icon: "el-icon-setting",
          title: "题库设置"
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>