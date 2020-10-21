import { axios } from "../lib";

export const getRecommendBooks = async (offset = 0, limit = 5) => {
  return axios.get(`/api/index?offset=${offset}&limit=${limit}`);
};

export const getSearchBook = async (qs = "") => {
  return axios.get("/api/search?q=" + qs);
};

export const getChosenBook = async (id = -1) => {
  return axios.get("/api/book/" + id);
};

export const getTypedBook = async (type_id = 0, offset = 0) => {
  return axios.get("/api/rank/" + type_id + "?offset=" + offset);
};

export const getExistsType = async () => {
  return axios.get("/api/rank/types/exists");
};
