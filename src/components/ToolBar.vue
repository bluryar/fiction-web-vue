<template>
  <div id="ToolBar">
    <div class="bar__top">
      <div class="btn__chapter">
        <router-link
          :to="
            `/catalogs/${
              $route.path.split('/')[$route.path.split('/').length - 2]
            }`
          "
        >
          <i class="el-icon-notebook-1"></i>
          <span>目录</span>
        </router-link>
      </div>
      <div class="slider">
        <div
          class="btn--prev btn"
          :style="{
            color: this.currentIndex === 0 ? '#979797' : '#000000'
          }"
          @click="prevChapter"
        >
          上一章
        </div>
        <div class="slider__bar">
          <vue-slider
            :min="0"
            :max="chaptersNum"
            v-model="watchedCurrentIndex"
            @change="onChange"
            :lazy="true"
          ></vue-slider>
        </div>
        <div
          class="btn-next btn"
          :style="{
            color:
              this.currentIndex && this.currentIndex === this.chaptersNum
                ? '#979797'
                : '#000000'
          }"
          @click="nextChapter"
        >
          下一章
        </div>
      </div>
    </div>

    <div class="bar__bot">
      <div class="bar__bot--left theme-choose">
        主题选择（后续提供）
      </div>
      <div class="bar__bot--right">
        <div
          class="fontsize--minus fontsize fontsize__btn"
          @click="$emit('update:font-size', watchedFontsize - 1)"
        >
          -A
        </div>
        <div
          class="fontsize--show fontsize"
          :style="{ fontSize: watchedFontsize + 'px' }"
        >
          {{ watchedFontsize }}
        </div>
        <div
          class="fontsize--plus fontsize fontsize__btn"
          @click="$emit('update:font-size', watchedFontsize + 1)"
        >
          A+
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
export default {
  name: "ToolBar",
  components: { VueSlider },
  data() {
    return {};
  },
  props: {
    chaptersNum: {
      type: Number,
      required: true
    },
    currentIndex: {
      type: Number,
      default: 0,
      required: true
    },
    fontSize: {
      type: Number,
      required: true
    }
  },
  computed: {
    watchedCurrentIndex: {
      get() {
        return this.currentIndex;
      },
      set(val) {
        this.$emit("update:current-index", val);
      }
    },
    watchedFontsize: {
      get() {
        return this.fontSize;
      },
      set(val) {
        this.$emit("update:font-size", val);
      }
    }
  },
  mounted() {},
  methods: {
    onChange() {
      this.$emit("update-index");
    },
    nextChapter() {
      if (this.currentIndex === this.chaptersNum) {
        this.$message({
          message: "到达边界，请勿点击",
          offset: 50
        });
        return;
      }
      this.$emit("update:current-index", this.currentIndex + 1);
      this.$emit("update-index");
    },
    prevChapter() {
      if (this.currentIndex === 0) {
        this.$message({
          message: "到达边界，请勿点击",
          offset: 50
        });
        return;
      }
      this.$emit("update:current-index", this.currentIndex - 1);
      this.$emit("update-index");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/default-theme";

#ToolBar {
  $bar-height: 80px;
  height: $bar-height;
  width: 100%;
  box-shadow: 0 -1px 16px -10px $widget-color;
  & > * {
    height: $bar-height / 2;
    width: 100%;
  }

  .bar__top {
    display: flex;
    align-items: center;
    width: 100%;
    .btn__chapter {
      width: 5em;
      text-align: center;
      padding-left: 10px;
      i {
        color: $widget-color;
        font-size: 1.2em;
      }
    }
    .slider {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      .btn {
        width: 6em;
      }
      .slider__bar {
        width: 100%;
        padding: 0 1em;
      }
    }
  }

  .bar__bot {
    display: flex;
    width: 100%;
    :nth-child(1) {
      width: 60%;
    }
    .theme-choose {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #c2c1c1;
    }
    :nth-child(2) {
      width: 40%;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      .fontsize {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .fontsize__btn {
        border: 1px solid #c2c1c1;
        border-radius: 2em;
        :hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
