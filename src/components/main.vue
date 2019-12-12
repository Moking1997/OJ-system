<!--  -->
<template>
  <el-row>
    <el-col :span="priview.pro">
      <el-container>
        <el-header style="text-align: left; font-size: 12px">
          <select
            v-for="catalog,index in catalogs"
            :key="catalog.ID"
            ref="catalog"
            @change="catalog_change(index)"
          >
            <option value="-1">请选择</option>
            <option v-for="item in catalog" :value="item.ID">{{item.title}}</option>
          </select>

          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="选择题" name="first" @click>选择题</el-tab-pane>
            <el-tab-pane label="多选题" name="second">多选题</el-tab-pane>
            <el-tab-pane label="编程题" name="third">编程题</el-tab-pane>
            <el-tab-pane label="函数题" name="fourth">函数题</el-tab-pane>
          </el-tabs>
        </el-header>
        <el-main>
          <el-table :data="problems">
            <el-table-column prop="id" label="标号"></el-table-column>
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
            <el-table-column prop="pass_count" label="通过数"></el-table-column>
            <el-table-column prop="source" label="作者"></el-table-column>
            <el-table-column prop="in_date" label="通过率"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-col>
    <el-col :span="priview.pri">
      <Priview :priview="priview" :pri_problem="pri_problem" @childFn="closePriview" />
    </el-col>
  </el-row>
</template>

<script>
import Priview from "@/components/preview";
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
      priview: {
        display: false,
        pro: 24,
        pri: 0
      },
      catalog_id: 0,
      pri_problem: [],
      tableData: Array(10).fill(item),
      activeName: "first",
      catalogs: [],
      problems: [],
      value: "1"
    };
  },
  methods: {
    async handleClick(tab, event) {
      let tag = "选择题";
      if (tab.name === "first") {
        tag = "选择题";
      } else if (tab.name === "second") {
        tag = "判断题";
      } else if (tab.name === "third") {
        tag = "填空题";
      } else if (tab.name === "fourth") {
        tag = "函数题";
      }
      let pro = await fetch(
        "http://localhost:8088/api/tags/" + this.catalog_id + "," + tag
      );
      let problems = await pro.json();
      this.problems = [problems][0];
      console.log(problems);
    },
    async catalog_change(index) {
      let parentID = this.$refs["catalog"][index].value;

      if (parentID == -1) {
        return;
      }
      this.catalog_id = parentID;
      this.catalogs = this.catalogs.splice(0, index + 1);

      let res = await fetch("http://localhost:8088/api/catalog/" + parentID);
      let result = await res.json();

      let pro = await fetch(
        "http://localhost:8088/api/problem/catalog/" + parentID
      );
      let problems = await pro.json();

      if (result.length > 0) {
        this.catalogs.push(result);
      }
      this.problems = [problems][0];
    },
    problemPriview(id) {
      this.priview.pro = 15;
      this.priview.pri = 9;
      this.pri_problem = id;
    },
    closePriview(span) {
      this.priview.pri = span;
      this.priview.pro = 24 - span;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  async created() {
    let res = await fetch("http://localhost:8088/api/catalog/0");
    let catalogs = await res.json();

    let pro = await fetch("http://localhost:8088/api/problem");
    let problems = await pro.json();

    this.catalogs = [catalogs];
    this.problems = [problems][0];
    // console.log(this.problems);
    // console.log(this.tableData);
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
  /* -webkit-appearance: none;
  -moz-appearance: none; */

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