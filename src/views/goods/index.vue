<template>
  <div>
    <!-- 引入面包屑导航 -->
    <div class="crumb_container">
      <my-crumbs></my-crumbs>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.username" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" @focus="isTable" placeholder="选择供应商"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addStu">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- out_table -->
    <el-table :data="dataList" style="width: 100%">
      <el-table-column
      prop="name"
      lable="商品名称">
      </el-table-column>
      <el-table-column
      prop="code"
      lable="商品编码">
      </el-table-column>
      <el-table-column
      prop="spec"
      lable="商品规格">
      </el-table-column>
      <el-table-column
      prop="purchasePrice"
      lable="零售价">
      </el-table-column>
      <el-table-column
      prop="retailPrice"
      lable="进货价">
      </el-table-column>
      <el-table-column
      prop="id"
      lable="库存数量">
      </el-table-column>
      <el-table-column
      prop="supplierName"
      lable="供应商">
      </el-table-column>
       <el-table-column width="210" label="操作">
         <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
       </el-table-column>
    </el-table>
    <!-- pagination -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[1, 3, 5, 7]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="cobyList.length">
    </el-pagination>
    <!-- new_stu -->
    <el-dialog title="新增成员" width="40%" :visible.sync="dialogTableVisibleStu">
      <el-form :model="form">
        <el-form-item label="*商品名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="*商品编码">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-input v-model="form.spec" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零售价">
          <el-input v-model="form.purchasePrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货价">
          <el-input v-model="form.retailPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择供应商">
          <el-input v-model="form.supplierName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisibles = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>
    <!-- exit_table -->
    <el-dialog title="编辑商品" width="40%" :visible.sync="dialogTableVisibles">
      <el-form :model="forms">
        <el-form-item label="*商品名称">
          <el-input v-model="forms.cname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="*商品编码">
          <el-input v-model="forms.uid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-input v-model="forms.specs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零售价">
          <el-input v-model="forms.purchasePrices" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货价">
          <el-input v-model="forms.retailPrices" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="forms.uid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择供应商">
          <el-input v-model="forms.supplierNames" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisibles = false">取 消</el-button>
        <el-button type="primary" @click="exit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- alert_table -->
    <el-dialog title="收货地址" width="40%" :visible.sync="dialogTableVisible">
      <!-- search -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <!-- alert_inner_table -->
        <el-table
          :data="checkSupplier"
          border
          height="250"
          style="width: 100%">
          <el-table-column
          prop="id"
          lable="序号">
          </el-table-column>
          <el-table-column
          prop="name"
          lable="供应商名称">
          </el-table-column>
          <el-table-column
          prop="linkman"
          lable="联系人">
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import MyCrumbs from '../../components/crumbs'
import axios from "axios";
export default {
  components:{
    MyCrumbs
  },
  data() {
    return {
      formInline: {
        username: "",
      },
      dialogTableVisible:false,
      cobyList:JSON.parse(localStorage.getItem("cobyList"))||[],
      pageSize:5,
      pageNum:1,
      forms:{
        cname:"",
        uid:"",
        specs:"",
        purchasePrices:"",
        retailPrices:"",
        supplierNames:""
      },
      dialogTableVisibles:false,
      checkSupplier:[],
      searchAll:"",
      datas:[],
      dialogTableVisibleStu:false,
      form:{
        name:"",
        id:"",
        spec:"",
        purchasePrice:0,
        retailPrice:0,
        id:"",
        supplierName:""
      }
    }
  },
  mounted(){
    axios.post(`http://mengxuegu.com:9999/pro-api/goods/list/search/${this.pageNum}/${this.pageSize}`)
    .then(res=>{
      this.cobyList = res.data.data.rows;
      this.datas = res.data.data.rows;
    });
    axios.post("http://mengxuegu.com:9999/pro-api/supplier/list/search/1/10")
    .then(res=>{
      this.checkSupplier = res.data.data.rows;
    })
    this.dataList();
  },
  computed:{
    dataList(){
      return this.cobyList.slice(
        this.pageSize * (this.pageNum-1),
        this.pageSize * this.pageNum
      )
    }
  },
  methods: {
    onSubmit() {
      if(this.formInline.username.length === 0){
        this.$message("内容不可为空");
        return false;
      }else {
        this.cobyList = [];
        this.datas.forEach((el,index)=>{
           if(this.formInline.username.includes(el.name)){
             return this.dataList.push(el);
           }
        })
      }
    },
    isTable(){
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    searchInner(){
      console.log("searchInner");
    },
    addStu(){
      this.dialogTableVisibleStu = !this.dialogTableVisibleStu;
    },
    determine(){
      this.dialogTableVisibleStu = !this.dialogTableVisibleStu;
      this.cobyList.push(this.form);
      localStorage.setItem("cobyList",JSON.stringify(this.cobyList))
    },
    handleSizeChange(page){
      this.pageSize = page;
    },
    handleCurrentChange(page){
      this.pageNum = page;
    },
    handleEdit(i,j){
      this.dialogTableVisibles = !this.dialogTableVisible;
      this.forms.cname = j.name;
      this.forms.uid = j.id;
      this.forms.purchasePrices = j.purchasePrice;
      this.forms.retailPrices = j.retailPrice;
      this.forms.supplierNames = j.supplierName;
    },
    handleDelete(i,j){
      this.cobyList.forEach((el,index)=>{
        if(el.id === j.id){
          this.cobyList.splice(index,1)
        }
      })
    },
    exit(){
      this.dialogTableVisibles = !this.dialogTableVisibles;
      this.cobyList.forEach(el=>{
        if(el.id == this.forms.uid){
          console.log(el)
          el.name = this.forms.cname;
          el.id = this.forms.uid;
          el.purchasePrice = this.forms.purchasePrices;
          el.retailPrice = this.forms.retailPrices;
          el.supplierName = this.forms.supplierNames;
        }
      })
    },
    reset(){
      if(this.formInline.username.length === 0){
        this.$message.error("并未输入内容")
      }else{
        this.formInline.username = "";
        this.$message("重置成功");
      }
    }
  }
}
</script>

<style scoped>
.crumb_container
{
  margin-bottom: 40px;
}

</style>