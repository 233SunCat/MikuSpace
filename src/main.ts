import { createApp } from 'vue'
import './style.css'
import nyaContainer from './components/UI/nya-container.vue';
import App from './App.vue'

createApp(App)
.component('nya-container', nyaContainer)
.mount('#app')
