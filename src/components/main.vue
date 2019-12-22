<!--  -->
<template>
  <el-row>
    <el-col :span="priview.pro">
      <el-container>
        <el-header style="text-align: left; font-size: 12px; height:63px;">
          <el-row type="flex" justify="space-between">
            <el-col :span="12">
              <select
                v-for="catalog,index in catalogs"
                :key="catalog.ID"
                ref="catalog"
                v-model="catalogSelected[index]"
                @change="catalog_change(index)"
              >
                <option value="-1">请选择</option>
                <option v-for="item in catalog" :value="item.ID">{{item.title}}</option>
              </select>
            </el-col>
            <el-col :span="12" style="text-align:right;">
              <router-link to="add_problem">
                <el-button type="primary">新建题目</el-button>
              </router-link>

              <el-button type="success">批量添加题库集</el-button>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="选择题" name="first">选择题</el-tab-pane>
            <el-tab-pane label="多选题" name="second">多选题</el-tab-pane>
            <el-tab-pane label="编程题" name="third">编程题</el-tab-pane>
            <el-tab-pane label="函数题" name="fourth">函数题</el-tab-pane>
          </el-tabs>
        </el-header>
        <el-main>
          <el-table :data="list">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="problem_id" label="标号"></el-table-column>
            <el-table-column prop="title" label="标题">
              <template slot-scope="scope">
                <el-button
                  @click="problemPriview(scope.row)"
                  type="text"
                  size="small"
                >{{scope.row.title}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="分数"></el-table-column>
            <!-- <el-table-column prop="source" label="作者"></el-table-column> -->
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-pagination
          @current-change="setPage"
          :current-page="pages.currentPage"
          :page-size="pages.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-container>
    </el-col>
    <el-col :span="priview.pri">
      <Priview :priview="priview" :pri_problem="pri_problem" @childFn="closePriview" />
    </el-col>
  </el-row>
</template>

<script>
import Priview from "@/components/preview";
import { Server } from "@/config";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Priview
  },
  data() {
    const item = {
      date: "1000",
      name: "求m到n之和",
      score: 10,
      pass: 10564,
      submit: 30212,
      passing_rate: 0.27
    };
    return {
      pages: {
        limit: 10,
        total: 0
      },
      priview: {
        display: false,
        pro: 24,
        pri: 0
      },
      // catalog_id: 0,
      currentPage: 1,
      tag: 1,
      pri_problem: [],
      activeName: "first",
      // catalogs: [],
      problems: []
    };
  },
  methods: {
    async handleClick(tab, event) {
      let tag = "1";
      if (tab.name === "first") {
        tag = "1";
      } else if (tab.name === "second") {
        tag = "2";
      } else if (tab.name === "third") {
        tag = "3";
      } else if (tab.name === "fourth") {
        tag = "4";
      }
      this.tag = tag;
      this.setTag(tag);
      this.getProblems();
    },
    async catalog_change(index) {
      let parentID = this.$refs["catalog"][index].value;
      let pID = 0;
      if (index > 0) {
        pID = this.$refs["catalog"][index - 1].value;
        this.setIndex(this.catalogs_index - 1);
      }
      if (parentID == -1) {
        this.setCatalogs({ parentID: pID, index: this.catalogs_index });
        this.getProblems();
        return;
      }

      this.setCatalogSelected({ index: index, catalogSelected: parentID });
      this.setCatalogs({ parentID: parentID, index: index });
      this.getProblems();
    },
    problemPriview(id) {
      this.priview.pro = 15;
      this.priview.pri = 9;
      this.pri_problem = id;
    },
    closePriview(span) {
      this.priview.pri = span;
      this.priview.pro = 24 - span;
    },
    async handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getProblemList();
    },
    ...mapActions([
      "setCatalogSelected",
      "getProblems",
      "setTag",
      "setCatalogs",
      "setPage",
      "setCatalog_id",
      "setIndex"
    ])
  },
  watch: {},
  computed: {
    ...mapState([
      "total",
      "list",
      "catalogs",
      "catalog_id",
      "catalogs_index",
      "catalogSelected"
    ]),
    ...mapState({
      stateproblems: state => state.problems.list
    }),
    test: {
      get() {
        return this.$store.state.catalogSelected;
      },
      set(val) {
        console.log(val);
        // this.$store.commit("catalogSelected", val);
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  async created() {
    await this.setCatalogs({ parentID: 0, index: 0 });
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
.el-header {
  background: none;
}

select:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

select:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #ccc;
  top: 14px;
  right: 10px;
  cursor: pointer;
  z-index: -2;
}
select {
  cursor: pointer;
  padding: 10px;
  width: 100px;
  border: none;
  background: transparent;
  background-image: none;
  display: inline-block;
  width: 100px;
  position: relative;
  vertical-align: middle;
  padding: 0;
  overflow: hidden;
  background-color: #fff;
  color: #555;
  border: 1px solid #111;
  text-shadow: none;
  margin-right: 10px;
  margin-bottom: 20px;
  border-radius: 1px;
  padding: 10px;
  transition: box-shadow 0.25s ease;
  z-index: 2;
  font-size: 14px;
}

select:focus {
  outline: none;
}
</style>