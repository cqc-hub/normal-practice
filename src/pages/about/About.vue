<template>
  <div>
    <h2 @click="toHome">about</h2>

    <div>
      {{route.params.name}}
    </div>
  </div>
</template>

<script>
  import {
    useRoute,
    useRouter
  } from 'vue-router';

  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const toHome = function() {
        router.push({
          path: '/home',
        })
      }

      return {
        route,
        toHome
      }
    },
  }
</script>

<style lang="less" scoped>

</style>