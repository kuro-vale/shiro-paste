import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/shades-of-purple.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python'
import dart from 'highlight.js/lib/languages/dart'
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('dart', dart)

const app = createApp(App)

app.use(router)
app.use((hljsVuePlugin))

app.mount('#app')
