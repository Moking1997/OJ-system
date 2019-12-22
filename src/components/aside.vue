<!--  -->
<template>
  <el-menu :default-openeds="['1','3']">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        题库管理
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="child in menus"
          :key="child.ID"
          @click="catalog_change(child.ID)"
        >{{child.title}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      menus: []
    };
  },
  computed: {
    ...mapState([
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
    async catalog_change(ID) {
      // let parentID = this.$refs["catalog"][index].value;
      // let pID = 0;
      // if (index > 0) {
      //   pID = this.$refs["catalog"][index - 1].value;
      //   this.setIndex(this.catalogs_index - 1);
      // }
      // if (parentID == -1) {
      //   this.setCatalogs({ parentID: pID, index: this.catalogs_index });
      //   this.getProblems();
      //   return;
      // }
      // this.setIndex(1);
      this.setCatalogSelected({ index: 0, catalogSelected: ID });
      console.log(this.catalogSelected);
      this.setCatalogs({ parentID: ID, index: 0 });
    },
    ...mapActions([
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
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>