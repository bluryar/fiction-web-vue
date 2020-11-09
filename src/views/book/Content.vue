<template>
  <div id="Content">
    <my-header
      :path="$route.path.replace(/\/\d+$/, '')"
      :back-btn="true"
      :class="headerClass"
      :push="true"
    >
      <span class="chapter-title" v-if="content !== null">{{
        content.title
      }}</span>
    </my-header>

    <div
      :class="contentClass"
      v-loading="loading"
      ref="content"
      @click="toggleWidget"
    >
      <h3 v-if="this.content">{{ this.content.title }}</h3>
      <div
        class="paragraph"
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
      :class="footerClass"
      @update-index="onUpdateIndex"
    ></tool-bar>
  </div>
</template>

<script>
import ToolBar from "../../components/ToolBar";
import { getChosenBook } from "../../api/book";
import { getChapterContent } from "../../api/chapter";

const hiddenClassName = {
  header: "hidden-header",
  content: "fullscreen-content",
  footer: "hidden-footer"
};

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
      cacheChaptersContent: new Map(),

      headerClass: ["header"],
      contentClass: ["content"],
      footerClass: ["footer"]
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
      this.chosenBook = res.data;
      this.$ls.set("chosenBook", this.chosenBook);
    } else {
      this.chosenBook = this.$ls.get("chosenBook");
    }
    this.loading = true;
    await this.setContent();
    if (!this.$ls.get("firstUse")) {
      this.$ls.set("firstUse", "yes"); // ‘上锁，只保证该代码运行一次’
      this.$message.info({
        message: "点击屏幕中央全屏, 点击屏幕左右边缘翻页",
        offset: 1,
        duration: 3500
      });
    }
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
    },
    async toggleWidget(evt) {
      let contentHeight = document.body.clientHeight;
      let contentWidth = document.body.clientWidth;
      console.log(
        this.$refs.content.scrollTop,
        this.$refs.content.scrollHeight
      );

      let areaFactor = 0.125;
      const cond = {
        top: contentHeight - evt.clientY < contentHeight * (1 - areaFactor),
        bottom: contentHeight - evt.clientY > contentHeight * areaFactor,
        left: contentWidth - evt.clientX < contentWidth * (1 - areaFactor),
        right: contentWidth - evt.clientX > contentWidth * areaFactor
      };

      // 要求点击页面的中间，80% * 80%的区域才切换
      if (cond.top && cond.bottom && cond.left && cond.right) {
        if (this.headerClass.length === 1) {
          //隐藏
          this.headerClass.push(hiddenClassName.header);
          this.contentClass.push(hiddenClassName.content);
          this.footerClass.push(hiddenClassName.footer);
        } else {
          //显示
          this.headerClass.pop(hiddenClassName.header);
          this.contentClass.pop(hiddenClassName.content);
          this.footerClass.pop(hiddenClassName.footer);
        }
      } else if (!cond.bottom || !cond.right) {
        // 翻页
        this.currentIndex += 1;
        await this.onUpdateIndex();
      } else if (!cond.left || !cond.top) {
        if (this.currentIndex > 0) {
          this.currentIndex -= 1;
          await this.onUpdateIndex();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
$header-height: 50px;
$footer-height: 80px;
$animate-ms: 0.33s;

#Content {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 2;

  .hidden-header {
    position: absolute;
    top: -$header-height !important;
    transition: top $animate-ms;
    display: none;
  }

  .hidden-footer {
    position: absolute;
    bottom: -$footer-height !important;
    transition: bottom $animate-ms;
    display: none;
  }

  .fullscreen-content {
    position: absolute;
    bottom: 0 !important;
    top: 0 !important;
    transition: bottom $animate-ms, top $animate-ms;
  }

  .header {
    position: absolute;
    top: 0;
    transition: bottom $animate-ms, top $animate-ms;
    background-color: #ffffff;
  }

  .footer {
    position: absolute;
    bottom: 0;
    transition: bottom $animate-ms, top $animate-ms;
    background-color: #ffffff;
  }

  .content {
    position: absolute;
    bottom: $footer-height;
    top: $header-height;
    transition: bottom $animate-ms, top $animate-ms;

    /*box-sizing: border-box;*/
    overflow: auto;

    h3,
    div.paragraph {
      width: 90%;
      margin: 0 auto;
    }

    p {
      /*width: 100%;*/
      // 强制中文英文自动换行
      word-wrap: break-word;
      word-break: break-all;
      //将会导致某些特殊字符(ASCII)组成的分割线被换行
      /*word-break: normal;*/
    }
  }

  .chapter-title {
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
