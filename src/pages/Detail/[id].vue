<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useMovieStore } from '../../stores/movies';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const url = import.meta.env.VITE_IMAGE_URL;
const route = useRoute();
const movieStore = useMovieStore();

const { movieDetail } = storeToRefs(movieStore);
let rating = ref<string | null>(null);

onMounted(() => {
  movieStore.show(Number(route.params.id)).then(() => {
    if (movieDetail.value) {
      rating.value = (movieDetail.value.vote_average / 2).toFixed(1);
    }
  });
});
</script>

<template>
  <div v-if="movieDetail" class="relative bg-gray-900 text-white p-6 min-h-screen flex items-center justify-center">
    <!-- Fondo de la Imagen -->
    <div class="absolute inset-0 overflow-hidden">
      <img
        :src="`${url}/original${movieDetail.backdrop_path}`"
        alt="Movie Backdrop"
        class="w-full h-full object-cover opacity-50"
      />
    </div>

    <!-- Contenido Principal -->
    <div class="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg">
      <!-- Imagen del Poster -->
      <div class="w-full md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
        <img
          :src="`${url}/original${movieDetail.poster_path}`"
          alt="Movie Poster"
          class="w-[80%] md:w-full h-auto rounded-lg shadow-md"
        />
      </div>

      <!-- Detalles de la Película -->
      <div class="w-full md:w-2/3 md:ml-8 text-center md:text-left">
        <h1 class="text-4xl font-bold mb-4">{{ movieDetail.title }}</h1>

        <!-- Generos -->
        <div class="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
          <Tag 
            v-for="genre in movieDetail.genres"
            :key="genre.id" severity="secondary" :value="genre.name"></Tag>
        </div>

        <!-- Rating y Fecha de Lanzamiento -->
        <div class="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start mb-6">
          <p class="text-sm">{{ movieDetail.release_date }}</p>
          <Rating v-model="rating" readonly :stars="5" cancel="false" />
        </div>
        
        <p class="text-base mb-6 leading-relaxed">{{ movieDetail.overview }}</p>

        <!-- Botones de Acción -->
        <div class="flex space-x-4 justify-center md:justify-start">
          <a :href="movieDetail.homepage">
            <Button label="Ver" icon="pi pi-play" class="p-button-success p-button-rounded" />
          </a>
          <!-- <Button label="More Info" icon="pi pi-info-circle" class="p-button-info p-button-rounded" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Asegúrate de que el fondo esté bien escalado y no se recorte en pantallas pequeñas */
.relative img {
  object-position: center;
}

.max-w-5xl {
  max-width: 80rem;
}

.leading-relaxed {
  line-height: 1.75;
}
</style>
