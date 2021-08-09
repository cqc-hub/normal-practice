<template>
  <div>
    <h2>404</h2>
    <h2>{{route.params.pathMatch}} 没有找到</h2>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
  export default {
    setup() {
      const route = useRoute();
      return {
        route
      }
    }
  }
</script>

<style lang="less" scoped>

</style>