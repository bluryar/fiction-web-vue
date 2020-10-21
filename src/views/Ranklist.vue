<template>
  <div id="Ranklist">
    <main-container>
      <el-tabs
        tab-position="left"
        :before-leave="onChange"
        @tab-click="changeTab"
      >
        <el-tab-pane
          :label="map.type_name"
          v-for="(map, index) in trueTagBookMaps"
          :key="index"
          :name="`${map.type_id}`"
        >
          <rank-content
            :books="map.resource"
            :type-id="map.type_id"
            class="rank-content"
          />
        </el-tab-pane>
      </el-tabs>
    </main-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RankContent from "../components/RankContent";
export default {
  name: "RankList",
  components: { RankContent },
  data() {
    return {
      current_type_id: 0
    };
  },
  computed: {
    ...mapGetters(["trueTagBookMaps"])
  },
  async mounted() {
    //轮循所有类型，对没有内容返回的将tag置为false, 存储返回结果
    if (this.trueTagBookMaps.length === 0) {
      await this.$store.dispatch("initTypeMap");
      await this.$store.dispatch("firstLoad");
    }
  },
  methods: {
    onChange(newId) {
      this.current_type_id = newId;
    },
    async changeTab() {
      await this.$store.dispatch("addTypeBook", this.current_type_id);
    }
  }
};
</script>

<style lang="scss">
#Ranklist {
  height: 100%;
  width: 100%;

  .el-tabs {
    width: 100%;
    height: 100%;
    .el-tabs__content {
      height: 100%;
      overflow: auto;
      .el-tab-pane {
        height: 100%;
      }
    }
    .rank-content {
      height: 100%;
    }
  }
}
</style>
