<template>
  <div class="border rounded-lg p-2 min-w-[300px]">
    <div>
      <a
        :href="'https://www.klerk.ru' + rubric.url"
        class="text-blue-500"
        target="_blank"
        >{{ rubric.title }}</a
      >
      <p>({{ rubric.count + ", " + getSum(rubric) }})</p>
      <input type="checkbox" v-model="isChecked" />
    </div>
    <template v-if="rubric?.children?.length">
      <button
        v-if="!isShowChildren"
        @click="showChildren"
        class="w-max border rounded-sm px-1"
      >
        Show children
      </button>
      <button
        v-else
        @click="closeChildren"
        class="w-max border rounded-sm px-1"
      >
        Close children
      </button>
      <div
        v-if="isShowChildren"
        style="margin-left: 10px"
        class="ml-2 flex flex-col items-start gap-1 mt-2"
      >
        <Rubric
          v-for="child in rubric.children"
          :key="child.id"
          :rubric="child"
        ></Rubric></div
    ></template>
  </div>
</template>

<script>
import { useTreeStore } from "../stores/tree.js";
export default {
  setup() {
    const treeStore = useTreeStore();
    return { treeStore };
  },
  props: {
    rubric: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowChildren: false,
      isChecked: false,
    };
  },
  watch: {
    isChecked() {
      if (this.isChecked == true) {
        this.treeStore.check(this.rubric.id);
      }
      if (this.isChecked == false) {
        this.treeStore.unCheck(this.rubric.id);
      }
    },
    tree: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        const getById = this.treeStore.getById;
        const rubric = getById(this.rubric.id);
        this.isChecked = rubric.isChecked || false;
      },
    },
  },
  computed: {
    tree() {
      return this.treeStore.getTree;
    },
  },
  methods: {
    showChildren() {
      this.isShowChildren = true;
    },
    closeChildren() {
      this.isShowChildren = false;
    },
    getSum(rubric) {
      let result = rubric.count;
      if (rubric?.children?.length) {
        rubric.children.forEach((item) => (result += this.getSum(item)));
      }
      return result;
    },
    getCheckedSum(rubric) {
      let result = rubric.count;
      if (rubric?.children?.length) {
        rubric.children.forEach((item) => (result += this.getSum(item)));
      }
      return result;
    },
  },
};
</script>
