<!--  -->
<template>
  <el-menu :default-openeds="['1','3']">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <router-link to="./">题库管理</router-link>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="child in menus"
          :key="child.ID"
          @click="catalog_change(child.ID)"
        >{{child.title}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <router-link to="./">个人题库</router-link>
      </template>
      <el-menu-item-group>
        <el-menu-item>
          <el-button type="primary" @click="dialog = true">新建课程</el-button>
        </el-menu-item>
        <el-menu-item
          v-for="child in menus"
          :key="child.ID"
          @click="catalog_change(child.ID)"
        >{{child.title}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item>
      <router-link to="admin">管理知识点</router-link>
    </el-menu-item>
    <el-drawer
      title="新建课程"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <!-- {{this.tree}} -->
        <!-- <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>-->
        <el-tree
          :data="tree"
          node-key="ID"
          default-expand-all
          show-checkbox
          :expand-on-click-node="false"
          ref="tree"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label}}</span>
            <span></span>
          </span>
        </el-tree>
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      </div>
    </el-drawer>
  </el-menu>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      filterText: "",
      menus: [],
      dialog: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {
    ...mapState([
      "tree",
      "menu",
      "total",
      "list",
      "catalogs",
      "catalog_id",
      "catalogs_index",
      "catalogSelected"
    ])
  },
  methods: {
    getCheckedNodes() {
      let res = this.$refs.tree.getCheckedNodes();
      let konwleges = ",";
      res.forEach(element => {
        konwleges += element.ID + ",";
      });
      res.forEach(element => {
        let str = "," + element.parentID + ",";
        let reg = new RegExp(str, "g");
        konwleges = konwleges.replace(reg, ",");
      });
      console.log(konwleges);
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    async catalog_change(ID) {
      this.setCatalogSelected({ index: 0, catalogSelected: ID });
      // console.log(this.catalogSelected);
      this.setCatalogs({ parentID: ID, index: 0 });
    },
    ...mapActions([
      "getTree",
      "setCatalogSelected",
      "getProblems",
      "setTag",
      "setCatalogs",
      "setPage",
      "setCatalog_id",
      "setIndex",
      "getMenus"
    ])
  },

  //生命周期 - 创建完成（访问当前this实例）
  async created() {
    await this.getMenus();
    this.menus = this.menu[0];
    this.getTree();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>