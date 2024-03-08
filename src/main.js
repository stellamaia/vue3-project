import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(Particles, {
    init: async (engine) => {
      await loadSlim(engine);
    },
  })
  .mount('#app')
