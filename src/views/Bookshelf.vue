<template>
  <div id="Bookshelf">
    <main-container>
      <div class="empty" v-if="books === null || books.length === 0">
        暂时没有书籍加入书架~
      </div>
      <div class="content" v-else>
        <el-row
          v-for="n in Math.ceil(books.length / 3)"
          :key="n"
          type="flex"
          justify="space-between"
        >
          <el-col :span="8">
            <small-book
              :search-book="books[(n - 1) * 3 + 0]"
              v-if="!!books[(n - 1) * 3 + 0]"
            ></small-book>
          </el-col>
          <el-col :span="8">
            <small-book
              :search-book="books[(n - 1) * 3 + 1]"
              v-if="!!books[(n - 1) * 3 + 1]"
            ></small-book>
          </el-col>
          <el-col :span="8">
            <small-book
              :search-book="books[(n - 1) * 3 + 2]"
              v-if="!!books[(n - 1) * 3 + 2]"
            ></small-book>
          </el-col>
        </el-row>
      </div>
    </main-container>
  </div>
</template>

<script>
import SmallBook from "../components/SmallBook";

export default {
  name: "BookShelf",
  components: { SmallBook },
  data() {
    return {
      books: []
    };
  },
  async created() {
    let res = this.$ls.get("localBookShelf");
    if (res) {
      for (const book in res) {
        this.books.push(res[book]);
      }
    }
  }
};
</script>

<style lang="scss">
#Bookshelf {
  height: 100%;
  width: 100%;

  .empty {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    box-sizing: border-box;
    padding: 15px;
    width: 100%;
    height: 100%;

    .el-col {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      overflow: hidden;
    }
  }
}
</style>
