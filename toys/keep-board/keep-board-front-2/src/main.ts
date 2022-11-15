import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import GoogleSignInPlugin from "vue3-google-signin"
import './assets/main.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(GoogleSignInPlugin, {
    clientId: "643332836412-9o4lbidm9e1th1um834fhd9jd8hvbhun.apps.googleusercontent.com",
});

app.mount('#app')
