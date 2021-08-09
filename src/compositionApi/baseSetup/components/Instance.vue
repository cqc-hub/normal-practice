<template>
  <div>
    <button @click="btnClick">btn</button>
    <h4 ref="title">
      {{ state }}
    </h4>
    <hr />
  </div>
</template>

<script>
import {
  ref,
  reactive,
  watchEffect,
  watch
} from 'vue';
  export default {
    setup() {
      const title = ref(null);

      watchEffect(() => {
        // 组件实例
        // console.log('title', title.value);
      }, {
        flush: 'post'
      })

      const state = reactive({
        name: 'cqc',
        data: {
          io: '/td'
        }
      })

      const stateRef = ref({
        name: 'qqq',
        data: {
        }
      });

      const btnClick = function() {
        // state.name = state.name + '+'
        state.data.io += '+'
        stateRef.value.name +=  'cqc';
        stateRef.value.data.name =  'cqc';
        
      }

      /* 
        watch() 接收两个参数
          参数1：  ref || reactive 对象
            如果是 ref 对象 那么获取到的newValue和oldValue就是value 值的本身
      
      */

      // watch(state, (newValue, oldValue) => {
      //   console.log('new:', newValue);
      //   console.log('old:', oldValue);
      // })

      // watch(() => ({...stateRef.value}), (newValue, oldValue) => {
      //   console.log(newValue, oldValue);
      // })


      // watch([title, () => ({...state})], (newValue, oldValue) => {
      //   console.log(newValue, oldValue);
      // })


      watch(
        () => ({...state}), 
        (newValue, oldValue) => {
          console.log(newValue, oldValue);
        },
        {
          deep: true,
          immediate: false
        }
      )




      return {
        title,
        state,
        btnClick
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>