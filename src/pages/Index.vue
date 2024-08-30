<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../stores/movies';
import { onMounted } from 'vue'
import Card from '../components/Card.vue';

const movieStore = useMovieStore();
const { trendingMovies,paginator } = storeToRefs(movieStore);

onMounted(() => {
  movieStore.getTrending(); 
});

interface ObservedElement extends HTMLElement {
  _observer?: IntersectionObserver;
}

const vIntersection = {
  mounted(el: HTMLElement) {
    const options = {
      root: null, 
      rootMargin: "0px",
      threshold: 0.1 
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      const movieStore = useMovieStore();
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          paginator.value.currentPage = paginator.value.currentPage + 1
          movieStore.getTrending();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  unmounted(el: HTMLElement) {
    const observedEl = el as ObservedElement;

    if (observedEl._observer) {
      observedEl._observer.unobserve(observedEl);
      delete observedEl._observer;
    }
  }
};

</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen p-6">
    <h1 class="text-4xl font-bold mb-8">Tendencias de la semana</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="movie in trendingMovies" :key="movie.id" class="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
        <Card :movie="movie" />
      </div>

      <!-- Punto de referencia -->
      <div v-intersection="() => console.log(123)"></div>
    </div>
  </div>
</template>
