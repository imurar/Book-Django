<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteBook, getBook, getStatuses, updateBook } from "../api/books.js";

const route = useRoute();
const router = useRouter();
const book = ref(null);
const loading = ref(true);
const error = ref(null);
const statuses = ref([]);

const fetchBook = async () => {
  loading.value = true;
  error.value = null;
  try {
    book.value = await getBook(route.params.id);
  } catch (e) {
    console.log(route.params.id);
    error.value = "書籍の取得に失敗しました";
  } finally {
    loading.value = false;
  }
};

const fetchStatus = async () => {
  try {
    statuses.value = await getStatuses();
  } catch (e) {
    statuses.value = [];
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

const handleStatusChange = async (event) => {
  const newStatusId = event.target.value;
  try {
    await updateBook(book.value.id, { status: newStatusId });
    await fetchBook(); // ステータス変更後に再取得
  } catch (e) {
    alert("ステータスの更新に失敗しました");
  }
};

//onMounted(fetchBook);
onMounted(async () => {
  await fetchBook();
  await fetchStatus();
});
</script>

<template>
  <div>
    <div v-if="loading">読み込み中…</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="book">
      <h2>{{ book.title }}</h2>
      <p>著者: {{ book.author }}</p>
      <p>説明: {{ book.description || "（説明なし）" }}</p>
      <div>
        <label>ステータス：</label>
        <select v-model="book.status.id" @change="handleStatusChange">
          <option v-for="s in statuses" :key="s.id" :value="s.id">
            {{ s.name }}
          </option>
        </select>
      </div>
      <button @click="$router.back()">＜ 戻る</button>
      <button @click="handleDelete">削除</button>
    </div>
    <div v-else>
      <p>書籍が見つかりません。</p>
    </div>
  </div>
</template>
