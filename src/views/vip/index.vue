<template>
  <div>
<<<<<<< HEAD
    <h3>会员管理</h3>
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
        <el-date-picker v-model="value" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left: 20px">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="addVip">新增</el-button>
        <el-button @click="addVip">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" max-height="250" border>
      <el-table-column prop="date" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="会员生日"></el-table-column>
      <el-table-column prop="city" label="手机号码"> </el-table-column>
      <el-table-column prop="address" label="可用积分"></el-table-column>
      <el-table-column prop="zip" label="开卡金额"> </el-table-column>
      <el-table-column prop="zip" label="支付类型"> </el-table-column>
      <el-table-column prop="zip" label="会员地址"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
=======
    会员管理--开发测试
>>>>>>> 6570ce8b5eb9ed1de9cb17f26b077ca9ff644d89
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        num: "",
        name: "",
        value: "",
        region: "",
        tableData: [
          {
            date: "2016-05-03",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-08",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-06",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-07",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
        ],
      },
    };
  },
  created() {},
  computed: {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
