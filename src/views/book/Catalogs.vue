<template>
  <div id="Catalogs">
    <my-header :back-btn="true"></my-header>
    <div class="wrapper">
      <chapter-summary
        :book-id="chosenBook.id"
        :chapters="chapters"
        v-loading="loading"
      ></chapter-summary>
    </div>
    <div class="paginator">
      <el-pagination
        layout="prev, pager, next"
        :total="chosenBook.chaptersNum"
        :current-page.sync="currentPage"
        :pager-count="5"
        @current-change="changeChapters"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ChapterSummary from "../../components/ChapterSummary";
import { getChpatersSummary } from "../../api/chapter";

export default {
  name: "Catalogs",
  components: {
    ChapterSummary
  },
  data() {
    return {
      chapters: [],
      currentPage: 0,
      loading: true
    };
  },
  computed: {
    chosenBook() {
      return this.$ls.get("chosenBook");
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
  methods: {
    async changeChapters() {
      // 设置目录
      this.loading = true;
      const res = await getChpatersSummary(
        this.chosenBook.id,
        (this.currentPage - 1) * 10,
        10
      );
      this.chapters = res.data;
      this.loading = false;
    }
  },
  async mounted() {
    // 设置目录
    this.loading = true;
    const res = await getChpatersSummary(
      this.chosenBook.id,
      this.lastReadingChaptersIndex,
      10
    );
    this.chapters = res.data;
    this.loading = false;
    this.currentPage = Math.floor(this.lastReadingChaptersIndex / 10);
  }
};
</script>

<style scoped lang="scss">
#Catalogs {
  display: flex;
  flex-direction: column;
  height: 100%;
  .wrapper {
    overflow: auto;
    height: 85%;
  }
  .paginator {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    height: 15%;
  }
}
</style>
