<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../stores/movies';
import AutoComplete from 'primevue/autocomplete';
import { Movie } from '../interfaces/Imovies';
import Tag from 'primevue/tag';
import { useRouter } from 'vue-router';

const api = import.meta.env.VITE_IMAGE_URL;
const movieStore = useMovieStore();
const router = useRouter();

const { moviesSeached, searchParams, currentSelected } = storeToRefs(movieStore);

const search = (e: { query: string }) => {
    searchParams.value.query = e.query;
    movieStore.search();
};

const select = (e: { value: Movie }) => {
    router.push(`/Detail/${e.value.id}`);
};
</script>

<template>
    <header class="bg-gray-900 text-white p-2 md:py-4">
        <nav class="container mx-auto flex flex-col md:flex-row gap-2 items-center justify-between">
            <!-- Título de la aplicación -->
            <router-link to="/">
                <h1 class="text-2xl font-bold">Aplicación de Películas Movie DB</h1>
            </router-link>

            <!-- Búsqueda de películas -->
            <div class="w-full md:w-2/3">
                <AutoComplete v-model="currentSelected" optionLabel="title" class="w-full" @option-select="select"
                    placeholder="Busca tu película..." :suggestions="moviesSeached" @complete="search" forceSelection
                    :panelClass="{ 'min-h-96': moviesSeached.length > 1, 'w-full': true }"
                    inputClass="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                    emptySearchMessage="No se encontró tu búsqueda...">
                    <template #option="{ option }: { option: Movie }">
                        <div class="flex items-start p-2">
                            <!-- Imagen -->
                            <div class="w-20 flex-shrink-0 mr-4 rounded-md overflow-hidden">
                                <img :src="`${api}/w500${option.poster_path}`" width="80" alt="" class="rounded-md" />
                            </div>

                            <!-- Texto -->
                            <div class="flex-1 text-sm md:text-base">
                                <h4 class="font-bold text-lg">{{ option.title }}</h4>
                                <div class="my-2 flex gap-2 flex-wrap">
                                    <Tag rounded :value="genre.name" v-for="genre in option.genres" :key="genre.id">
                                    </Tag>
                                </div>
                                <p class="text-gray-400 line-clamp-2">{{ option.overview }}</p>
                            </div>
                        </div>
                    </template>
                </AutoComplete>
            </div>
        </nav>
    </header>
</template>
