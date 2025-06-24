<script setup>
import { onMounted, ref } from "vue";
import { getBooks } from "../api/books";

const books = ref([]);

onMounted(async () => {
  books.value = await getBooks();
});
</script>

<template>
  <div>
    <h2>書籍一覧</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }} - {{ book.author }}
      </li>
    </ul>
  </div>
  <router-link to="/create">書籍追加</router-link>
</template>
