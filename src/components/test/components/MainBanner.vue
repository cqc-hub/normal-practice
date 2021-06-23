<template>
  <div>
    <h1>banner start</h1>
    <slot :name="slotName" :data="person"></slot>
    {{person}}
    <h1>banner end</h1>
    <hr/>
    {{
      $attrs
    }}
    <hr/>
  </div>
</template>

<script>
import emitter from '@/utils/eventBus.js';
import {
  computed
} from 'vue';

  export default {
    inject: ['p'],

    data() {
      return {
        slotName: 'slotName',
        person: computed(() => this.p())
      }
    },

    created () {
      emitter.on('cqc', e => {
        console.log(e, 'banner');
      });
    },

  }
</script>

<style lang="scss" scoped>

</style>