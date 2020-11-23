<template>
  <div class="crumbs">
    <!-- 封装面包屑导航 -->
    <el-card class="box-card">
      <span>{{ $route.meta.title }}</span>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {},
};
</script>

<style scoped lang="scss">
.crumbs {
  span {
    border-left: 3px solid green;
    padding-left: 5px;
  }
}
</style>
