<template>
  <div id="SmallBook" @click="$router.push(`/book/${searchBook.id}`)">
    <div class="showcase__cover">
      <div class="showcase__cover--card">
        <el-image
          :src="searchBook.coverImgLink"
          :fit="'fill'"
          class="showcase__cover--image"
        ></el-image>
      </div>
    </div>
    <div class="showcase__title">{{ searchBook.title }}</div>
    <div class="showcase__author">{{ searchBook.author }}</div>
  </div>
</template>

<script>
export default {
  name: "SmallBook",
  props: {
    searchBook: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/default-theme";
#SmallBook {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 180px;
  margin: 10px 0;

  animation: rubber-band2 0.25s;

  .showcase__cover {
    height: 130px;
    width: 100%;
    .showcase__cover--card {
      box-shadow: 0 0 12px -7px;
      border-radius: 5px;
      height: 100%;
      width: 100%;
      overflow: hidden;
      .showcase__cover--image {
        height: 100%;
        width: 100%;
      }
    }
  }

  .showcase__title {
    height: 16px;
    width: 100%;
    line-height: 16px;
    font-size: 16px;
    margin: 5px 0;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

  .showcase__author {
    height: 12px;
    width: 100%;
    font-size: 12px;
    line-height: 12px;

    color: #979797;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
}
</style>
