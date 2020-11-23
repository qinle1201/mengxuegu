<template>
  <div class="box">
    <div class="login">
      <h2>梦学谷会员管理系统</h2>
      <el-form :label-position="labelPosition" label-width="50px">
        <el-form-item label="账号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
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
      labelPosition: []
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},

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
  .btn{
    margin-right: 300px;
  }
}
</style>

