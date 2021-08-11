<template>
  <div>
    <div>
      <button class="mr8" @click="btnClick">btn</button>
      <button @click="btnClick1">模块中的方法调用root方法</button>
    </div>

    <h2>
      <label>取出root的 state 的数据:</label>
      {{$store.state.counter}}
    </h2>

    <h2>
      <label>取出modeleA的 state 的数据:</label>
      {{ homeCounter }}
    </h2>

    <h2>
      <label>取出modeleA的 getters 的数据:</label>
      {{ getName }}
    </h2>
  </div>
</template>

<script>
import { useMapState, useMapGetters } from '@/store/utils';

  export default {
    setup() {

      const moduleAState = useMapState('moduleA', ['homeCounter', 'myName'])
      const moduleAGetters = useMapGetters('moduleA', ['getName'])
      const btnClick = function() {
        console.log(moduleAState);
      }

      const btnClick1 = function() {
        
      }


      return {
        btnClick,
        btnClick1,
        ...moduleAState,
        ...moduleAGetters
      }
    }
  }
</script>

<style lang="less" scoped>

</style>