<template>
  <div>
    {{ total }}
  </div>
</template>

<script>
  import { useMapGetters } from '@/store/utils'

  export default {
    setup() {
      const myGetters = useMapGetters({ total: 'totalBooksPrice' })

      return {
        ...myGetters
      }
    }
  }
</script>

<style lang="less" scoped>

</style>