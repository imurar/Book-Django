import axios from "axios";

const API_BASE = "http://localhost:8001/api";

// 書籍一覧を取得
export const getBooks = async () => {
  const response = await axios.get(`${API_BASE}/books/`);
  return response.data;
};

// 書籍を追加
export const createBook = async (book) => {
  const response = await axios.post(`${API_BASE}/books/`, book);
  return response.data;
};

// 書籍を削除
export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_BASE}/books/${id}/`);
  return response.data;
};

// 単一の書籍取得
export const getBook = async (id) => {
  const response = await axios.get(`${API_BASE}/books/${id}/`);
  return response.data;
};

// 書籍情報を部分的に更新(PATH)する処理
export const updateBook = async (id, data) => {
  try {
    const response = await axios.patch(`${API_BASE}/books/${id}/`, data);
    return response.data;
  } catch (error) {
    throw new Error("書籍の更新に失敗しました。");
  }
};
