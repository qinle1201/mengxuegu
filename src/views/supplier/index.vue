<template>
  <div>
    <!-- 供应商管理 靳恩惠添加 -->

    <!-- 搜索 新增 重置模块 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button @click="onSubmit">重置</el-button>
      </el-form-item>

      <!-- 表格渲染 -->
      <el-table :data="tableData" height="350" border style="width: 100%">
        <el-table-column type="index" label="序号" width="65"></el-table-column>
        <el-table-column prop="name" label="供应商名称" width="180"></el-table-column>
        <el-table-column prop="linkman" label="联系人" width="100"></el-table-column>
        <el-table-column prop="mobile" label="练习电话"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作"></el-table-column>
          <el-row>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </el-row>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
import { getSupplier } from "../../api/supplier";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      page:1,
      pageSize:10,
    };
  },
  created() {
    this.getSupplierList();
  },
  computed: {},
  methods: {
    onSubmit() {
      console.log("submit!");
    }, // 获取供应商表格数据
    async getSupplierList() {
      const res = await getSupplier(this.page, this.pageSize);
      console.log(res);
      this.tableData = res.data.data.rows
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

