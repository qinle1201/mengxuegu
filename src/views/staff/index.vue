<template>
  <div>
    <!-- 顶部面包屑 -->
    <Crumbs />
    <!-- 头部输入框 -->
    <div class="staff_search">
      <el-input v-model="username" placeholder="账号"></el-input>
      <el-input
        v-model="name"
        placeholder="姓名"
        style="margin: 0 10px"
      ></el-input>
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-button type="primary" @click="onAdd">新增</el-button>
      <el-button @click="onReset">重置</el-button>
    </div>
    <!-- 新增弹出框 -->
    <div class="staff_add">
      <el-dialog title="员工新增" :visible.sync="dialogFormVisible2">
        <el-form
          :model="addform"
          :rules="staffFormRules"
          ref="staffFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="addform.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="addform.age"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addform.mobile"></el-input>
          </el-form-item>
          <el-form-item label="薪酬" prop="salary">
            <el-input v-model="addform.salary"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" :label-width="formLabelWidth">
            <el-input v-model="addform.entryDate" type="date"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 数据列表 -->
    <div class="staff_table">
      <el-table :data="showList" height="400px" border>
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="username" label="账号"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="salary" label="薪酬"> </el-table-column>
        <el-table-column prop="entryDate" label="入职时间"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="onSelect(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deleteRow(scope.$index, showList)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑弹出框 -->
    <div class="staff_select">
      <el-dialog title="员工编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item
            label="账号"
            prop="username"
            :label-width="formLabelWidth"
            :rules="[{ required: true, message: '账号不能为空' }]"
          >
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item
          prop="name"
            label="姓名"
            :label-width="formLabelWidth"
            :rules="[{ required: true, message: '姓名不能为空' }]"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="薪酬" :label-width="formLabelWidth">
            <el-input v-model="form.salary"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" :label-width="formLabelWidth">
            <el-input v-model="form.entryDate" type="date"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureSelect">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 分页器 -->
    <div class="staff_pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
// 面包屑
import Crumbs from "../../components/crumbs";
// axios
import axios from "axios";
export default {
  components: {
    Crumbs,
  },
  data() {
    return {
      showList: [], // 显示列表数据
      list: [], // 列表数据
      pageNow: 1, // 当前页数
      pageSize: 10, // 每页条数
      total: 0, // 总页面数
      username: "", // 昵称
      name: "", // 姓名
      dialogFormVisible: false, // 编辑弹出框
      dialogFormVisible2: false, // 新增弹出框
      formLabelWidth: "150px",
      form: {
        // 记录点击编辑的列表
        id: 0,
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      // 添加员工表单
      addform: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: ""
      },
      // 添加员工表单验证
      staffFormRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // 初始化数据
    axios
      .post(
        `http://mengxuegu.com:9999/pro-api/staff/list/search/${this.pageNow}/${this.pageSize}`
      )
      .then((res) => {
        // console.log(res);
        // 初始显示列表、分页器数据
        this.list = res.data.data.rows;
        this.showList = this.list;
        this.total = res.data.data.total;
      });
  },
  created() {},
  computed: {},
  methods: {
    // 点击删除单个数据
    deleteRow(index, rows) {
      this.$confirm("确定删除这条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => { // 点击确定
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        rows.splice(index, 1);
      });
    },
    // 页数改变切换对应列表
    handleCurrentChange(val) {
      this.pageNow = val;
      axios
        .post(
          `http://mengxuegu.com:9999/pro-api/staff/list/search/${this.pageNow}/${this.pageSize}`
        )
        .then((res) => {
          this.showList = res.data.data.rows;
        });
    },
    // 点击查询
    onSearch() {
      //  每次添加先进行一次清空
      this.showList = [];
      this.list.forEach((item) => {
        // 如果符合条件添加进showlist，否则展示全部
        if (item.username == this.username && item.name == this.name) {
          this.showList.push(item);
        } else if (this.username == "" || this.name == "") {
          this.showList = this.list;
        }
      });
    },
    // 点击新增
    onAdd() {
      this.dialogFormVisible2 = true;
    },
    // 点击新增确定
    sureAdd() {
      //  初始化状态 账号姓名为空为false 不添加 否则为true 添加进显示数据
      let rel = true;
      if(this.addform.username == '' || this.addform.name == '') {
        rel = false;
        return
      }
      if(rel) {
        this.dialogFormVisible2 = false;
        this.showList.unshift({
          id: 0,
          username: this.addform.username,
          name: this.addform.name,
          age: this.addform.age,
          mobile: this.addform.mobile,
          salary: this.addform.salary,
          entryDate: this.addform.entryDate,
        });
        this.$message({
          message: '新增成功！初始密码为:123456',
          type: 'warning'
        });
      }
    },
    // 点击重置
    onReset() {
      this.username = "";
      this.name = "";
    },
    // 点击编辑
    onSelect(row) {
      this.dialogFormVisible = true;
      this.form = {
        id: row.id,
        username: row.username,
        name: row.name,
        age: row.age,
        mobile: row.mobile,
        salary: row.salary,
        entryDate: row.entryDate,
      };
    },
    // 点击编辑确定
    sureSelect() {
      this.dialogFormVisible = false;
      //  找到相应数据列表修改
      this.list.forEach((item, index) => {
        if (item.id == this.form.id) {
          item.username = this.form.username;
          item.name = this.form.name;
          item.mobile = this.form.mobile;
          item.age = this.form.age;
          item.salary = this.form.salary;
          item.entryDate = this.form.username;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.staff_search {
  width: 60%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
