<!--  -->
<template>
  <div>
    题目详情
    <!-- {{data}} -->
    <div class="problem-priview">
      <h1>{{data.title}}</h1>

      <el-table>
        <el-table-column prop="id" label="标号">
          <template slot-scope="scope">{{data.problem_id}}</template>
        </el-table-column>
        <el-table-column prop="source" label="作者">
          <template slot-scope="scope">{{data.source}}</template>
        </el-table-column>
        <el-table-column prop="date" label="日期">
          <template slot-scope="scope">{{data.in_date | timestampToTime}}</template>
        </el-table-column>
      </el-table>
      <div class="problem-inner">
        <div class="problem-describe">
          <div v-html="data.description" class="content-title">{{data.description}}</div>
        </div>
        <div class="problem-input">
          <div class="content-title">输入格式:</div>
          <div v-html="data.input" class="content-text">{{data.input}}</div>
        </div>
        <div class="problem-output">
          <div class="content-title">输出格式:</div>
          <div v-html="data.output" class="content-text">{{data.output}}</div>
        </div>
        <div class="problem-incase">
          <div class="content-title">输入样例:</div>
          <div class="content-case">{{data.sample_input}}</div>
        </div>
        <div class="problem-outcase">
          <div class="content-title">输入样例:</div>
          <div class="content-case">{{data.sample_output}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: []
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
  //生命周期 - 创建完成（访问当前this实例）
  async created() {
    let res = await axios.get(
      "http://localhost:8088/api/problem/" + this.$route.query.id
    );
    this.data = res.data[0];
    console.log(this.data);
  },
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