### 全局状态管理 Vuex

状态管理器： redux vuex flux ...

#### 安装
1. npm install vuex@next
2. 
```javascript
  // ./store/index
  import { createStore } from 'vuex'

  const store = createStore({
    // 传入一个类似data的函数
    state() { 
      return {
        counter: 3
      }
    },

    mutations: {
      increment(state, payload) {
        state.counter ++;
      }
    }
  });

  export default store;


  // main.js
  import store from '@/store'
  app.use(store)
```

#### 模块介绍
- mutations
 修改 state 的唯一途径
- actions
- state
- getters


- modules
modules又包括了前面几个模块
使用


```javascript
{
  state: () => ({}),

  mutations: {
    myMutations(state, payload) {}
    /* 
        // 两种不同提交风格
        store.commit('myMutations', { name: 'cqc' })
        store.commit({
          type: 'myMutations',
          name: 'cqc'
        })
    */
  },

  actions: {
    myActions(ctx, payload) {
      const { commit, dispatch, state, getters, rootState, rootGetters } = ctx;

      // 可以有返回值
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({name: 'cqc'}) // dispatch('myActions', payload).then(...)
        }, 200)
      })


      /* 
          setup() {
            const store = useStore();

            ...
            const { myActions } = mapActions(['myActions']);
            myActions.call({ $store: store, payload})
            ...

            // 两种不同提交风格
            store.dispatch('myActions', { name: 'cqc' })
            store.dispatch({
              type: 'myActions',
              name: 'cqc'
            })
          }
      
      */
    }
  },

  getters: {
    // store.getters.myGetters
    myGetters(state, getters, rootState, rootGetters) {}
  },


  modeles: {
    moduleA: {  // store.state.a
      namespaced: true,
      state,  
      mutations,
      actions,  // dispatch('moduleA/xxx')
      getters: {
        // 在模块
      }
    } 
  }
}

```

#### mapState使用(opintion api中)
```javascript
import {
  mapState,  // 映射 state  computed中使用 

  mapGetters,  // 映射 getters  computed中使用  mapGetters(['key']) || mapGetters({ newKey: key })

  mapMutations,  // 映射 mutations methods中使用  用法同 mapGetters
  mapActions,  // 映射 actions methods中使用   用法同 mapGetters

} from 'vuex'

{
  computed: {
    // 数组写法 快速获取state中的内容
    ...mapState(
      [
        'counter'  // state 中的key, 之后直接 this.counter 访问
      ]
    ),


    // 对象写法 (可以重新命名属性名字)
    ...mapState(
      {
        // 传入一个回调函数 之后 this.sCounter 访问
        sCounter: state => state.counter
      }
    )
  }
}
```


#### mapState使用(composition Api中)
```javascript
import { computed } from 'vue';
import { mapState, useStore } from 'vuex;

{
  setup() {
    const store = useStore();
    const storeStateGets = mapState(
      {
        myName: state => state.name,
        myCounter: state => state.counter
      }
    );

    const storeState = {};
    Object.keys(storeStateGets).map(key => {
      const getFn = storeStateGets[key].bind({ $store: store });
      storeState[key] = computed(getFn);
    });


    return {
      ...storeState
    }
  }
}
```



#### modules 使用
```javascript

// store
const moduleA = {
  namespaced: true, // 不设置 true 则会把 moduleA 中的内容合并到root中（无法区分该属性来自哪个模块， 也可能会造成同明冲突）

  state: () => ({
    myName: '我是moduleA'
  }),

  mutations: {
    increment() {
      ...
    }
  },

  actions: {
    incrementAsync() {
      ...
    },

    // 调用 root 中的方法
    useRootMutation(ctx) {
      const { commit } = ctx;
      const payload = 0;

      commit('resetCounter', payload, { root: true })
    }
  }
}

{
  state: () => ({
    counter: 100,
  }),

  mutations: {
    resetCounter(state, n) {
      state.counter = n;
    },
  },

  modules: {
    moduleA
  }
}

// ----------------


// 使用(namespaced: true 时候) 
// optionApi
{
  methods: {
    btnClick() {
      this.$store.state.moduleA.myName;  // 获取 moduleA 的state
      this.$store.getters['moduleA/getName'];  // 获取 moduleA 的getters
      this.$store.commit('moduleA/increment');  // 执行该模块下 mutations 方法
      this.$store.dispatch('moduleA/incrementAsync');  // 执行该模块下 actions 方法


      this.$store.dispatch('moduleA/useRootMutation');  // 在该模块下 执行根模块方法
    }
  }
}


// 辅助函数在 modules 中的应用  (其他 同理)
import { mapMutations, createNamespacedHelpers } from 'vuex';

const { mapMutations: helperMapMutations } = createNamespacedHelpers('moduleA');

// option Api
{
  methods: {
    btnClick() {
      // 写法1
      this.moduleAIncrement(payload);

      // 写法2
      this['moduleA/increment'](payload);

      // 写法3
      this.increment(payload);

      // 写法4
      this.helperIncrement(payload)
    },
    
    // 写法1
    ...mapMutations({
      moduleAIncrement: 'moduleA/increment'
    }),
    
    // 写法2
    ...mapMutations(
      ['moduleA/increment']
    ),

    // 写法3 （感觉这个方便些）
    ...mapMutations(
      'moduleA',
      ['increment']  // 数组、对象均可
    ),

    // 写法4
    ...helperMapMutations(
      {
        helperIncrement: 'increment'
      }
    )
  }
}


// composition Api
{
  setup() {
    
  }
}
// ----------------------------
```