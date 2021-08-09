#### **全局混入 mixin**

全局混入将会影响每一个组件

```javascript
  // main.js
  const app = createApp(App);
  app.mixin({
    data() {
      return {
        globalMsg: '这是全局混入的消息'
      }
    }
  })
```

> **extend**
> - 类似mixins
多个组件之间依赖一个相同的方法 如下：
```javascript
  import CommonComponent from './common/CommonComponent.vue';
  export default {
    extends: CommonComponent  // 之后即可使用CommonComponent组件中的属性(感觉和 mixin 一模一样)
  }

```


#### setup
> **<span style="color: red;"><u>注意</u>:</span>**
- setup里面没有绑定this
- 如果在 CompositionApi（setup） 内定义的属性与 OptionApi 内定义的属性冲突了  优先采用 CompositionApi 内定义的属性 ??(实际操作起作用的是optionApi)
```javascript
  setup(props, ctx) {
    // ctx 常用属性
    const {
      slots,  // 插槽
      attrs,  // 挂载在元素上面的非 props 的 attribute
      emit    // 事件
    } = ctx;
  }
```

##### 响应式数据
```javascript 
import { ... } from 'vue'; 
```
###### - ref
---
###### - reactive
> 在能使用ref的情况下尽量使用ref 而不是reactive，
why?  更容易抽取数据  （尤大大也是这么推荐）
---
###### - isProxy
---
###### - isRef
> 判断变量是否由 **ref** 创建的, boolean
---
###### - readonly
> 判断变量是否是由 **reactive | readonly** 创建的, boolean
---
###### - isReactive 
> 判断变量是否由 **reactive** 创建的, boolean
(如果该变量是readonly包裹了reactive, 仍然返回true)

---
###### - toRaw
>返回reactive 或 readonly 代理的原始对象(谨慎使用)
---
###### - **toRefs**(常用)
>传入解构的的对象必须是reactive对象
解构了某一响应式数据后， 使得解构出来的数据依然是响应式数据
(将reactive对象的**所有属性**转成ref， 建立连接)
```javascript
const {
  name,
  age
} = toRefs(reactive({name: 'cqc', age: 24}))
// 之后通过 xxx.value = newValue 来跟新值
```
###### - **toRef**
>和toRefs功能一样， 但是只转换其中的某一个属性
```javascript
const info = reactive({
  age: 25
})

const age = toRef(info, age)
```



###### - shallowReactive
> 创建一个响应式代理数据（**浅层**， 只监听第一层）
---
###### - shallowRef
>创建一个响应式代理数据（**浅层**， 只监听第一层）, 之后如果在某一次想要刷新界面， 可以使用 triggerRef(),
triggerRef 接受一个ref类型数据 每调用一次可以刷新一次界面

---
###### - triggerRef
> 为 shallowRef 刷新视图， 执行与 shallowRef 关联的所有副作用(依赖)

---
###### - shallowReadonly
> 创建一个响应式代理数据, 他的第一层是只读的（**深层依然可读写**）


---
###### - unref
> 对ref类型的变量进行解包
获取一个ref引用中的value， 如果参数是一个ref则返回内部值， 否则返回本身

```javascript
val = isRef(val) ? val.value : val;
```



---
```javascript
import {
  ref,   // 传入基本变量类型
  reactive,  // 传入引用变量类型
  readonly
} from 'vue';

``` 
---
###### ref
获取基本类型的响应式数据
在模板中使用ref， vue会自动进行解包（自动添加ref.value（浅层解包））
```javascript

// 浅层解包
const counter = ref(100);
const info = {
  counter
} // 除非用reactive包裹info， 否则就是浅层解包
```

此时在template内
```html
<!-- 需要完整写下来(不会自动解包) -->
{{info.counter.value}}
```

---
###### reactive
获取引用类型的响应式数据

---
###### readonly
获取只读类型的响应式数据(在某些地方使用数据但是不希望修改数据)
这是一个**new Proxy**， 劫持了set方法

---
###### customRef
> 使用场景比较少， 一般用于组件库 , 创建一个自定义的ref（可自由控制 track、trigger）
> 需要配合工厂函数进行使用，该函数接受两个参数（track, trigger）
track: 追踪依赖 在get时候调用一下track();  
trigger: 更新视图 在set的时候调用一下trigger();
> 3. customRef 函数返回一个带有set、get 方法的对象
- example: 这里用一个防抖例子
  ```javascript
    const useDebounce(value, delay) {
      let timer = null;
      return customRef((track, trigger) => {
        return {
          get() {
            track();  // 收集依赖
            return value
          },

          set(newValue) {
            value = newValue;
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
              trigger();  // 更新视图
            }, delay)
            return true;
          }
        }
      })
    }


    setup() {
      return {
        text: useDebounce('这里做了延迟500毫秒操作', 500)
      }
    }
  ```
