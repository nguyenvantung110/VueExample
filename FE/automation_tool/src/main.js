import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import spinner from './components/modules/common-modules/spinner.vue'

createApp(App)
    .use(router)
    .mount('#app')