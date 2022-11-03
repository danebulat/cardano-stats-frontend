import { createApp } from 'vue'
//import './style.css'

import router      from './router'
import AppLink     from './components/AppLink.vue'
import ElementPlus from 'element-plus'
import App         from './App.vue'

createApp(App)
  .component('AppLink', AppLink)
  .use(ElementPlus, { size: 'default', zIndex: 2000 })
  .use(router)
  .mount('#app');
