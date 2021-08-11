import { createApp } from 'vue';
import App from './App.vue';
import "animate.css";
import plugin from '@/myPlugins/plguinObject.js';
import router from '@/router';
import store from '@/store';
import less from 'less'
import '@/style/index.less'; 


const app = createApp(App)

app.mixin({
  data() {
    return {
      globalMag: '这个是全局混入的消息, 任意组件内可以使用'
    }
  },
})
app.use(router);
app.use(less)
app.use(store);
app.use(plugin);

app.mount('#app');
