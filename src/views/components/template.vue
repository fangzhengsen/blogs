<template>
  <el-container>
    <el-header>
      <el-button type="primary" size="small">
        <i class="el-icon-plus"></i>上传文件
      </el-button>
      <el-button size="small">
        <i class="el-icon-s-promotion"></i>生成页面
      </el-button>
      <el-button v-if="showBack" size="small" @click="back">返回</el-button>
    </el-header>
    <el-main>
      <el-table :data="tableData" height="calc(100% - 10px)" border style="width: 100%">
        <el-table-column label="模板名称">
          <template slot-scope="scope">
            <i :class="scope.row.fileType==='file'?'el-icon-document':'el-icon-folder'"></i>
            <span style="margin-left: 10px">{{ scope.row.path.replace(/\\/g,' / ') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="150" align="center">
          <template slot-scope="scope">{{scope.row.fileType=='dir'?'目录':'文件'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.fileType==='file'" type="text">编辑</el-button>
            <el-button v-if="scope.row.fileType==='file'" type="text">删除</el-button>
            <el-button
              v-if="scope.row.fileType==='dir'"
              @click="getTemplateList(scope.row)"
              type="text"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: null,
      showBack: false
    };
  },
  methods: {
    async getTemplateList(item) {
      let oldPath = "";
      this.backPath =
        item && item.oldPath.slice(0, item.oldPath.lastIndexOf("\\"));
      if (item) {
        oldPath = item.oldPath;
        this.showBack = true;
      }
      let res = await this.$http.getTemplateList({ path: oldPath });
      this.tableData = res;
    },
    back() {
      if (this.backPath == "nodeApi\\templates") {
        this.$nextTick(() => {
          this.showBack = false;
        });
      }
      this.getTemplateList({ oldPath: this.backPath });
    }
  },
  mounted() {
    this.getTemplateList();
  },
  components: {}
};
</script>

<style  lang='scss' scoped>
.el-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
}
.el-table {
  font-size: 16px;
}
.el-link {
  font-size: 10px;
}
.el-button {
  i {
    margin-right: 5px;
    font-size: 12px;
  }
}
</style>
