<template>
  <el-container>
    <el-aside>
      <el-tree :data="data" @node-click="handleTree" icon-class="el-icon-document" node-key="id"></el-tree>
    </el-aside>
    <el-main>
      <iframe src="http://www.baidu.com" width="100%" height="100%" frameborder="0"></iframe>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2三级 1-1-2三级 1-1-2三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2",
              children: [
                {
                  id: 11,
                  label: "三级 3-2-1"
                },
                {
                  id: 12,
                  label: "三级 3-2-2"
                },
                {
                  id: 13,
                  label: "三级 3-2-3"
                }
              ]
            }
          ]
        }
      ]
    };
  },

  methods: {
    handleTree(data, node, el) {
      this.isExpanded = node.expanded;
      console.log(node);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.el-aside {
  flex: 0 0 200px;
  border-right: 1px solid #e4e7ed;
}

//树形控件图标修改
.el-tree {
  min-width: 100%;
  width: max-content;
  &::v-deep .el-tree-node__expand-icon {
    &::before {
      content: "\e78a" !important;
    }
    &.expanded {
      transform: rotate(0) !important;
      &::before {
        content: "\e784" !important;
      }
    }
    &.is-leaf {
      color: #c0c4cc !important;
      &::before {
        content: "\e785" !important;
      }
    }
  }
}
</style>
