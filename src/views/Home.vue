<template>
  <div id="Home">
    <main-container>
      <div
        class="wrapper"
        v-infinite-scroll="onLoad"
        infinite-scroll-disabled="disabled"
      >
        <div class="wrapper__header">
          <div class="header__left">
            <span class="timer__date" style="font-size: 24px"
              >{{ new Date().getDate() }},
            </span>
            <span class="timer__month">{{ new Date().getMonth() + 1 }} </span>
            <span class="timer__year">{{ new Date().getFullYear() }}</span>
          </div>

          <div class="header__right">
            {{ `${new Date().getHours()}:${new Date().getMinutes()}` }}
          </div>

          <router-link to="/search">
            <div class="header__search--icon">
              <i class="el-icon-search"> </i>
            </div>
          </router-link>
        </div>
        <div class="wrapper__body">
          <span style="margin-bottom: 10px">今日推荐</span>
          <ul class="infinite-list">
            <li>
              <recommend-book
                v-for="(ele, index) in recommendBooks"
                :key="index"
                :recommend-book="ele"
              ></recommend-book>
            </li>
          </ul>
          <p v-if="loading" v-loading="loading">
            <i class="el-icon-loading"></i>
            加载中...
          </p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </div>
    </main-container>
    <el-backtop target=".wrapper" :right="20" :bottom="80"></el-backtop>
  </div>
</template>

<script>
import RecommendBook from "../components/RecommendBook";
export default {
  name: "Home",
  data() {
    return {
      recommendBooks: [],
      loading: false
    };
  },
  computed: {
    noMore() {
      return this.recommendBooks.length % 5 !== 0; //当书籍长度不为5的倍数时，表明已经没有更多的书本可以加载
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    async onLoad() {
      this.loading = true;

      await this.$store.dispatch("getRecommendBooks", {
        offset: this.recommendBooks.length,
        limit: 5
      });
      this.recommendBooks = [
        ...this.recommendBooks,
        ...this.$store.state.recommendBooks
      ]; //合并数组

      // debugger;
      this.loading = false;
    }
  },
  components: { RecommendBook }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/default-theme";

#Home {
  height: 100%;
  width: 100%;

  .wrapper {
    height: 100%; // 添加高度，以让其成为无线加载的基准目标
    .wrapper__header {
      display: flex;
      align-items: flex-end;
      box-sizing: border-box;
      padding: 10px;
      width: 100%;

      .timer__date {
        font-weight: bold;
        color: $widget-color;
      }

      .header__search--icon {
        @include mixin-search-icon(30px, 18px);
        margin-left: 10px;
        i {
          color: red;
        }
      }
    }

    .wrapper__body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
