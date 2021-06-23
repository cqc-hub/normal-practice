# ***study vue3 compositionApi***

##  **1.自定义组件中使用 v-model**


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

#### 如果在自定义组件内部同样使用v-model了上面的 modelValue 的值,则(自定义组件内部) 

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

### 如果一个自定义组件需要定义多个v-model 则

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
