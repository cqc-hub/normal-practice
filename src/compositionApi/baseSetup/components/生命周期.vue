<template>
  <div>
    <button @click="btnClick">btn</button>
    <div>{{str}}</div>
  </div>
</template>

<script>
import {
  onMounted,
  onUpdated,
  onUnmounted,
  ref
} from 'vue';

  export default {
    setup() {
      const str = ref('cqc');
      onMounted(() => {
        // console.log('mounted');
        str.value = '炒青菜'
      })

      onUpdated(() => {
        // console.log('update');
      })

      onUnmounted(() => {
        // console.log('unMounted');
      })

      const btnClick = function() {
        str.value += '+'
      }


      return {
        str,
        btnClick
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>