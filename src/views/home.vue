<template>
  <el-container>
    <el-header>
      <el-image
        style="width: 50px; height: 50px"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="fill"
      ></el-image>
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
            <i :class="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"></i>
          </el-menu-item>
          <template v-for="item in menulist">
            <el-menu-item
              :index="item.id"
              v-if="item.children.length===0"
              :key="item.id"
              @click="routeTo(item.path)"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.authName}}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.id" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item
                :index="subItem.id"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="routeTo(subItem.path)"
              >
                <i :class="subItem.icon"></i>
                {{subItem.authName}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">活动管理</a>
          </el-breadcrumb-item>
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
      activeItem: "",
      menulist: []
    };
  },

  methods: {
    async getMenuList() {
      let res = await this.$http.getMenuList();
      this.menulist = [...res.data];
      this.$nextTick(() => {
        this.activeItem =
          this.menulist[0].children.length === 0
            ? this.menulist[0].id
            : this.menulist[0].children[0].id;
      });
    },
    handleCommand(key) {
      if (key == "loginOut") {
        this.$router.push("/login");
        window.sessionStorage.setItem("user", "");
      }
    },
    routeTo(path) {
      this.$router.push("/" + path);
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
}
.el-dropdown {
  color: #fff;
}
.el-container {
  height: 100%;
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
.toggleMenu {
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 26px;
  }
}
</style>
