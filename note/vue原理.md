### 三大核心系统
- compiler (编译模板系统)
- runtime模块（界面渲染）
  源码位置
   - runtime-core
   - runtime-dom
   - runtime-test

- reactivoty (响应式系统)
   - 源码位置  reactivity
   - 数据变化后会形成一个新的节点， 然后新旧节点对比（diff算法）， 然后进行打补丁(patch)

---

#### mount 简单实现

```javascript
const h = function(tag, props, children) {
   // VNode -> javascript 对象(虚拟dom)

   return {
      tag,
      props,
      children
   }
}

const mount = function(vnode, container) {
   const {
      tag,
      props,
      children
   } = vnode;

   // 1. 创建真实元素， 并且在vnode上进行保留
   const el = vnode.el = document.createElement(tag);

   // 2. 处理props
   if(props) {
      for(const key in props) {
         const value = props[key];

         if(key.startsWith('on')) {
            el.addEventListener(key.slice(2).toLowerCase(), value)
         } else {
            el.setAttribute(key, value)
         }
      }
   }

   // 3. 处理children(这里只做原生html元素判断)
   if(children) {
      if(typeof children === 'string') {
         el.textContent = children;
      } else {
         children.forEach(item => mount(item, el))
      }
   }


   // 4. 挂载el 至container
   container.appendChild(el);
}

```

- 使用
```javascript
    // 1. 通过h创建一个 VNode
    const vnode = h(
      'div', 
      {
        class: 'cqc'
      },

      [
        h('h2', null, '当前计数：100'),
        h('button', {
          onClick: function() {
            console.log('cqc');
          }
        }, '+1')
      ]
    );

    // 2. 通过mount函数， 将vnode挂载到 div#app 上 (虚拟dom -> 真实dom)
    mount(vnode, document.querySelector('#app'));

```