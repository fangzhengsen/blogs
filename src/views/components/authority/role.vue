<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible=true">新增角色</el-button>
    <el-dialog title="新增人员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="人员账号" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            :readonly="true"
            placeholder="请选择人员账号"
            @click.native="handleShow"
          ></el-input>
          <el-card class="box-card" v-if="showSearchList">
            <div slot="header" class="clearfix">
              <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
                <el-button slot="append" @click="doSearch" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div v-for="(item,index) in nameList" :key="index" @click="chooseName(item)">
              <span style="display:inline-block;width:120px;">{{item.account}}</span>
              <span style="width:120px;">{{item.name}}</span>
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="人员角色" :label-width="formLabelWidth">
          <el-input v-model="form.role" :readonly="true" placeholder="请选择人员角色"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        role: ""
      },
      nameList: [],
      nameListData: [
        {
          account: "zhangwuji",
          name: "张无忌",
          value: "0"
        },
        {
          account: "zhangcuishan",
          name: "张翠山",
          value: "1"
        },
        {
          account: "yinyewang",
          name: "殷野王",
          value: "2"
        },
        {
          account: "zhangsanfeng",
          name: "张三丰",
          value: "3"
        }
      ],
      searchValue: "",
      showSearchList: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleShow() {
      console.log("sdf");
      this.showSearchList = !this.showSearchList;
    },
    doSearch() {
      console.log(this.searchValue);
      if (this.searchValue != "") {
        this.nameList = this.nameListData;
      } else {
        this.nameList = [];
        this.$notify({
          title: "警告",
          message: "请输入搜索字段",
          type: "warning",
          duration: 1000
        });
      }
    },
    chooseName(value) {
      this.showSearchList = !this.showSearchList;
      this.form.name = value.account;
      console.log(value.account);
    }
  },
  components: {}
};
</script>

<style  lang='scss' scoped>
.el-form-item ::v-deep .el-input__inner {
  cursor: pointer;
}
.el-card {
  position: absolute;
  z-index: 10;
  width: 100%;
  &::v-deep .el-card__header {
    padding: 10px 10px 0;
    border-bottom: 0;
  }
  &::v-deep .el-card__body {
    padding: 0 15px 10px;
  }
}
</style>
