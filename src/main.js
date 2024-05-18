import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/pt-BR'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(router)

app.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    notify: {
      position: 'top-right',
      timeout: 2000
    } 
  },
  lang: quasarLang
})

app.mount('#app')
