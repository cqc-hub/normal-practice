<template>
  <div>
    <div>
      <button @click="incrementN">+10</button>
    </div>
    {{ counter }}

  </div>
</template>

<script>
import { mapMutations, useStore } from 'vuex';
import { useMapState } from '@/store/utils';


  export default {
    setup() {
      const mapMutaions = mapMutations(['incrementN']);
      const store = useStore();
      const incrementN = function() {
        mapMutaions.incrementN.call({ $store: store }, {n: 10})
      }

      return {
        ...useMapState(['counter']),
        incrementN
      }
    }
    
  }
</script>

<style lang="less" scoped>

</style>