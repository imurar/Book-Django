<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createBook } from "../api/books";

const title = ref("");
const author = ref("");
const router = useRouter();

const handleSubmit = async () => {
  await createBook({ title: title.value, author: author.value });
  router.push({ name: "BookList" });
};
</script>

<template>
  <div>
    <h2>書籍を追加</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="title" placeholder="タイトル" required />
      <input v-model="author" placeholder="著者" required />
      <button type="submit">追加</button>
    </form>
    <router-link :to="{ name: 'BookList' }">戻る</router-link>
  </div>
</template>
