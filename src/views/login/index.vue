<template>
  <div class="box">
    <div class="login">
      <h2>梦学谷会员管理系统</h2>
      <el-form label-width="80px" :model="login" :rules="rules" ref="ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="login.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="login.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="loginAdd('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { tologin } from '../../api/login';
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      login: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //   登录
    loginAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const loginData = await tologin(
            this.login.username,
            this.login.password
          );
          console.log(loginData);
          if (loginData.status == 200) {
            this.$router.push("/home");
            this.$message.success("登录成功");
          }else{
            this.$message.error("您输入的用户名或密码不正确");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },

  beforeCreate() {},

  created() {},

  beforeMount() {},

  mounted() {},

  beforeUpdate() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  destroyed() {}
};
</script> 

<style  lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.box {
  width: 100%;
  height: 100%;
  background: url("http://mengxuegu.com:9999/img/login.b665435f.jpg") no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 400px;
  height: 300px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  .el-form {
    margin-top: 20px;
  }
  .btn {
    margin-right: 300px;
  }
}
</style>

