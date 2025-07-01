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

// 単一の書籍取得
export const getBook = async (id) => {
  const response = await axios.get(`${API_BASE}${id}/`);
  return response.data;
};

// 書籍情報を部分的に更新(PATH)する処理
export const updateBook = async (id, data) => {
  const response = await fetch(`${API_BASE}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("書籍の更新に失敗しました。");
  }
  return await response.json();
};
