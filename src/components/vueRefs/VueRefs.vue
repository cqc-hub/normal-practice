<template>
  <div>
    <LoadingCom />
    外层数据: {{msg}}
    <V-Model v-model="msg"   />

    <hr />
    外层数据{{models}}
    <V-Model2 v-model:value="models.value" v-model:title="models.title"  />
  </div>
</template>

<script>
import LoadingCom from '@/components/asyncComponent/components/LoadingCom'
import VModel2 from '@/components/vueRefs/components/VModel2'
import {
  defineAsyncComponent  
} from 'vue';
const VModel = defineAsyncComponent(() => import('./components/VModel.vue'))

  export default {
    data() {
      return {
        msg: 'cqc',
        models: {
          value: 'ss',
          title: 'tt'
        }
      }
    },

    methods: {
      msgChange(e) {
        // this.msg = e;
        console.log(e);
      }
    },

    components: {
      LoadingCom,
      VModel2,
      VModel
    }
  }
</script>