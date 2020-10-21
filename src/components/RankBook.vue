<template>
  <router-link tag="div" :to="`/book/${book.id}`" id="RankBook">
    <div class="top">
      <div class="texture">
        <h3 class="title">{{ book.title }}</h3>
        <span class="author">{{ book.author }}</span>
      </div>
      <div class="cover">
        <el-image
          :src="book.coverImgLink"
          :fit="'cover'"
          class="image"
        ></el-image>
      </div>
    </div>
    <p class="summary" v-html="book.summary"></p>
  </router-link>
</template>

<script>
export default {
  name: "RankBook",
  props: {
    book: { type: Object, required: true }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/default-theme";
#RankBook {
  box-sizing: border-box;
  padding: 20px 10px;
  border-bottom: 1px solid $widget-color;
  .top {
    display: flex;
    .author {
      color: #979797;
      font-size: 14px;
    }
    .cover {
      height: 120px;
      width: 90px;

      .image,
      el-image,
      img {
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
    }

    .cover {
      border-radius: 10px;
      box-shadow: 0 0px 10px -4px;
      overflow: hidden;
    }
  }
  .summary {
    font-size: 14px;
  }
}
</style>
