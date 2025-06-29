import axios from "axios";

const API_BASE = "http://localhost:8001/api/books/";

// 書籍一覧を取得
export const getBooks = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

// 書籍を追加
export const createBook = async (book) => {
  const response = await axios.post(API_BASE, book);
  return response.data;
};

// 書籍を削除
export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_BASE}${id}/`);
  return response.data;
};
