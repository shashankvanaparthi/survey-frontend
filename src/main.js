import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"
import store from "./store"
import { FontAwesomeIcon } from './plugins/font-awesome'
//loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .component("font-awesome-icon",FontAwesomeIcon)
  .mount('#app')
