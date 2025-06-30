<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteBook, getBook } from "../api/books.js";

const route = useRoute();
const router = useRouter();
const book = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchBook = async () => {
  loading.value = true;
  error.value = null;
  try {
    book.value = await getBook(route.params.id);
  } catch (e) {
    error.value = "書籍の取得に失敗しました";
  } finally {
    loading.value = false;
  }
};

const handleDelete = async () => {
  const confirmed = confirm("この書籍を削除してもよろしいですか？");
  if (!confirmed) return;
  try {
    await deleteBook(route.params.id);
    alert("削除しました");
    router.push({ name: "BookList" });
  } catch (e) {
    alert("削除に失敗しました");
  }
};

onMounted(fetchBook);
</script>

<template>
  <div>
    <div v-if="loading">読み込み中…</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="book">
      <h2>{{ book.title }}</h2>
      <p>著者: {{ book.author }}</p>
      <p>説明: {{ book.description || "（説明なし）" }}</p>
      <span v-if="book.status">&nbsp;[{{ book.status.name }}]</span>
      <button @click="$router.back()">＜ 戻る</button>
      <button @click="handleDelete">削除</button>
    </div>
    <div v-else>
      <p>書籍が見つかりません。</p>
    </div>
  </div>
</template>
