<template>
  <div id="RecommendBook">
    <router-link
      tag="div"
      :to="{ path: `/book/${recommendBook.id}` }"
      class="showcase"
      v-loading="!recommendBook"
    >
      <div class="showcase__cover--shadow">
        <el-image
          class="showcase__cover"
          :src="recommendBook.coverImgLink"
          :fit="'cover'"
        />
      </div>
      <div class="showcase__title">{{ recommendBook.title }}</div>
      <div class="showcase__author">{{ recommendBook.author }}</div>
      <div class="showcase__summary">{{ recommendBook.summary }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "RecommendBook",
  props: {
    recommendBook: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/default-theme";
#RecommendBook {
  width: 90%;
  div.showcase {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding-bottom: 30px;
    border-bottom: 1px solid $widget-color;

    .showcase__cover--shadow {
      box-sizing: border-box;
      box-shadow: 0 0px 10px -4px;
      border-radius: 15px;
      height: 270px;
      width: 200px;
      overflow: hidden;
      .showcase__cover {
        width: 100%;
        height: 100%;
      }
    }

    .showcase__title {
      margin: 10px 0;
      font-size: 24px;
    }

    .showcase__author {
      margin-bottom: 5px;
      font-size: 14px;
    }

    .showcase__summary {
      display: block;
      position: relative;
      overflow: hidden;
      line-height: 20px;
      height: 60px;

      text-overflow: ellipsis;
      font-size: 14px;
      color: $summary-low-level-color;
    }
    .showcase__summary::after {
      content: "...";
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
