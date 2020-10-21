<template>
  <div id="ChapterSummary">
    <div class="chaper__topbar">
      <span>
        <i class="el-icon-notebook-1 icon"></i>
        目录
      </span>
      <span v-if="moreBtn">
        <router-link :to="`/catalogs/${bookId}`">更多</router-link>
        <i class="el-icon-caret-right icon"></i>
      </span>
    </div>
    <div class="chapters">
      <div class="chapters__item" v-for="(ele, index) in chapters" :key="index">
        <router-link :to="`/book/${bookId}/${ele.index}`">
          {{ ele.title }}
        </router-link>
        <span v-if="lastChapterIndex === ele.index">继续</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChapterSummary",
  props: {
    bookId: {
      type: [Number, String],
      validator(val) {
        if (typeof val === "string") {
          !isNaN(parseInt(val));
        }
        return true;
      }
    },
    chapters: {
      type: Array,
      required: true
    },
    moreBtn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lastChapterIndex() {
      let lastChapterIndex = 0;
      if (
        this.$ls.get("lastReadingChaptersIndex") &&
        !!this.$ls.get("lastReadingChaptersIndex")[this.$route.params.book_id]
      ) {
        // lastReadingChapterIndex { id, index }
        lastChapterIndex = this.$ls.get("lastReadingChaptersIndex")[
          this.$route.params.book_id
        ];
        lastChapterIndex = parseInt(lastChapterIndex);
      }
      return lastChapterIndex;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/default-theme";
.chaper__topbar {
  :nth-child(1) {
    font-size: 24px;
    .icon {
      color: $widget-color;
    }
  }
  :nth-child(2) {
    a {
      color: #979797;
      font-size: 1em;
    }
    i {
      color: $widget-color;
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #979797;
  padding-bottom: 10px;
  margin: 20px;
}
.chapters {
  margin: 10px 20px;
  .chapters__item {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 1px solid #c2c1c1;
    font-size: 14px;
    a {
      color: #979797;
    }
  }
}
</style>