---
###### computed
> computed函数接收一个参数  该参数可以有两种形式
1.一个带有get、set函数的对象
2.直接一个get函数  

example: 
  ```javascript
    const state = ref('cqc');
    const computedTest = computed(() => state.value + 'computed');
    const computedTest2 = computed({
      get() {
        return state.value + 'computed'
      },

      set(newValue) {
        state.value = newValue;

        return true;
      }
    })
  ```

---
###### 侦听数据
Vue3 提供了两种侦听api

API | 说明
:--: | :--:
watch | 侦听数据变化后 执行一些操作
watchEffect | 刚开始时候立即执行一次， 收集里面的所有可响应式对象数据， 一旦这些数据发生改变 执行

**watch实例**
```javascript
  const name = ref('cqc');
  const state = reactive({
    name: 'cqc',
    fav: 'play-game',
    data: {
      io: '/td'
    }
  })


  // watch区分侦听两种响应式数据

  // 1. 被侦听的原始值类型是普通类型的
  watch(name, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  })

  // 2. 被侦听的原始值类型是引用类型的
  watch(() => ({...state}), (newValue, oldValue) => {
    // 如果state里还有引用数据属性， 那么newValue, oldValue内的这个属性仍然指向它们本身， 也就是说这些引用数据的newValue和oldValue相等
    console.log(newValue, oldValue);
  })

  //-------------

  // 侦听单个属性
  watch(() => state.name, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  })

  // 侦听多个数据源
  watch(
    [name, () => ({ ...state })],
    (newValue, oldVAlue) => {
      // 此时的newValue, oldValue 也将是一个数组  他们的下标与传入的数据源下标相对应

      [newName, newState] = newValue;
      [oldName, oldState] = oldValue;
    }
  )

  // watch配置项 第三个参数
  watch(
    () => ({ ...state }),
    (newValue, oldValue) => {},
    {
      deep: false,  // 是否深度监听
      immediate: false  // 是否立即执行（初始化的时候马上执行一次）
    }
  )

```

**watchEffect实例**
和watch区别
  无法拿到数据更新前的值, watch 可以
  watch 可以配置immediate是否马上执行 watchEffect一定会在初始化的时候就执行一次（采集副作用）
```javascript
  const state = reactive({
    name: 'cqc'
  })

  const watchEffectStop = watchEffect(
      // watchEffect 第一个参数
      (onInvalidate) => {
      // onInvalidate 会在副作用即将执行， 或则侦听器被停止时候执行里面的回调函数
      onInvalidate(() => {
        // 可以在这里做一些清理的工作
      })

      // 默认开始watchEffect会执行一次（收集里面的响应式数据， 一旦收集到的数据开始发生变化 执行）
      console.log('watchEffect', state.name);
    },

    // watchEffect 第二个参数
    {
      flush: 'pre'  
      /* 
        flush: 执行作用时机 可选值 pre  post  sync
         - pre: dom更新前执行  默认值  
         - post dom更新后执行
         - sync 强制同步执行（不建议使用）
      */
    }
  )


  if(someFlag) {  
    // 手动停止watchEffect的侦听
    watchEffectStop();
  }
```

---
###### 获取 组件|元素 实例
相当于vue2.x 中 this.$refs.xxx

```html
<Component-A  ref="ComponentA" />
```

```javascript
  setup() {
    // 在组件被更新后 ComponentA.value 会被vue自动赋值
    const ComponentA = ref(null);
    
    return {
      ComponentA
    }
  }
```

##### **生命周期钩子**

optionApi | compositionApi | 作用 
:--: | :--:| :--:| --
beforeCreate | setup | setup可以代替created、beforeCreated， 而且setup执行时机比他们还要早 |  
created | setup | 官方已经不推荐在created、beforeCreated 内操作了 |  
beforeMounted | onBeforeMounted
mounted | onMounted
beforeUpdate | onBeforeUpdate
updated | onUpdated
beforeUnmount | onBeforeUnmount
unmounted | onUnmounted
actived | onActived
deactivated | onDeactivated

---

##### provide & inject

> 往子孙组件注入数据, 子孙组件可以获取该数据
虽然在子孙组件内能够修改父组件provide的数据， 但是**极其不推荐**（不符合单向数据流原则）
这里可以使用readonly api进行包裹
```javascript 
  provide(key, readonly(value));  // 配合readonly 禁止子孙组件修改父组件数据


  //-----

  inject(key, defaultValue)
```