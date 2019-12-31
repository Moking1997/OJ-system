<!--  -->
<template>
  <div class="custom-tree-container">
    <el-button @click="getTree()">1</el-button>
    <div class="block">
      <p>使用 scoped slot</p>
      <!-- {{data}} -->
      <br />
      <!-- {{tree}} -->
      {{test}}
      <el-tree
        :data="tree"
        show-checkbox
        node-key="ID"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label}}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "数据结构",
        parentID: 0,
        children: [{ id: 11, label: "数据结构", parentID: 0 }]
      },
      { id: 2, label: "C语言", parentID: 0 },
      { id: 3, label: "Java", parentID: 0 }
    ];
    return {
      tree: []
    };
  },

  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    async getChildren(node, id) {
      let child = await fetch("http://localhost:8088/api/catalog/" + id);
      let children = await child.json();
      console.log(children);
      node.children = children;
      return children;
    },
    getTree() {
      this.tree.forEach(element => {
        element.te = "ee";
      });
      console.log(this.tree);
    }
  },
  watch: {
    tree: {}
  },
  async created() {},
  computed: {
    test() {
      
        let res = await fetch("http://localhost:8088/api/catalog/0");
        let t = await res.json();
        t.forEach(async element => {
          let data = await fetch("http://localhost:8088/api/catalog/" + 1);
          let children = await data.json();
          element.children = children;
        });
        console.log(t);
        return t;
      }
    
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>