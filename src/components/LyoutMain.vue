<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import Header from './Header.vue';
import { RouterView, useRoute } from 'vue-router';

const authStore = useAuthStore()
const route = useRoute()

const {
//   token,
} = storeToRefs(authStore)
</script>

<template>
  <div>
    <Header />
    <transition name="fade">
      <RouterView :key="route.fullPath" />
    </transition>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>