# ***study vue3 compositionApi***
##  **v-model**


  ```html
    <Component-A v-model="msg" />
  ```

### 在 vue2.x 中， 在自定义组件中

```javascript
  {
    props: {
      myValue: {
        type: String,
        default: ''
      }
    },

    model: {
      prop: 'myValue',
      event: 'update:myValue'  // 自定义派发的事件名字, emit('update:myValue', newValue)
    }
  }
```

### 在vue3.x 版本中

```javascript
/* 
    在此组件内更新 modelValue 值的时候，
    固定派发事件名称 update:modelValue
*/
{
  props: {
    modelValue: {
      type: String, // 固定prop属性名字
      default: ''
    }
  }
}
```

#### 自定义组件内部同样使用v-model了上面的 modelValue 的值,(自定义组件内部) 

```html
  <Component-B v-model="value" />
```
      
```javascript 
 {
   props: {
    modelValue: {
      type: String, // 固定prop属性名字
      default: ''
    }
  },

  computed: {
    value: {
      get() {
        return this.modelValue
      },

      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
 }
```

### 自定义组件定义多个v-model

```html
  <Component-C 
      v-model:value="value"
      v-model:title="title"
  />
```

```javascript
{
  props: {  // 在它们需要更新数据时候 派发事件 emit('update: propName', newValue)
    value: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    }
  }
}
```

--- 
## 动画 transition

### 作用于单个元素|组件
> vue有全局内置的组件 transition

```html
  <transition name="cqc">
    <Component-A />
  </transition>
```
> 使用 transition 包裹**某一个**组件或元素, 并且给transition设置一个 '**name**' 的attribute, 之后就可以去css内自定义动画过渡效果
如果transition没有设置name 那么css类将会以v-为前缀
  
```less
// 这里的cqc即为上面的自定义的name(类名是vue给取好的),是vue自动给拼接的
.cqc-enter-from,
.cqc-leave-to {
  opacity: 0;
}

.cqc-enter-to,
.cqc-leave-from {
  opacity: 1;
}

.cqc-enter-active,
.cqc-leave-active {
  transition: opacity 1s ease;
}
```
- #### transition的类名（常用）
-
   - **v-enter-from**
   进入过渡的开始状态  
   在元素被插入之前生效， 插入之后的下一帧移除
-
   - **v-enter-active** 
  进入过渡生效时的状态 
  在整个进入过渡阶段中使用 在元素被插入之前生效 在过渡|动画完成后移除； 通常这个类名被用来定义进入过渡的过程事件、延迟、曲线函数
-
   - **v-enter-to**
   定义进入过渡的结束状态 
   在元素被插入的下一帧生效（此时v-enter-from被移除），在过渡|动画完成之后移除
-
   - **v-leave-from**
   定义离开过渡的开始状态 
   在离开过渡被触发时候立刻生效 下一帧移除
-
   - **v-leave-active**
   定义离开过渡生效时候的状态 
   在离开过渡被触发时候立刻生效  在整个过渡阶段中应用 在完成过渡|动画后移除 通常这个类名被用来定义离开过渡的过程事件、延迟、曲线函数
-
   - **v-leave-to**
   离开过渡的结束状态 
   在离开过渡被触发的下一帧生效（此时v-leave-from被移除)， 在过渡|动画完成后移除


> **tip: 触发条件**
>- 条件渲染 v-if v-show
>- 动态组件
>- 组件根节点

#### 原理
- 当插入|删除包含在transition组员中的元素时, vue会：
   -  检查目标元素是否应用了css过渡动画， 如果有， 将在恰当时机添加|删除对应css类名
   - 如果transition组件提供了js钩子函数， 这些钩子函数将在恰当时机被调用
   - 如果没找到对应的css过渡动画或者对应的js钩子函数， dom插入|删除将立刻执行
--- 

![](https://img2.baidu.com/it/u=851178854,1709478981&fm=26&fmt=auto&gp=0.jpg, '狗崽')

#### 过渡动画的使用

过渡和动画可以同时一起使用 (一般用的比较少)
>这时候需要在 \<transition\> 组件上设置 type
>有效值为 "transition" 和 "animation"

- transition 过渡
- animation 动画
```less
  .cqc-enter-active {
    animation: cqcBounce .6s ease reverse; 
  }

  .cqc-leave-active {
    animation: cqcBounce .6s ease reverse;  //reverse 表示反转动画 0 -> 100%  turn to 100% -> 0
  }

  .cqc-enter-from,
  .cqc-leave-to {
    opacity: 0;
  }


  .cqc-enter-active,
  .cqc-leave-active {
    transition: opacity .5s ease;
  }

  


  @keyframes cqcBounce {
    0% {
      transform: scale(0)
    },

    100% {
      transform: scale(1)
    }
  }
```

#### transition mode（常用）
当一个\<transition\>组件内包裹了如下组件时候
组件的进入和离开动画是同时进行的（两个组件的动画同一时间进行）
```html
  <transition>
    <component-a v-if="flag" />
    <component-b v-else />
  </transition>
```

如果想等一个动画结束后在执行另一个
可以在\<transition\> 上面设置 mode 属性
有效的模式有 "out-in" 和 "in-out"


> **\<transition\>属性整理**
> - name
动画拼接的类名的开头
> - appear
是否在页面初始化的时候就开始执行动画
> - type
在动画和过渡同时使用时候（时间不同）指定是以哪个属性的时间为准
> - mode
有效的value有 "out-in" 和 "in-out"
> - duration
设置动画或过渡的执行时间，设置之后css内设置的时间将失效
> - enter-active-class
注意（如果同时使用自定义class 和 name， 自定义class优先） 
自定义进入的动画的类
> - leave-active-class
自定义离开的
> - ...(官网)
> - 还有很多钩子函数(transition 生命周期)

#### animate.css
yarn add animate.css
main.js  -> import "animate.css"
即可食用
**注意：** 官网上面的示例的名字是animate定义好的动画
直接在css 内直接调用该动画即可 
> example:  

```css
animation: 动画名 1s ease;
animation-direction: reverse;  // 反转动画
```

### transition-group
```html
<!-- tag 表示用什么元素来包裹 transition-group底下的子元素 -->
  <transition-group
    name="cqc"
    tag="p" 
  >
  <span class="item" v-for="...." ...>
    ...
  <span>
  </transition-group>
```
```less
  .item {
    display: inline-block;
  }

  // 局部变动的动画
  .cqc-enter-from,
  .cqc-leave-to {
    opacity: 0;
    transform: translateY(30px)
  }

  .cqc-enter-active,
  .cqc-leave-active {
    transition: all .5s ease;
  }

  .cqc-leave-active {  // 列表某项执行消失动画（不让它占据位子 妨碍其他项的位移）
    position: absolute;
  }

  // 整体变动的动画（如果transition-group 没有name属性 那么它叫 v-move）
  .cqc-move {  // 
    transition: transform .5s ease;
  }

```

