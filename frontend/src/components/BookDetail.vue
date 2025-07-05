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
const statusUpdating = ref(false);

const fetchStatus = async () => {
  try {
    statuses.value = await getStatuses();
  } catch (e) {
    statuses.value = [];
  }
};

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

// ステータス変更用のローカル状態
const localStatusId = ref(null);

const handleStatusChange = async () => {
  if (!book.value || localStatusId.value === book.value.status.id) return;
  statusUpdating.value = true;
  try {
    await updateBook(book.value.id, { status_id: localStatusId.value });
    await fetchBook(); // ステータス変更後に再取得
    localStatusId.value = book.value.status.id;
  } catch (e) {
    alert("ステータスの更新に失敗しました");
    localStatusId.value = book.value.status.id;
  } finally {
    statusUpdating.value = false;
  }
};

//onMounted(fetchBook);
onMounted(async () => {
  await fetchBook();
  await fetchStatus();

  await nextTick();
  // books, statuses取得後、book のステータスを選択状態
  if (book.value && book.value.status) {
    localStatusId.value = book.value.status.id;
  }
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
        <select
          v-model="localStatusId"
          @change="handleStatusChange"
          :disabled="statusUpdating"
        >
          <option v-for="s in statuses" :key="s.id" :value="s.id">
            {{ s.name }}
          </option>
        </select>
        <span v-if="statusUpdating" style="margin-left: 8px">更新中...</span>
      </div>
      <button @click="$router.back()">＜ 戻る</button>
      <button @click="handleDelete">削除</button>
    </div>
    <div v-else>
      <p>書籍が見つかりません。</p>
    </div>
  </div>
</template>
