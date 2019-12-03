<!--  -->
<template>
  <el-container>
    <el-header style="text-align: left; font-size: 12px">
      <select
        v-for="catalog,index in catalogs"
        :key="catalog.ID"
        ref="catalog"
        @change="catalog_change(index)"
      >
        <option v-for="item in catalog" :value="item.ID">{{item.title}}</option>
      </select>

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="选择题" name="first">选择题</el-tab-pane>
        <el-tab-pane label="多选题" name="second">多选题</el-tab-pane>
        <el-tab-pane label="编程题" name="third">编程题</el-tab-pane>
        <el-tab-pane label="函数题" name="fourth">函数题</el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <el-table :data="problems">
        <el-table-column prop="ID" label="标号"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="score" label="分数"></el-table-column>
        <el-table-column prop="pass_count" label="通过数"></el-table-column>
        <el-table-column prop="submit_count" label="提交数"></el-table-column>
        <el-table-column prop="pass_rate" label="通过率"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '选择题', value: '选择题' }, { text: '填空题', value: '填空题' },{ text: '函数题', value: '函数题' }, { text: '判断题', value: '判断题' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '判断题' ? 'primary' : (scope.row.tag === '填空题' ? 'success' : 'danger')"
              disable-transitions
            >{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
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
      tableData: Array(10).fill(item),
      activeName: "first",
      catalogs: [],
      problems: [],
      value: "1"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filtercolor(scope, row) {
      let color = "primary";
      if ((scope.row.tag = "选择题")) {
        color = "success";
      }

      return color;
    },
    async catalog_change(index) {
      let parentID = this.$refs["catalog"][index].value;
      this.catalogs = this.catalogs.splice(0, index + 1);

      let res = await fetch("http://localhost:8088/api/catalog/" + parentID);
      let result = await res.json();

      if (result.length > 0) {
        this.catalogs.push(result);
      }
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
    console.log(this.problems);
    console.log(this.tableData);
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
}

select:focus {
  outline: none;
}
</style>