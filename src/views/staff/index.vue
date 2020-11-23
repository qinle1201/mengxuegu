<template>
  <div>
    <!-- 顶部面包屑 -->
    <Crumbs />
    <!-- 头部输入框 -->
    <div class="staff_search">
      <el-input v-model="username" placeholder="账号"></el-input>
      <el-input v-model="name" placeholder="姓名" style="margin:0 10px"></el-input>
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-button type="primary" @click="onAdd">新增</el-button>
      <el-button @click="onReset">重置</el-button>
    </div>
    <!-- 新增弹出框 -->
    <div class="staff_add">
      <el-dialog title="员工新增" :visible.sync="dialogFormVisible2">
        <el-form :model="addform">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="addform.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="addform.age"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="addform.mobile"></el-input>
          </el-form-item>
          <el-form-item label="薪酬" :label-width="formLabelWidth">
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
      <el-table
        :data="showList"
        height="400px"
        border>
        <el-table-column
          prop="id"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="salary"
          label="薪酬">
        </el-table-column>
        <el-table-column
          prop="entryDate"
          label="入职时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button 
            size="mini"
            @click="onSelect(scope.row)"
            >编辑</el-button>
            <el-button 
            size="mini" 
            type="danger"
            @click.native.prevent="deleteRow(scope.$index, showList)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!-- 编辑弹出框 -->
    <div class="staff_select">
      <el-dialog title="员工编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
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
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Crumbs from '../../components/crumbs'
import axios from 'axios'
export default {
  components: {
    Crumbs
  },
  data() {
    return {
      showList: [],
      list: [],  // 列表数据
      pageNow: 1,  // 当前页数
      pageSize: 10,  // 每页条数
      total: 0,  // 总页面数
      username: '',  // 昵称
      name: '',  // 姓名
      dialogFormVisible: false,  // 编辑弹出框
      dialogFormVisible2: false,  // 新增弹出框
      formLabelWidth: '150px',
      form: {  // 记录点击编辑的列表
        id: 0,
        username: '',
        name: '',
        age: '',
        mobile: '',
        salary: '',
        entryDate: ''
      },
      addform: { // 新增员工模板
        username: '',
        name: '',
        age: '',
        mobile: '',
        salary: '',
        entryDate: ''
      }
    };
  },
  mounted() {
    // 初始化数据
    axios.post(`http://mengxuegu.com:9999/pro-api/staff/list/search/${this.pageNow}/${this.pageSize}`).then(res=> {
      // console.log(res);
      this.list = res.data.data.rows;
      this.showList = this.list;
      this.total = res.data.data.total;
    })
  },
  created() {},
  computed: {},
  methods: {
    // 点击删除单个数据
    deleteRow(index, rows) {
      this.$confirm('确定删除这条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        rows.splice(index, 1);
      })
    },
    // 页数改变切换对应列表
    handleCurrentChange(val) {
      this.pageNow = val;
      axios.post(`http://mengxuegu.com:9999/pro-api/staff/list/search/${this.pageNow}/${this.pageSize}`).then(res=> {
        this.showList = res.data.data.rows
      })
    },
    // 点击查询
    onSearch() {
      this.showList = []
      this.list.forEach(item=> { // 如果符合条件添加进showlist，否则展示全部
        if(item.username == this.username && item.name == this.name) {
          this.showList.push(item)
        }else if(this.username == '' || this.name == '') {
          this.showList = this.list;
        }
      })
    },
    // 点击新增
    onAdd() {
      this.dialogFormVisible2 = true;
    },
    // 点击新增确定
    sureAdd() {
      this.dialogFormVisible2 = false;
      this.showList.unshift({
        id: 0,
        username: this.addform.username,
        name: this.addform.name,
        age: this.addform.age,
        mobile: this.addform.mobile,
        salary: this.addform.salary,
        entryDate: this.addform.entryDate
      })
    },
    // 点击重置
    onReset() {
      this.username = ''
      this.name = ''
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
        entryDate: row.entryDate
      }
    },
    // 点击编辑确定
    sureSelect() {
      this.dialogFormVisible = false;
      this.list.forEach((item, index)=> {
        if(item.id == this.form.id) {
          item.username = this.form.username
          item.name = this.form.name
          item.mobile = this.form.mobile
          item.age = this.form.age
          item.salary = this.form.salary
          item.entryDate = this.form.username
        }
      })
    }
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
