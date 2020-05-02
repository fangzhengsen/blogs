<template>
  <el-container>
    <el-header>
      <el-image
        style="width: 50px; height: 50px"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="fill"
      ></el-image>
      <div class="welcome">欢迎 {{username}}</div>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          个人中心
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item command="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <el-menu
          :default-active="activeItem"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item class="toggleMenu" @click="isCollapse=!isCollapse">
            <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
          </el-menu-item>
          <template v-for="item in menulist">
            <el-menu-item
              :index="item.model_id"
              v-if="item.children.length===0"
              :key="item.model_id"
              @click="routeTo(null,item)"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.authName}}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.model_id" :key="item.model_id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item
                :index="subItem.model_id"
                v-for="subItem in item.children"
                :key="subItem.model_id"
                @click="routeTo(item,subItem)"
              >
                <i :class="subItem.icon"></i>
                {{subItem.authName}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator="/" v-if="breadcrumb.length!=0">
          <el-breadcrumb-item
            v-for="(item,index) in breadcrumb"
            :to="item.path?item.path:''"
            :key="index"
          >{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeItem: "103",
      menulist: [],
      breadcrumb: [],
      username: window.sessionStorage.getItem("username")
    };
  },

  methods: {
    async getMenuList() {
      let res = await this.$http.getMenuList();
      this.menulist = [...res.data];
      console.log(this.menulist);
      this.$nextTick(() => {
        if (window.sessionStorage.getItem("breadcrumb")) {
          this.breadcrumb.push(
            ...window.sessionStorage.getItem("breadcrumb").split(",")
          );
        }
        if (window.sessionStorage.getItem("activeItem")) {
          this.activeItem = window.sessionStorage.getItem("activeItem");
        }
      });
    },
    handleCommand(key) {
      if (key == "loginOut") {
        this.$router.push("/login");
        window.sessionStorage.clear();
      }
    },
    routeTo(parent, item) {
      if (this.activeItem === item.model_id) return;
      this.activeItem = item.model_id;
      this.breadcrumb = [];
      parent && this.breadcrumb.push(parent.authName);
      this.breadcrumb.push(item.authName);
      window.sessionStorage.setItem("breadcrumb", this.breadcrumb);
      window.sessionStorage.setItem("activeItem", this.activeItem);
      this.$router.push("/" + item.path);
    }
  },
  mounted() {
    this.getMenuList();
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #39444f;
  box-shadow: 0px 1px 1px 0px #000;
  z-index: 1;
}
.el-dropdown {
  color: #fff;
  flex: 0 0 85px;
}
.el-image {
  flex: 0 0 50px;
}
.el-container {
  height: 100%;
}
.el-breadcrumb {
  padding: 15px;
  background: #f2f2f2;
}
.el-aside {
  background: #545c64;
  transition: all 0.3s linear;
}
.el-menu {
  border-right: 0;
  .el-menu-item,
  .el-submenu {
    i {
      color: #fff;
      margin-right: 8px;
    }
  }
}
.welcome {
  color: #e6a23c;
  display: flex;
  flex: 0 1 100%;
  justify-content: flex-end;
  margin-right: 20px;
}
.toggleMenu {
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 26px;
  }
}
.el-main {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0;
}
</style>
