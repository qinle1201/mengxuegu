<template>
  <div> 
    <!-- 面包屑 -->
    <crumbs></crumbs>
    <!-- 供应商管理 靳恩惠添加 -->

    <!-- 搜索 新增 重置模块 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="联系人电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格渲染 -->
    <el-table :data="tableData" height="350" border style="width: 100%">
      <el-table-column type="index" label="序号" width="65"></el-table-column>
      <el-table-column prop="name" label="供应商名称" width="180"></el-table-column>
      <el-table-column prop="linkman" label="联系人" width="100"></el-table-column>
      <el-table-column prop="mobile" label="练习电话"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelSupplier(scope.row.id)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="paging">
     <el-pagination
      @size-change="changePageSize"
      @current-change="changePage"
      :current-page="page"
      :page-sizes="[1,3,5,10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    </div>
  </div>
</template>
<script>
import crumbs from '../../components/crumbs/index'
import { getSupplier, delSupplier } from "../../api/supplier";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      // 渲染数据
      tableData: [],
      // 页码
      page: 1,
      // 条数
      pageSize: 10,
      // 总条数
      total:1,

     
    };
  },
  components:{crumbs},
  created() {
    this.getSupplierList();
  },
  computed: {},
  methods: {
    // 获取供应商表格数据
    async getSupplierList() {
      const res = await getSupplier(this.page, this.pageSize);
      console.log(res);
      this.tableData = res.data.data.rows;
      this.total = res.data.data.total
    },
    // 点击删除
    handleDelSupplier(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delSupplier(id);
          console.log(res);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getSupplierList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 条数
    changePageSize(value) {
      this.pageSize = value;
        this.getSupplierList();
    },
    // 页数
    changePage(value) {
      this.page = value;
      this.getSupplierList();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form{
  margin: 15px 0 0 0 ; 
}
.paging{
  margin: 10px 0 0 0;
}
</style>

