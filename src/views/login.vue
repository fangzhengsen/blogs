<template>
  <div class="login-wrap">
    <el-card class="box-card">
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item>
          <el-image
            class="avator"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="fill"
          ></el-image>
        </el-form-item>
        <el-form-item prop="name">
          <el-input type="text" placeholder="请输入用户" v-model="user.name">
            <template slot="prepend">
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" placeholder="请输入密码" v-model="user.pwd">
            <template slot="prepend">
              <i class="iconfont iconlock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.pwd !== "") {
          this.$refs.userForm.validateField("name");
        }
        callback();
      }
    };
    return {
      user: {
        name: "test",
        pwd: "testtest"
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        pwd: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false;
        let res = await this.$http.getUser(this.user);
        console.log(res);
        if (res.data) {
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
            duration: 1000
          });

          window.sessionStorage.setItem("token", res.token);
          this.$router.push("/home");
        } else {
          this.$notify({
            title: "警告",
            message: res.msg,
            type: "warning",
            duration: 1000
          });
        }
      });
    },
    reset() {
      this.$refs["userForm"].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  height: 100%;
  background: #095db4;
}
.avator {
  position: absolute;
  left: 50%;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 5px solid rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -100%);
}
.el-form {
  margin-top: 50px;
}
.el-form-item ::v-deep .el-form-item__error {
  left: 60px;
}
.box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 260px;
  padding: 20px 30px;
  overflow: visible;
  transform: translate(-50%, -50%);
}
</style>
