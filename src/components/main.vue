<!--  -->
<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="选择题" name="first">选择题</el-tab-pane>
        <el-tab-pane label="多选题" name="second">多选题</el-tab-pane>
        <el-tab-pane label="编程题" name="third">编程题</el-tab-pane>
        <el-tab-pane label="函数题" name="fourth">函数题</el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="标号"></el-table-column>
        <el-table-column prop="name" label="标题"></el-table-column>
        <el-table-column prop="score" label="分数"></el-table-column>
        <el-table-column prop="pass" label="通过数"></el-table-column>
        <el-table-column prop="submit" label="提交数"></el-table-column>
        <el-table-column prop="passing_rate" label="通过率"></el-table-column>
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
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
.el-header {
  background: none;
}
</style>