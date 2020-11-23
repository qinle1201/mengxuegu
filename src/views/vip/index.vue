<template>
  <div>
    <!-- 引入面包屑导航 -->
    <my-crumbs></my-crumbs>

    <!-- 表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item style="width: 180px">
        <el-input v-model="formInline.num" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item style="width: 180px">
        <el-input v-model="formInline.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item style="width: 110px">
        <el-select v-model="formInline.region" placeholder="支付类型">
          <el-option label="现金" value="xianjin"></el-option>
          <el-option label="微信" value="weixin"></el-option>
          <el-option label="支付宝" value="zhifubao"></el-option>
          <el-option label="银行卡" value="yinhangka"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.value"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left: 20px">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="addVip">新增</el-button>
        <el-button @click="resetVip">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名" width="100">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="会员生日"
        width="120"
      ></el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column
        prop="integral"
        label="可用积分"
        width="100"
      ></el-table-column>
      <el-table-column prop="money" label="开卡金额" width="100">
      </el-table-column>
      <el-table-column prop="zip" label="支付类型" width="130">
      </el-table-column>
      <el-table-column prop="address" label="会员地址"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.id)" size="mini">编辑</el-button>
          <el-button type="danger"  @click="handleDelete(scope.row.id)"  size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10,20,50]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
  </div>
</template>
<script>
import MyCrumbs from "../../components/crumbs";
import { getVipList } from "../../api/vip";
export default {
  data() {
    return {
      formInline: {
        num: "",
        name: "",
        value: "",
        region: "",
      },
      tableData: [],
      currentPage: 1,
      page:{  // 分页对象
        current:1,
        size:5,
        total:0
      },
    };
  },
  components: {
    "my-crumbs": MyCrumbs,
  },
  created() {
    this.getVipListData();
  },
  computed: {},
  methods: {
    // 获取会员管理接口数据
    async getVipListData() {
      const { data: res } = await getVipList(this.formInline,this.page.current,this.page.size);
      if (res.flag == true) {
        console.log(res);
        this.tableData = res.data.rows;
        this.page.total = res.data.total
        // console.log(this.tableData);
      }
    },
    // 分页
    // 每页显示多少条改变后触发
    handleSizeChange(val) {
     this.page.size = val
     this.getVipListData()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.getVipListData()
    },

    addVip() {
      console.log("添加点击");
    },
    resetVip() {
      console.log("重置点击");
    },
    onSubmit() {
      console.log("查询点击");
    },
    // 删除
    handleDelete(index, rows) {
      rows.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.demo-form-inline {
  margin-top: 20px;
}
</style>
