<template>
  <div id="Header">
    <div class="btn__back" @click="goto" v-if="backBtn">
      <i class="btn__back--icon el-icon-arrow-left"></i>
      <span>返回</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    path: {
      type: String
    },
    backBtn: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    chosenBook() {
      return this.$ls.get("chosenBook");
    }
  },
  methods: {
    goto() {
      if (this.path) {
        this.$router.replace(this.path);
      } else {
        this.$router.back();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/default-theme.scss";
#Header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 5px 5px -8px $widget-color;
  padding: 10px;
  height: 50px;
  width: 100%;
  .btn__back {
    width: 5em;
    :hover {
      cursor: pointer;
    }
  }
}
</style>
