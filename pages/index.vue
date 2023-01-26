<template>
  <div>
    <h1>Rubrics</h1>
    <label><input type="checkbox" v-model="allowEmpty" /> allowEmpty </label>
    <label><input type="checkbox" v-model="showTree" /> showTree </label>
    <p>checked sum: {{ checkedSum }}</p>
    <div class="flex flex-row items-start gap-2 w-min" v-if="showTree">
      <Rubric v-for="child in tree" :key="child.id" :rubric="child"></Rubric>
    </div>
  </div>
</template>

<script>
import { useTreeStore } from "../stores/tree.js";

export default {
  setup() {
    const treeStore = useTreeStore();
    return { treeStore };
  },
  data() {
    return {
      tree: [],
      allowEmpty: false,
      showTree: true,
    };
  },
  created() {
    this.getTree();
  },
  watch: {
    allowEmpty() {
      this.getTree();
    },
  },
  computed: {
    checkedSum() {
      return this.treeStore.getCheckedSum;
    },
  },
  methods: {
    getTree() {
      $fetch(
        `https://www.klerk.ru/yindex.php/v3/event/rubrics${
          this.allowEmpty ? "?allowEmpty=1" : ""
        }`
      )
        .then((data) => {
          this.tree = data;
          this.treeStore.update(data);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
  },
};
</script>
