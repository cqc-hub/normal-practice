<template>
  <div>
    <button @click="incrementAsync({n: 20})">action</button>
    <button @click="btnClick">action2</button>
    <div>
      <h2>{{counter}}</h2>
    </div>
  </div>
</template>

<script>
import { mapActions, useStore } from 'vuex';
import { useMapState } from '@/store/utils';


  export default {
    setup() {
      const { counter } = useMapState(['counter']);
      const actions = mapActions(['incrementAsync']);
      const store = useStore();

      const incrementAsync = actions.incrementAsync.bind({ $store: store });

      const btnClick = function() {
        incrementAsync({ n: 50, db: 1 }).then(res => {
          console.log(res);
        });
      }


      return {
        ...actions,  // { incrementAsync }
        btnClick,
        counter
      }
    }
  }
</script>

<style lang="less" scoped>

</style>