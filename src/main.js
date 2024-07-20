import { createApp } from 'vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { Notify, Quasar } from 'quasar'
import quasarLang from 'quasar/lang/pt-BR'
import App from './App.vue'
import router from './router'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)

export const vueQueryOptions = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    },
  },
})

app.use(router)

app.use(VueQueryPlugin, { queryClient: vueQueryOptions })

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
