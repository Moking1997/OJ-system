<!--  -->
<template>
  <div class="custom-tree-container">
    <div class="block">
      <p>使用 scoped slot</p>
      <!-- {{data}} -->
      <br />
      <input type="text" v-model="tree" />
      {{tree}}
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
import { eachSeries } from "async";
let id = 1000;
let ID = 1000;

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
    async getTree() {
      let child = await fetch("http://localhost:8088/api/catalog/" + 0);
      let children = await child.json();
      // await children.forEach(async element => {
      //   let res = await fetch("http://localhost:8088/api/catalog/" + 1);
      //   let r = res.json();
      //   element.children = "r";
      //   console.log("element", element);
      // });
      async function red(children) {
        for (const item of children) {
          let res = await fetch("http://localhost:8088/api/catalog/" + 1);
          let r = res.json();
          item.children = "r";
          console.log(item);
        }
      }

      eachSeries(children, err => {
        // let res = fetch("http://localhost:8088/api/catalog/" + 1);
        // let r = res.json();
        children.children = "r";
      });

      console.log("children", children);
      this.tree = children;
      // return children;
    }
  },
  watch: {
    tree(val) {
      this.value = val;
    }
  },
  async created() {
    // let res = await fetch("http://localhost:8088/api/catalog/0");
    // let tree = await res.json();
    this.getTree();
    // await tree.forEach(async element => {
    //   await this.getChildren(element, element.ID);
    //   console.log("element.children", element.children);
    // });
    // this.tree = await tree;
    // console.log("tree", this.tree);
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