import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ToastService from 'primevue/toastservice';

import 'primeicons/primeicons.css'
import "./style.css";

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);

app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});
app.use(router);
app.use(pinia);
app.use(ToastService);
const toastInstance = app.config.globalProperties.$toast;
app.mount("#app");
export { toastInstance };