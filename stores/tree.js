import { defineStore } from "pinia";

export const useTreeStore = defineStore("tree", {
  state: () => ({ tree: [] }),

  getters: {
    getTree: (state) => state.tree,
    getById: (state) => {
      function getElement(tree, id) {
        for (let idx in tree) {
          let rubric = tree[idx];
          if (rubric.id == id) return rubric;
          if (rubric?.children?.length) {
            const child = getElement(rubric.children, id);
            if (typeof child == "object") {
              return child;
            }
          }
        }
        return false;
      }
      return (elementID) => {
        return getElement(state.tree, elementID);
      };
    },
    getCheckedSum: (state) => {
      function getSum(tree) {
        let newSum = 0;
        for (let idx in tree) {
          let rubric = tree[idx];
          if (rubric.isChecked) newSum += rubric.count;
          if (rubric?.children?.length) {
            newSum += getSum(rubric.children);
          }
        }
        return newSum;
      }
      return getSum(state.tree);
    },
  },

  actions: {
    update(newTree) {
      this.tree = newTree;
    },

    checkElement(tree, elementID) {
      for (let idx in tree) {
        let rubric = tree[idx];
        if (rubric.id == elementID) {
          rubric.isChecked = true;
          if (rubric?.children?.length) {
            rubric.children = this.checkAll(rubric.children);
          }
          return tree;
        }
        if (rubric?.children?.length) {
          const newTree = this.checkElement(rubric.children, elementID);
          if (typeof newTree == "object") {
            rubric.children = newTree;
            return tree;
          }
        }
      }
      return false;
    },
    checkAll(tree) {
      for (let idx in tree) {
        let rubric = tree[idx];
        if (rubric?.children?.length) {
          rubric.children = this.checkAll(rubric.children);
        }
        rubric.isChecked = true;
      }
      return tree;
    },

    unCheckElement(tree, elementID) {
      for (let idx in tree) {
        let rubric = tree[idx];
        if (rubric.id == elementID) {
          rubric.isChecked = false;
          if (rubric?.children?.length) {
            rubric.children = this.unCheckAll(rubric.children);
          }
          return tree;
        }
        if (rubric?.children?.length) {
          const newTree = this.unCheckElement(rubric.children, elementID);
          if (typeof newTree == "object") {
            rubric.children = newTree;
            return tree;
          }
        }
      }
      return false;
    },
    unCheckAll(tree) {
      for (let idx in tree) {
        let rubric = tree[idx];
        if (rubric?.children?.length) {
          rubric.children = this.checkAll(rubric.children);
        }
        rubric.isChecked = false;
      }
      return tree;
    },
    check(elementId) {
      const newTree = this.checkElement(this.tree, elementId);
      console.log(newTree, "result");
      this.update(newTree);
    },
    unCheck(elementId) {
      const newTree = this.unCheckElement(this.tree, elementId);
      console.log(newTree, "result");
      this.update(newTree);
    },
  },
});
