<template>
  <el-container id="app">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-main>
        <!-- <Main /> -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import Header from "@/components/header";
import Aside from "@/components/aside";
import Main from "@/components/main";

export default {
  name: "App",
  components: {
    Header,
    Main,
    Aside
  }
};
</script>

<style>
html * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease, background-color 0.2s ease;
}
a:hover {
  color: #ddd;
  text-decoration: none;
}
a:visited {
  color: #666;
  text-decoration: none;
}
a:link {
  text-decoration: none;
}
.el-header {
  background: #409eff;
}
.el-aside {
  background: #ddd;
}
.el-footer {
  background: #111;
  color: #fff;
}
</style>