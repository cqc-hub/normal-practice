<template>
  <div id="app">
    <My-Test v-if="flag === '1'" />
    <Composition-Api v-if="flag === '2'" />
    <layout />
  </div>
</template>

<script>
import MyTest from '@/components/test/Test';
import CompositionApi from '@/compositionApi/ComponsitionApi.vue';
import layout from '@/layout/layout'

import {
  provide,
  onMounted,
  ref
} from 'vue';

export default {
  setup() {
    const state = ref({
      counter: {
        counter: 0
      }
    })

    onMounted(() => {
      setInterval(() => {
        state.value.counter.counter++;
      }, 1000);
    })

    provide('state', state)
  },

  data() {
    return {
      flag: '3'
    }
  },

  components: { MyTest, CompositionApi, layout }
}
</script>
<style>
body, * {
  margin: 0;
  padding: 0;
}
</style>