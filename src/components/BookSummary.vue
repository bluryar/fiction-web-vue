<template>
  <div id="BookSummary">
    <div class="bookinfo">
      <div class="bookinfo__info">
        <div class="bookinfo__text">
          <div class="bookinfo__title">{{ chosenBook.title }}</div>
          <div class="bookinfo__author">{{ chosenBook.author }}</div>
          <div class="bookinfo__isFinish">
            {{ chosenBook.finish ? "完本" : "连载中" }} | {{ chosenBook.type }}
          </div>
          <div class="bookinfo__click">
            点击量：{{ chosenBook.click }} | {{ chosenBook.chaptersNum }}章
          </div>
          <div class="bookinfo__updatetime">
            更新时间：{{
              chosenBook.updated_at
                .replace(/\:\d*\.\d*Z$/gi, "")
                .replace("T", " ")
            }}
          </div>
        </div>
        <div class="bookinfo__cover">
          <el-image :src="chosenBook.coverImgLink" :fit="'cover'"></el-image>
        </div>
      </div>
      <div class="bookinfo__summary">
        <p>{{ chosenBook.summary }}</p>
      </div>
      <div class="bookinfo__btn--group">
        <el-button @click="onAddBookInShelf">{{
          this.isInBookShelf ? "已在书架" : "加入书架"
        }}</el-button>
        <el-button
          type="primary"
          @click="$router.push($route.path + '/' + lastChapterIndex)"
          >{{
            this.lastChapterIndex === 0 ? "开始阅读" : "继续阅读"
          }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookSummary",
  props: {
    chosenBook: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isInBookShelf: false
    };
  },
  mounted() {
    let res = this.$ls.get("localBookShelf");
    this.isInBookShelf = res && !!res[this.chosenBook.id];
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
  },
  methods: {
    onAddBookInShelf() {
      let res = this.$ls.get("localBookShelf");
      if (!res || !res[this.chosenBook.id]) {
        // 没有在书架中
        this.$ls.set("localBookShelf", {
          ...{
            [this.chosenBook.id]: this.chosenBook
          },
          ...this.$ls.get("localBookShelf")
        });

        this.isInBookShelf = !!this.$ls.get("localBookShelf")[
          this.chosenBook.id
        ];
        this.$message.success({ message: "已在书架中", offset: 50 });
      } else {
        this.$message({ message: "已在书架中", offset: 50 });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.bookinfo {
  padding: 20px;
  @keyframes zoom {
    0% {
      transform: scale3d(1, 1, 1);
    }
    50% {
      transform: scale3d(1.15, 1.15, 1.15);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }
  animation: zoom 0.2s;

  .bookinfo__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bookinfo__text {
      .bookinfo__title {
        font-size: 2em;

        max-width: 6em;
      }
      .bookinfo__click,
      .bookinfo__updatetime,
      .bookinfo__isFinish {
        font-size: 14px;
        color: #979797;
      }
    }
    .bookinfo__cover {
      width: 100px;
      height: 130px;
      border-radius: 8px;
      box-shadow: 0 0 10px -5px;
      overflow: hidden;
      & > * {
        height: 100%;
      }
    }
  }
  .bookinfo__summary {
    font-size: 14px;
  }
  .bookinfo__btn--group {
    display: flex;
    justify-content: space-around;
  }
}
</style>
