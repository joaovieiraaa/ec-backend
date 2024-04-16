import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/app.vue";
import i18n from "@/i18n/i18n";
import router from "@/router";

import "./assets/scss/custom.scss";
import "metismenujs/sass";

import Template from "@/template/template.vue";
import Topbar from "@/template/includes/topbar/topbar.vue";
import Sidebar from "@/template/includes/sidebar/sidebar.vue";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import Primetable from "@/components/forms/primetable/primetable.vue";

import InputLangs from "./components/forms/input-langs/input-langs.vue";
import InputColor from "./components/forms/input-color/input-color.vue";
import InputImage from "./components/forms/input-image/input-image.vue";
import InputImageGallery from "./components/forms/input-image-gallery/input-image-gallery.vue";
import InputSlug from "./components/forms/input-slug/input-slug.vue";
import InputText from "./components/forms/input-text/input-text.vue";
import InputTextarea from "./components/forms/input-textarea/input-textarea.vue";

const app = createApp(App);

app
  .use(PrimeVue)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .component("main-template", Template)
  .component("topbar", Topbar)
  .component("sidebar", Sidebar)
  .component("primetable", Primetable)
  .component("input-langs", InputLangs)
  .component("input-color", InputColor)
  .component("input-image", InputImage)
  .component("input-image-gallery", InputImageGallery)
  .component("input-slug", InputSlug)
  .component("input-text", InputText)
  .component("input-textarea", InputTextarea)
  .mount("#app");
