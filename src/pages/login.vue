<template>
  <div id="login">
    <div class="loginToHome">
      <h3>登陆</h3>
      <el-form
        ref="form"
        :model="form"
        :rules="ruleForm"
        status-icon
        label-width="80px"
        class="loginForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="form.name" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="homeBut" type="primary" plain @click="submit" :loading="logining">登录</el-button>
          <el-button class="loginBut" type="primary" plain @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logining: false,
      form: {
        name: "admin",
        password: "123456"
      },
      ruleForm: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit(event) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.logining = true;
          if (this.form.name === "admin" && this.form.password === "123456") {
            this.logining = false;
            sessionStorage.setItem("user", this.form.name);
            this.$router.push({ name: "index" });
          } else {
            this.logining = false;
            this.$alert("name or password wrong!", "info", {
              confirmButtonText: "ok"
            });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    resetForm() {
      this.form.name = "";
      this.form.password = "";
    }
  }
};
</script>
<style>
.loginToHome {
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  margin: auto;
  width: 400px;
  height: 300px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 2px 2px 5px #888888;
}
.loginToHome h3 {
  margin: 30px auto 20px auto;
}
.loginForm {
  margin: 0 30px 0 10px;
  width: 360px;
  text-align: center;
  padding-top: 15px;
  top: 10px;
}
.homeBut {
  position: absolute;
  left: 0px;
}
.loginBut {
  position: absolute;
  right: 0px;
}
</style>