<template>
  <div>
    <button @click="btnClick">btn</button>
    <div>
      {{
      state
    }}
    </div>
  </div>
</template>

<script>
import {
  inject
} from 'vue';

  export default {
    setup() {
      const state = inject('state');

      const btnClick = function() {
        state.value.counter.counter = 0
      }
      return {
        state,
        btnClick
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
