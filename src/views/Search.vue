<template>
  <div id="Search">
    <my-header path="/" :back-btn="true">
      <el-input
        v-model="qs"
        placeholder="请输入书名或作者名"
        size="small"
        class="input__search"
        @keyup.enter.native="onSearch"
      >
        <div class="header__search--icon" slot="suffix" @click="onSearch">
          <i class="el-icon-search"> </i>
        </div>
      </el-input>
    </my-header>

    <div class="wrapper wrapper__body">
      <small-book
        v-for="(ele, index) in searchBooks"
        :key="index"
        :search-book="ele"
      ></small-book>
    </div>
  </div>
</template>

<script>
import SmallBook from "../components/SmallBook";
import { getSearchBook } from "../api/book";

export default {
  data() {
    return {
      qs: "",
      lastQs: "",
      searchBooks: []
    };
  },
  components: {
    SmallBook
  },
  methods: {
    async onSearch() {
      if (this.qs.length === 0) {
        this.$message.warning({
          message: "输入不能为空",
          showClose: true,
          offset: 50
        });
        return;
      }
      if (this.lastQs === this.qs) {
        this.$message.warning({
          message: "请勿重复输入",
          showClose: true,
          offset: 50
        });
        return;
      }
      let temp = [];
      const res = await getSearchBook(this.qs);
      if (res.data.title && res.data.title.length) {
        temp = res.data.title;
      }
      if (res.data.author && res.data.author.length) {
        temp = [...temp, ...res.data.author];
      }
      if (temp.length === 0) {
        this.$message.warning({
          message: "返回结果为空，没有找到相关书籍",
          showClose: true,
          offset: 50
        });
      } else this.searchBooks = temp;

      this.lastQs = this.qs;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/default-theme";
#Search {
  display: flex;
  flex-direction: column;
  height: 100%;

  .input__search {
    animation: rubber-band 1s;
  }
  .header__search--icon {
    @include mixin-search-icon(18px, 18px);
    i {
      color: $widget-color;
    }
    :hover {
      cursor: pointer;
    }
  }
  .el-input__suffix {
    display: flex;
    align-items: center;
  }

  .wrapper__body {
    display: flex;
    justify-content: space-around;
    align-content: flex-start;
    flex-wrap: wrap;
    padding: 20px 10px;
    height: 100%;
    overflow: auto;
  }
}
</style>
