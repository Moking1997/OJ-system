<!--  -->
<template>
  <div class="problem-priview">
    <div style="width:100%;cursor: pointer;text-align:right;">
      <i class="el-icon-close" @click="closePriview()"></i>
    </div>
    <h1>{{pri_problem.title}}</h1>

    <el-table :data="problems">
      <el-table-column prop="id" label="标号">
        <template slot-scope="scope">{{pri_problem.problem_id}}</template>
      </el-table-column>
      <el-table-column prop="source" label="作者">
        <template slot-scope="scope">{{pri_problem.source}}</template>
      </el-table-column>
      <el-table-column prop="date" label="日期">
        <template slot-scope="scope">{{pri_problem.in_date | timestampToTime}}</template>
      </el-table-column>
    </el-table>
    <div class="problem-inner">
      <div class="problem-describe">
        <div v-html="pri_problem.description" class="content-title">{{pri_problem.description}}</div>
      </div>
      <div class="problem-input">
        <div class="content-title">输入格式:</div>
        <div v-html="pri_problem.input" class="content-text">{{pri_problem.input}}</div>
      </div>
      <div class="problem-output">
        <div class="content-title">输出格式:</div>
        <div v-html="pri_problem.output" class="content-text">{{pri_problem.output}}</div>
      </div>
      <div class="problem-incase">
        <div class="content-title">输入样例:</div>
        <div class="content-case">{{pri_problem.sample_input}}</div>
      </div>
      <div class="problem-outcase">
        <div class="content-title">输入样例:</div>
        <div class="content-case">{{pri_problem.sample_output}}</div>
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
      problems: [
        {
          id: this.pri_problem.problem_id,
          date: this.pri_problem.in_date,
          source: this.pri_problem.source
        }
      ]
    };
  },
  filters: {
    timestampToTime: function(dates) {
      var date = new Date(dates); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
      console.log(timestampToTime(1533293827000));
    }
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
        },
        query: {
          id: this.pri_problem.problem_id
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