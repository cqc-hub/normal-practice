<template>
  <div>
    <Base-Setup 
      :msg="fMsg"
      @setupStart="setupStart"
    />
    <My-Extends />
  </div>
</template>

<script>
import MyExtends from '@/compositionApi/extends/MyExtends'
import BaseSetup from '@/compositionApi/baseSetup/BaseSetup'

  export default {
    data() {
      return {
        fMsg: 'fMsg'
      }
    },

    methods: {
      setupStart(v) {
        v;
      }
    },

    components: {
      MyExtends,
      BaseSetup
    }
  }
</script>

<style lang="scss" scoped>

</style>