import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { Notify, Quasar } from 'quasar'
import quasarLang from 'quasar/lang/pt-BR'
import App from './App.vue'
import router from './router'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(router)

app.use(VueQueryPlugin)

app.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {
    notify: {
      position: 'top-right',
      timeout: 2000,
    },
  },
  lang: quasarLang,
})

app.mount('#app')
