<template>
  <div id="Content">
    <my-header
      :path="$route.path.replace(/\/\d+$/, '')"
      :back-btn="true"
      class="header"
    >
      <span class="chpater-title" v-if="content !== null">{{
        content.title
      }}</span>
    </my-header>
    <div class="content" v-loading="loading" ref="content">
      <div
        v-for="(ele, index) in contentHtmlArray"
        :key="index"
        :style="{ fontSize: fontsize + 'px', lineHeight: fontsize + 10 + 'px' }"
      >
        <p v-html="ele"></p>
        <br />
      </div>
    </div>

    <tool-bar
      :chapters-num="chosenBook.chaptersNum"
      :current-index.sync="currentIndex"
      :font-size.sync="fontsize"
      v-if="!!chosenBook"
      class="footer"
      @update-index="onUpdateIndex"
    ></tool-bar>
  </div>
</template>

<script>
import ToolBar from "../../components/ToolBar";
import { getChosenBook } from "../../api/book";
import { getChapterContent } from "../../api/chapter";
export default {
  name: "Content",
  components: { ToolBar },
  data() {
    let that = this;
    return {
      chosenBook: null,
      currentIndex: parseInt(that.$route.params.chapter_index),
      fontsize: 14,
      content: null,
      loading: false,
      cacheChaptersContent: new Map()
    };
  },
  computed: {
    bookId() {
      return parseInt(this.$route.params.book_id);
    },
    chapterIndex() {
      return parseInt(this.$route.params.chapter_index);
    },
    contentHtmlArray() {
      if (this.content) {
        return this.content.content.split(/\n\n/g);
      } else return "";
    }
  },
  async created() {
    if (!this.$ls.get("chosenBook")) {
      const res = await getChosenBook(this.bookId);
      console.log(res);
      this.chosenBook = res.data;
      this.$ls.set("chosenBook", this.chosenBook);
    } else {
      this.chosenBook = this.$ls.get("chosenBook");
    }
    this.loading = true;
    await this.setContent();
  },
  methods: {
    async onUpdateIndex() {
      this.$router.replace(`/book/${this.bookId}/${this.currentIndex}`);
      await this.setContent();
    },
    async setContent() {
      if (this.cacheChaptersContent.has(this.$route.path)) {
        this.content = this.cacheChaptersContent.get(this.$route.path);
        return;
      }

      this.loading = true;
      const res = await getChapterContent(this.bookId, this.chapterIndex);
      this.content = res.data;
      // 格式化文本
      this.content.content = "&nbsp;&nbsp;&nbsp;&nbsp;" + this.content.content;
      // 记录时间戳，以便缓存
      this.content = { ...this.content, ...{ timestamp: Date.now() } };
      this.loading = false;

      // 缓存
      this.cacheChaptersContent.set(this.$route.path, this.content);

      // 检查缓存，防止内存占用
      if (this.cacheChaptersContent.size > 5) {
        let maxKey = "";
        let maxTime = 0;
        for (const [key, value] of this.cacheChaptersContent) {
          if (Date.now() - value.timestamp > maxTime) {
            maxKey = key;
            maxTime = value.timestamp;
          }
        }
        this.cacheChaptersContent.delete(maxKey);
      }

      // 设置一个标记，记录最后一次阅读的章节
      this.$ls.set("lastReadingChaptersIndex", {
        [this.bookId]: this.chapterIndex
      });

      // 回到顶部
      this.$refs["content"].scrollTop = 0;
    }
  }
};
</script>

<style scoped lang="scss">
#Content {
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  .header {
    background-color: #ffffff;
  }
  .footer {
    background-color: #ffffff;
  }
  .content {
    box-sizing: border-box;
    height: 100%;
    padding: 0 20px;
    overflow: auto;
  }

  .chpater-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
