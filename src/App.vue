<template>
  <el-container id="app">
    <div v-if="$route.path.split('/')[1]=='login'">
      <Login />
    </div>
    <div v-if="$route.path.split('/')[1]!='login'" style="width:100%;">
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </div>
  </el-container>
</template>

<script>
import Header from "@/components/header";
import Aside from "@/components/aside";
import Main from "@/components/main";
import Login from "@/pages/login";

export default {
  name: "App",
  components: {
    Header,
    Main,
    Aside,
    Login
  },
  async created() {
    this.$router.push("/login").catch(err => {
      err;
    });
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
.el-table th > .cell > .el-checkbox {
  left: 4px;
}
</style>