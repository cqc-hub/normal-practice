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
  
```less
// 这里的cqc即为上面的自定义的name(类名是vue给取好的)
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
<img title="狗崽" src="https://img2.baidu.com/it/u=851178854,1709478981&fm=26&fmt=auto&gp=0.jpg" />
