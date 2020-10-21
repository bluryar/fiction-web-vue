import Vue from "vue";
import Vuex from "vuex";

import {
  getRecommendBooks,
  getChosenBook,
  getTypedBook,
  getExistsType
} from "../api/book";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recommendBooks: [],
    chosenBook: null,
    loadingChapters: [],
    TYPE_MAP: [
      {
        type_id: 0,
        type_name: "全部分类",
        tag: false,
        resource: [],
        offset: 0
      },
      { type_id: 1, type_name: "未分类", tag: false, resource: [], offset: 0 },
      { type_id: 2, type_name: "玄幻", tag: false, resource: [], offset: 0 },
      { type_id: 3, type_name: "奇幻", tag: false, resource: [], offset: 0 },
      { type_id: 4, type_name: "修真", tag: false, resource: [], offset: 0 },
      { type_id: 5, type_name: "仙侠", tag: false, resource: [], offset: 0 },
      { type_id: 6, type_name: "都市", tag: false, resource: [], offset: 0 },
      { type_id: 7, type_name: "青春", tag: false, resource: [], offset: 0 },
      { type_id: 8, type_name: "历史", tag: false, resource: [], offset: 0 },
      { type_id: 9, type_name: "穿越", tag: false, resource: [], offset: 0 },
      { type_id: 10, type_name: "网游", tag: false, resource: [], offset: 0 },
      { type_id: 11, type_name: "竞技", tag: false, resource: [], offset: 0 },
      { type_id: 12, type_name: "科幻", tag: false, resource: [], offset: 0 },
      { type_id: 13, type_name: "灵异", tag: false, resource: [], offset: 0 }
    ]
  },
  getters: {
    trueTagBookMaps: state => {
      return state.TYPE_MAP.filter(ele => ele.tag);
    }
  },
  mutations: {
    addResource(state, payload) {
      let { type_id, books } = payload;
      for (const map of state.TYPE_MAP) {
        if (map.type_id === type_id) {
          map.resource = [...map.resource, ...books];
        }
      }
    },
    updateOffset(state, payload) {
      let { type_id, offset } = payload;
      for (const map of state.TYPE_MAP) {
        if (map.type_id === type_id) {
          map.offset = offset;
        }
      }
    }
  },
  actions: {
    async getRecommendBooks({ state }, { offset, limit }) {
      const res = await getRecommendBooks(offset, limit);
      state.recommendBooks = res.data;
      return true;
    },

    async getChosenBook({ state }, { id }) {
      const res = await getChosenBook(id);
      state.chosenBook = res.data;
      return true;
    },

    async initTypeMap({ state }) {
      const res = await getExistsType();
      state.TYPE_MAP[0].tag = true;
      res.data.forEach(ele => {
        for (const map of state.TYPE_MAP) {
          if (ele.type === map.type_name) {
            map.tag = true;
          }
        }
      });
    },

    async firstLoad({ getters, dispatch }) {
      let maps = getters.trueTagBookMaps;
      let temp = [];
      for (const map of maps) {
        temp.push(dispatch("addTypeBook", { type_id: map.type_id }));
      }
      await Promise.all(temp);
    },

    async addTypeBook({ commit, getters }, { type_id }) {
      for (const map of getters.trueTagBookMaps) {
        if (map.type_id === type_id) {
          let res = await getTypedBook(map.type_id, map.offset);
          if (res.data.length !== 0) {
            commit("addResource", { type_id: map.type_id, books: res.data });
            commit("updateOffset", {
              type_id: map.type_id,
              offset: map.offset + res.data.length
            });
          }
        }
      }
    }
  },
  modules: {}
});
