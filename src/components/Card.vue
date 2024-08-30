<script lang="ts" setup>
import Rating from 'primevue/rating';
import { defineProps, onMounted, ref } from 'vue';
import { Movie } from '../interfaces/Imovies';

const api = import.meta.env.VITE_IMAGE_URL;

const props = defineProps<{
  movie: Movie;
}>()

let rating = ref<string | null>(null);

onMounted(() => {
    rating.value = (props.movie.vote_average / 2).toFixed(1);
});

</script>

<template>
    <div>
        <router-link :to="`/Detail/${movie.id}`">
            <!-- Imagen de Fondo -->
            <div class="relative h-60">
                <img :src="`${api}/w500${movie.backdrop_path}`" alt="Movie Image"
                    class="w-full h-full object-cover opacity-80">
                <div class="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            <!-- Contenido -->
            <div class="p-4">
                <h3 class="text-2xl font-bold">{{ movie.title }}</h3>
                <p class="text-gray-400 text-sm mb-4">{{ movie.release_date }}</p>

                <!-- Rating -->
                <div class="flex items-center mb-4">
                    <Rating v-model="rating" readonly :stars="5" :cancel="false" class="mr-2" />
                    <span>{{ (movie.vote_average / 2).toFixed(1) }}</span>
                </div>

                <!-- Descripción -->
                <p class="text-gray-300 text-sm line-clamp-3">{{ movie.overview }}</p>
            </div>
        </router-link>
    </div>
</template>

<style scoped></style>