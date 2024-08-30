<script setup lang="ts">
import Toast from 'primevue/toast';
import { useMovieStore } from './stores/movies';
import LyoutMain from './components/LyoutMain.vue'
import { onMounted } from 'vue';

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.genres()
})
</script>

<template>
  <div>
    <LyoutMain />
    <Toast />
  </div>
</template>

<style scoped>

</style>
