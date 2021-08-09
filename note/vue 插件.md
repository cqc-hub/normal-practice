### Vue插件

通常我们向vue全局添加一些功能时候， 会采用插件的模式 ，又有两种编写方式

1. 对象类型
  一个包涵install函数的对象， 该函数会在安装插件时候执行

2. 函数类型
  一个函数， 该函数会在安装插件时候自动执行



```javascript
// object 类型插件
const objectPlugin = {
  install(app) {
    // 在通过Vue.use(plugin) 的时候会回调 install 方法， 默认传入app对象， 可通过此对象设置一些全局方法、组件等等, 比如这里是传入了一个全局的属性
    app.config.globalProperties.$name = 'cqc';
  }
} 


const functionPlugin = function(app) {
  app // 同 objectPlugin install 中的app
}

// main.js
app.use(objectPlugin);
```

```javascript
import {
  getCurrentInstance
} from 'vue';


export default {
  // optionApi中访问
  mounted() {
    this.#name  // cqc
  },


  setup() {
    // compositionApi 访问
    const instance = getCurrentInstance();
    const global = instance.appContext.config.globalProperties;

    global.$name // cqc
  }
}

```