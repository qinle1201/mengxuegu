<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="../../assets/logo.png" alt />
          <h1>梦学谷管理系统</h1>
        </div>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#2d3a4b"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="2">
            <template slot="title">admin</template>
            <el-menu-item index="2-1">修改密码</el-menu-item>
            <el-menu-item @click.native="out()">退出登陆</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/welcome">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/vip">
              <i class="el-icon-s-custom"></i>
              <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="/supplier">
              <i class="el-icon-s-cooperation"></i>
              <span slot="title">供应商管理</span>
            </el-menu-item>
            <el-menu-item index="/goods">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/staff">
              <i class="el-icon-eleme"></i>
              <span slot="title">员工管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { outLogin } from '../../api/login';
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    out() {
      this.$confirm("您确定要退出该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          outLogin().then(res => {
            this.$message.success("退出成功");
            this.$router.push("/login");
          });
        })
        .catch(() => {
          this.$message("您已取消用户退出");
        });
    },
    handleOpen(){},
    handleClose(){}
  }
};
</script>
<style lang="scss" scoped>
.home,
.el-container {
  height: 100%;
}
.el-header {
  background-color: #2d3a4b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    display: flex;
    align-items: center;
    justify-content: space-around;
    img {
      width: 40px;
      height: 40px;
      margin-right: 15px;
    }
    h1 {
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
</style>
