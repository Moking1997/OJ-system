<!--  -->
<template>
  <el-menu :default-openeds="['1','3']">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>固定题库合集
      </template>
      <el-submenu index="1-2">
        <template slot="title">C语言</template>
        <el-submenu index="1-2-1">
          <template slot="title">循环</template>
          <el-menu-item index="1-2-1-1">swich</el-menu-item>
          <el-menu-item index="1-2-1-2">for</el-menu-item>
          <el-menu-item index="1-2-1-3">while</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-2-2">函数</el-menu-item>
      </el-submenu>
      <el-submenu index="1-3">
        <template slot="title">数据结构</template>
        <el-submenu index="1-3-1">
          <template slot="title">树</template>
          <el-menu-item index="1-3-1-1">二叉树</el-menu-item>
          <el-menu-item index="1-3-1-2">N元树</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-3-2">栈</el-menu-item>
        <el-menu-item index="1-3-3">队列</el-menu-item>
      </el-submenu>
      <el-submenu index="1-4">
        <template slot="title">C++</template>
        <el-menu-item index="1-4-1">程序设计</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>我的题库集合
      </template>
      <el-submenu index="1-2">
        <template slot="title">C语言</template>
        <el-submenu index="1-2-1">
          <template slot="title">循环</template>
          <el-menu-item index="1-2-1-1">swich</el-menu-item>
          <el-menu-item index="1-2-1-2">for</el-menu-item>
          <el-menu-item index="1-2-1-3">while</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-2-2">函数</el-menu-item>
      </el-submenu>
      <el-submenu index="1-3">
        <template slot="title">数据结构</template>
        <el-submenu index="1-3-1">
          <template slot="title">树</template>
          <el-menu-item index="1-3-1-1">二叉树</el-menu-item>
          <el-menu-item index="1-3-1-2">N元树</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-3-2">栈</el-menu-item>
        <el-menu-item index="1-3-3">队列</el-menu-item>
      </el-submenu>
      <el-submenu index="1-4">
        <template slot="title">C++</template>
        <el-menu-item index="1-4-1">程序设计</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>题库设置
      </template>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
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