### 自定义指令

> **应用场景**
需要对dom元素进行底层操作， 这时候可以使用自定义指令;

- 自定义局部指令
 组件中通过 directives 选项
 ```javascript
 directives: {
   focus: {
     mounted(el) {
       el.focus();   
     }
   }
 }
 
 ```
- 自定义全局指令 
app的 directive 方法

```javascript
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

```

- 使用：组件中 直接 v-focus, v-focus可以动态的等于一个值

```html
<input v-focus="cqc" />
```
```javascript
 directives: {
   focus: {
     mounted(el. binding) {
       el.focus();   
       binding.value //  v-focus="cqc" 取到 'cqc'
     }
   }
 }

```

#### 自定义指令生命周期 
tip： 小括号内代表vue2.x时候的生命周期
- created (new)
 在绑定元素的 attribute 或事件监听 之前调用， 可以在这里做一些初始化操作
- beforeMount （bind）
  在指令第一次绑定父元素并且挂载前调用
- mounted （inserted）
  挂载到父元素之后调用
- beforeUpdate （new）
  更新组件的VNode之前调用
- updated （componentUpdate）
  更新组件的VNode之后调用
- beforeUnmount （new）
  组件卸载之前
- unmounted （unbind）
  卸载时调用