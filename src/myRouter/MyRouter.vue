<template>
  <div>
    <History-Test />
    <Hash-Test />
  </div>
</template>

<script>
import HashTest from '@/myRouter/HashTest';
import HistoryTest from '@/myRouter/HistoryTest'
  export default {
    components: {
      HashTest,
      HistoryTest
    },
  }
</script>

<style lang="less" scoped>

</style>