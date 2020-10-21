<template>
  <div id="MainContainer">
    <div class="container__body">
      <slot></slot>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  props: {
    footer: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
#MainContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  :nth-child(1) {
    overflow: auto;

    flex: 2;
  }
}
</style>
