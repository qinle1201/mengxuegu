<template>
  <div>
    <el-dialog title="title" :visible.sync="visible" width="500px">
      <el-form :model="formDate" :rules="rules" ref="formDate">
        <el-form-item style="width: 300px" label="会员卡号">
          <el-input v-model="formInline.num" placeholder="会员卡号"></el-input>
        </el-form-item>
        <el-form-item style="width: 300px" label="会员姓名">
          <el-input v-model="formInline.name" placeholder="会员姓名"></el-input>
        </el-form-item>
        <el-form-item label="会员生日">
          <el-date-picker
            v-model="formInline.value"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-table-column v-model="formInline.phone" label="手机号码">
        </el-table-column>
        <el-table-column
          v-model="formInline.money"
          label="开卡金额"
        ></el-table-column>
        <el-table-column
          v-model="formInline.integral"
          label="可用积分"
        ></el-table-column>
        <el-table-column
          v-model="formInline.payType"
          label="支付类型"
          width="130"
        >
        </el-table-column>
        <el-table-column v-model="formInline.address" label="会员地址">
        </el-table-column>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('formDate')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { update } from "@/api/vip";
export default {
  name: "",
  props: {
    title: {
      // 弹框的标题
      type: String,
      default: "",
    },
    visible: {
      // 弹出窗口，true为弹出
      type: Boolean,
      default: false,
    },
    formDate: {
      // 提交表单数据
      type:Array,
      default: {},
    },
    remoteClose: Function, //用于关闭窗口
  },
  data() {
    return {
      num: [
        // 卡号
        { required: true, message: "卡号不能为空", trigger: "blur" },
      ],
      name: [
        // 姓名
        { required: true, message: "姓名不能为空", trigger: "change" },
      ],
      payType: [
        // 支付类型
        { required: true, message: "支付类型不能为空", trigger: "change" },
      ],
    };
  },
  created() {},
  mounted() {}, //方法
  methods: {
    // 关闭弹框
    dialogClose() {
      // 表单清空
      this.$refs["formDate"].resetFields();
      this.remoteClose();
    },
    // 提交表单数据
    submitForm(formDate) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitDate();
        } else {
          return false;
        }
      });
    },

    // 调用接口提交数据
    async submitDate() {
      let response = null;
      if (this.formDate.id) {
        // 编辑
        response = await update(this.formDate);
      } else {
        // 新增
        response = await add(this.formDate);
      }
    },
  },
};
</script>

<style scoped>
</style>