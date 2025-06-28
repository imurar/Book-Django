<script setup>
import { onMounted, ref } from "vue";
import { deleteBook, getBooks } from "../api/books.js";

const books = ref([]);

const fetchBooks = async () => {
  books.value = await getBooks();
};

const handleDelete = async (id) => {
  const confirmed = confirm("この書籍を削除してもよろしいですか？");
  if (!confirmed) return;

  try {
    await deleteBook(id);
    await fetchBooks(); // 再取得してリスト更新
  } catch (error) {
    console.error("削除エラー:", error);
    alert("削除に失敗しました");
  }
};

onMounted(fetchBooks);
</script>

<template>
  <div>
    <h2>書籍一覧</h2>
    <router-link to="/create">＋ 書籍を追加</router-link>

    <ul v-if="books.length > 0">
      <li v-for="book in books" :key="book.id">
        {{ book.title }} - {{ book.author }}
        <button @click="handleDelete(book.id)">削除</button>
      </li>
    </ul>
    <p v-else>登録されている書籍はありません。</p>
  </div>
</template>
