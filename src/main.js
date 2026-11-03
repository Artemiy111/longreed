import './styles/fonts.css'
import {createApp} from 'vue'
import {MotionPlugin} from '@vueuse/motion'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.vue'
createApp(App).use(MotionPlugin).mount('#app')
