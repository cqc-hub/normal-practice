<template>
  <div>

    <h1>
      <div>
        {{c}}
      </div>
      {{testComputed}}-
      {{testComputed1}}
      <div>
        {{ inputText }}
      </div>
      <label for="#custom" title="">
        custom
      </label>
      <input id="custom" v-model="inputText" />
      
    </h1>
    <div>
      <button @click="btnClick">btn</button>
    </div>
    {{ p }}
  </div>
</template>

<script>
  import {
    shallowRef,
    triggerRef,
    ref,
    customRef,
    computed,
    // watch,
    watchEffect
  } from 'vue';

const useDebounceRef = function(value, delay) {
  let timer = null;

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value
      },

      set(newValue) {
        value = newValue;
        timer && clearTimeout(timer);

        timer = setTimeout(() => {
          trigger();
        }, delay);
      }

    }
  })
}

  export default {
    setup() {
      const p = shallowRef({name: 'cqc'});  
      // shallowRef 只会对第一层进行响应式 这里如果要对 p.value.name = newValue 的话界面不会跟新
      // 在对其使用triggerRef手动进行刷新后， 界面跟新(每次数据更新都需要手动触发一次)
      let c = ref(1);
      const btnClick = function() {
        testComputed1.value = 'cqc';
        p.value.name = '炒青菜';
        p.value.state = {
          name: 'state',
          c
        }
        if (c.value > 0) {
          c.value--
          triggerRef(p)
        }
      }

      // const inputText = ref('customRef')
      const inputText = useDebounceRef('customRef', 1000);

      const testComputed = computed(() => {
        return inputText.value + '炒青菜'
      })

      const testComputed1 = computed({
        get() {
          return inputText.value + '炒青菜'
        },

        set(newValue) {
          c.value--
          inputText.value = newValue;
        }
      })



      watchEffect((onInvalidate) => {
        // onInvalidate 是一个函数 接收一个回调函数
        // 当副作用即将重新执行， 或者侦听器被停止时候会执行该函数传入的回调函数
        // 可以在传入的回调参数内做一些清理的工作
        onInvalidate(() => {
          // console.log('cqc');
        })
        // console.log('watchEffect', inputText.value);
      })

      return {
        p,
        c,
        btnClick,
        inputText,
        testComputed,
        testComputed1
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>