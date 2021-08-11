<template>
  <div>
    <h2 class="counter">{{ myCounter }}</h2>
    <h2 class="counter">{{ myName }}</h2>
  </div>
</template>

<script>
import { useMapState } from '@/store/utils';

  export default {
    name: 'UseVuex',

    setup() {
      const mapState = useMapState({
        myCounter: state => state.counter,
        myName: state => state.name
      })


      return {
        ...mapState
      }
    }
  }
</script>

<style lang="less" scoped>
.counter {
  color: red;
}
</style>