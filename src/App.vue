<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
html {
  height: 100%;
  width: 100%;
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }
}

#app {
  height: 100%;
  width: 100%;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
