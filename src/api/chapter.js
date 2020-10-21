import { axios } from "../lib";

export const getChpatersSummary = async (
  book_id = -1,
  offset = 0,
  limit = 10
) => {
  return axios.get(
    `/api/chapter?book_id=${book_id}&offset=${offset}&limit=${limit}`
  );
};

export const getChapterContent = async (bookId = -1, chapterIndex = -1) => {
  if (bookId === -1 || chapterIndex === -1) {
    throw Error("参数错误");
  }
  return axios.get(`/api/chapter/${chapterIndex}?book_id=${bookId}`);
};
