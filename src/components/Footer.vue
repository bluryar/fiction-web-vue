<template>
  <div id="Footer">
    <router-link to="/bookshelf" tag="div" :key="1" class="link"
      >书架</router-link
    >
    <router-link to="/" tag="div" :key="2" class="link">发现</router-link>
    <router-link to="/ranklist" tag="div" :key="3" class="link"
      >榜单</router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/css/default-theme.scss";
#Footer {
  display: flex;
  justify-content: space-between;

  height: 50px;
  width: 100%;
  box-shadow: 0 -5px 5px -8px $widget-color;

  div.link {
    box-sizing: border-box;
    padding-bottom: 2px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.link.router-link-exact-active {
    padding-bottom: 0;
    border-bottom: 2px solid $widget-color;
    color: $widget-color;
  }
}
</style>
