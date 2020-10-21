<template>
  <div
    id="RankContent"
    v-infinite-scroll="onLoad"
    infinite-scroll-disabled="disabled"
  >
    <rank-book :book="book" v-for="(book, bindex) in books" :key="bindex" />
    <p v-loading="loading" v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import RankBook from "./RankBook";
export default {
  name: "RankContent",
  components: { RankBook },
  data() {
    return {
      loading: false,
      isFirst: true
    };
  },
  props: {
    books: { type: Array, required: true },
    typeId: { type: Number, required: true }
  },
  computed: {
    noMore() {
      return this.books.length % 5 !== 0;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    async onLoad() {
      this.loading = true;
      await this.$store.dispatch("addTypeBook", { type_id: this.typeId });
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="scss">
#RankContent {
  height: 100%;
  overflow: auto;
  margin: 0;
  .showcase__cover--shadow {
    width: 100px;
  }
  > p {
    text-align: center;
  }
}
</style>
