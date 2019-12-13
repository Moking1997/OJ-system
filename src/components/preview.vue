<!--  -->
<template>
  <div class="problem-priview">
    <div style="width:100%;cursor: pointer;text-align:right;">
      <i class="el-icon-close" @click="closePriview()"></i>
    </div>
    <h1>{{pri_problem.title}}</h1>
    <el-table :data="problems">
      <el-table-column prop="id" label="标号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="source" label="作者"></el-table-column>
    </el-table>
    <div class="problem-inner">
      <div class="problem-describe">
        <div class="content-title">本题要求实现一个计算m~n（m<n）之间所有整数的和的简单函数。</div>
      </div>
      <div class="problem-input">
        <div class="content-title">输入格式:</div>
        <div class="content-text">其中m和n是用户传入的参数，保证有m<n。函数返回的是m~n之间所有整数的和。</div>
      </div>
      <div class="problem-output">
        <div class="content-title">输出格式:</div>
        <div class="content-text">其中m和n是用户传入的参数，保证有m<n。函数返回的是m~n之间所有整数的和。</div>
      </div>
      <div class="problem-incase">
        <div class="content-title">输入样例:</div>
        <div class="content-case">
          6
          <br />8 0 1 9 2
        </div>
      </div>
      <div class="problem-outcase">
        <div class="content-title">输入样例:</div>
        <div class="content-case">10 2</div>
      </div>
    </div>
    <div style="margin:10px auto;text-align:center;width:100%">
      <el-button type="primary" @click="toProblem()">查看详情</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      problems: [{ id: 1, title: "test", source: "admin" }]
    };
  },
  props: ["priview", "pri_problem"],
  methods: {
    closePriview() {
      this.priview.display = false;
      console.log(this.priview);
      this.$emit("childFn", 0);
    },
    toProblem() {
      this.$router.push({
        name: "problem",
        params: {
          id: this.pri_problem
        }
      });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.problem-priview {
  border-left: 1px solid #ddd;
  padding: 20px;
}
.content-title {
  font-size: 18px;
  margin-top: 10px;
}
.content-text {
  font-size: 12px;
  color: #444;
}
.content-case {
  padding: 8px;
  font-size: 12px;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #666;
}
</style>