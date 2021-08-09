## Vue3中的 JSX 以及 jsx插槽的使用

 jsx可以让我通过javascript的方式便写模板
 如果需要在项目中使用jsx， 那么我们需要添加jsx的支持： 
  - jsx 我们通常会通过 babel 来进行转换（react 中也是如此）
  - 对于vue来说， 我们只需要在babel中配置对应插件即可（目前vue脚手架是默认支持的）

### 安装配置babel 支持vue jsx的插件
  1. npm install @vue/bael-plugin-jsx -D
  2. 在 babel.config.js 内配置

  ```javascript
  // babel.config.js
  modele.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ],

    plugins: [
      '@vue/babel-plugin-jsx'
    ]
  }
  
  ```

### jsx的使用

#### 基本使用
```javascript
import {
  ref
} from 'vue';

export default {
  name: 'ComponentA',
  setup() {
    const counter = ref(0);
    const btnClick = function() {
      counter.value++;
    }

    // 这里需要setup返回一个函数 函数内再返回jsx模板
    return () => {
      return (
        <div>
          <div>
            // 引用变量需在jsx中用 {} 包裹 
            当前计数: {
              counter.value
            }
          </div>

          <button onClick={btnClick}>btn</button>
        </div>
      )
    }
  }
}

```

#### jsx 插槽使用的几种方式

```javascript
import {
  h,
  defineComponent
} from 'vue';

```

```javascript
// 需要传递插槽的组件
const TestSlotComponent = defineComponent({
  name: 'TestSlotComponent',

  data() {
    return {
      propData: 'cqc'
    }
  },

  render() {
    // 基本我们定义的插槽都在这儿
    const { default: defaultSlot, headerSlot } = this.$slots;

    return (
      <div>
        <div>
          // 可以插槽内传递数据， 这也就是我们通常说的作用域插槽
          这里是headerSlot 
          { headerSlot && headerSlot(this.propData) }
        </div>


        <div>
          这里是默认插槽
          { defaultSlot && defaultSlot() }
        </div>
      </div>
    )
  }
})
```

```javascript
// 再另外组件中使用我们定义好的插槽
const UseSlotComponent = {
  name: 'UseSlotComponent',

  setup() {

    return () => {
      // 方式一
      const Test1 = (
        <Test-Slot-Component>
          <div>这里即为默认default插槽， 直接写入即可</div>
        </Test-Slot-Component>
      );


      const TestSlot2 = {
        default: () => {
          return (
            <div>
              默认插槽
            </div>
          )
        },

        headerSlot: props => {
          return (
            <div>
              自定义插槽 props 是作用域数据
              {
                props
              }
            </div>
          )
        }
      }

      
      // 方式二
      const Test2 = (
        <Test-Slot-Component>
          {
            TestSlot2
          }
        </Test-Slot-Component>
      )


      // 方式三
      const Test3 = (
        <Test-Slot-Component 
          v-slots={TestSlot2}
        />
      )

      // 方式四
      const Test4 = h(TestSlotComponent, null, TestSlot2)


      return (
        <div>
          { Test1 }   // 如果只使用default默认插槽
          { Test2 }  // 使用多个模板插槽
          { Test3 }  // 使用多个模板插槽
          { Test4 }  // 使用多个模板插槽
        </div>
      )
    }
  }
}
```
