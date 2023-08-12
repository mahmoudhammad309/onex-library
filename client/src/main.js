import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import store from "./store";
import VueCookies from "vue-cookies";

loadFonts();

createApp(App)
  .use(VueCookies)
  .use(store)
  .use(router)
  .use(vuetify)
  .mount("#app");
