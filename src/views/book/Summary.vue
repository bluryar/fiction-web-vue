<template>
  <div id="Summary" v-loading="loading">
    <my-header :back-btn="true"></my-header>
    <div class="wrapper">
      <book-summary :chosen-book="chosenBook" v-if="!loading"></book-summary>
      <chapter-summary
        v-if="!!chosenBook"
        v-loading="!chosenBook"
        :chapters="chapters"
        :book-id="chosenBook.id"
        :more-btn="true"
      ></chapter-summary>
    </div>
  </div>
</template>

<script>
import BookSummary from "../../components/BookSummary";
import ChapterSummary from "../../components/ChapterSummary";
import { getChpatersSummary } from "../../api/chapter";

export default {
  name: "Summary",
  components: { BookSummary, ChapterSummary },
  data() {
    return {
      loading: true,
      chapters: []
    };
  },
  computed: {
    chosenBook() {
      return this.$store.state.chosenBook;
    },
    lastReadingChaptersIndex() {
      let lastChapterIndex = 0;
      if (
        this.$ls.get("lastReadingChaptersIndex") &&
        !!this.$ls.get("lastReadingChaptersIndex")[this.$route.params.book_id]
      ) {
        // lastReadingChapterIndex { id, index }
        lastChapterIndex = this.$ls.get("lastReadingChaptersIndex")[
          this.$route.params.book_id
        ];
        lastChapterIndex = Math.floor(parseInt(lastChapterIndex) / 10) * 10;
      }
      return lastChapterIndex;
    }
  },
  async created() {
    //设置简介信息
    let id = parseInt(this.$route.params.book_id);
    if (isNaN(id)) {
      this.$message.error({
        message: "书本不存在",
        offset: 50
      });
      return;
    }
    if (id < 0) {
      this.$message.error({
        message: "id不存在",
        offset: 50
      });
      return;
    }
    await this.$store.dispatch("getChosenBook", { id });
    this.loading = false;
    if (
      !this.$ls.get("chosenBook") ||
      (this.$ls.get("chosenBook") &&
        this.$store.state.chosenBook.id !== this.$ls.get("chosenBook").id)
    ) {
      this.$ls.set("chosenBook", this.$store.state.chosenBook); //缓存
    }

    // 设置目录
    if (!this.$store.state.chosenBook) {
      this.$message.error({
        message: "网络异常，请刷新",
        offset: 50
      });
      return;
    }
    const res = await getChpatersSummary(
      this.chosenBook.id,
      this.lastReadingChaptersIndex,
      10
    );
    this.chapters = res.data;
  }
};
</script>

<style lang="scss" scoped>
#Summary {
  display: flex;
  flex-direction: column;
  height: 100%;
  .wrapper {
    overflow: auto;
    height: 100%;
  }
}
</style>
