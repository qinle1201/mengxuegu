<template>
  <div>
    <!-- 引入面包屑导航 -->
    <my-crumbs></my-crumbs>
  </div>
</template>
<script>
import MyCrumbs from '../../components/crumbs'
export default {
  data() {
    return {};
  },
  components:{
    'my-crumbs':MyCrumbs
  },
  created() {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>

</style>
