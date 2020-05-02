<template>
  <el-container>
    <el-header>
      <div class="left-btn-group">
        <el-upload
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadErr"
          :before-upload="showLoading"
          action="http://localhost:8083/uploadFile"
          :data="{path:'sdfsdf'}"
        >
          <el-button size="small" :loading="isLoading" type="primary">
            <i :class="{'el-icon-plus':!isLoading}"></i>上传文件
          </el-button>
        </el-upload>
        <el-button size="small" class="birth-page-btn">
          <i class="el-icon-s-promotion"></i>生成页面
        </el-button>
      </div>
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
            <el-button
              v-if="scope.row.fileType==='file'"
              type="text"
              @click="editTempate(scope.row.path)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.fileType==='file'"
              @click="delTemplate(scope.row)"
              type="text"
            >删除</el-button>
            <el-button
              v-if="scope.row.fileType==='dir'"
              @click="getTemplateList(scope.row)"
              type="text"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-dialog title="代码编辑" :visible.sync="dialogVisible" width="60%">
      <textarea v-model="preCode" ref="editor"></textarea>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleEdit">取 消</el-button>
        <el-button type="primary" @click="submitEdit">保 存</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import codemirror from "codemirror";

export default {
  data() {
    return {
      tableData: null,
      showBack: false,
      dialogVisible: false,
      preCode: null,
      isLoading: false
    };
  },
  methods: {
    showLoading() {
      console.log("onprogerss");
      this.isLoading = true;
    },
    uploadErr(err, file, fileList) {
      this.isLoading = false;
      this.$notify({
        title: "警告",
        message: "文件上传失败",
        type: "warning",
        duration: 1000
      });
    },
    uploadSuccess(response, file, fileList) {
      this.isLoading = false;
      this.$notify({
        title: "成功",
        message: "文件上传成功",
        type: "success",
        duration: 1000
      });
    },
    async getTemplateList(item) {
      let oldPath = "";
      this.backPath =
        item && item.oldPath.slice(0, item.oldPath.lastIndexOf("\\"));
      if (item) {
        oldPath = item.oldPath;
        this.showBack = true;
      }
      this.tableData = await this.$http.getTemplateList({ path: oldPath });
    },
    async delTemplate(item) {
      let res = await this.$http.delTemplate({ oldPath: item.oldPath });
      if (res.data) {
        this.$notify({
          title: "成功",
          message: res.msg,
          type: "success",
          duration: 1000
        });
      }
      this.tableData = await this.$http.getTemplateList({
        path: item.oldPath.slice(0, item.oldPath.lastIndexOf("\\"))
      });
    },
    cancleEdit() {
      this.dialogVisible = false;
    },
    async submitEdit() {
      this.dialogVisible = false;
      let res = await this.$http.saveTemplate({
        html: this.CodeMirrorEditor.getValue(),
        savePath: this.savePath
      });
      if (res.data) {
        this.$notify({
          title: "成功",
          message: res.msg,
          type: "success",
          duration: 1000
        });
      }
    },
    initCodeMirror() {
      if (this.CodeMirrorEditor) {
        this.$nextTick(() => {
          this.CodeMirrorEditor.setValue(this.preCode.toString());
        });
      } else {
        this.$nextTick(() => {
          let editor = this.$refs.editor;
          this.CodeMirrorEditor = codemirror.fromTextArea(editor, {
            lineNumbers: true, //是否显示行号
            mode: "htmlmixed",
            theme: "monokai",
            styleActiveLine: true,
            showCursorWhenSelecting: true,
            indentUnit: 4, //缩进单位
            smartIndent: true, //是否智能缩进
            readOnly: false, //是否只读
            tabSize: 4
          });
        });
      }
    },
    async editTempate(path) {
      this.savePath = path;
      this.dialogVisible = true;
      this.preCode = await this.$http.editTempate({
        path: path
      });
      this.initCodeMirror();
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
  justify-content: space-between;
  border-bottom: 1px solid #e4e7ed;
}
.el-table {
  font-size: 16px;
}
.el-link {
  font-size: 10px;
}
.left-btn-group {
  flex: 1 1 50%;
  display: flex;
}
.birth-page-btn {
  margin-left: 10px;
}
.el-button {
  &::v-deep i {
    margin-right: 5px;
    font-size: 12px;
  }
}
</style>
