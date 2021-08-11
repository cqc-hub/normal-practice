<template>
  <div>
    <div>
      <button 
        class="mr8"
        v-for="item in buttonMenu" 
        :key="item.status"
        @click="buttonMenuClick(item)"
      >
        {{item.name}}
      </button>

    </div>

    <Use-Map-State v-if="status === 0" />
    <Use-Getters v-if="status === 1" />
    <Use-Mutations  v-if="status === 2" />
    <Use-Action  v-if="status === 3" />
    <Use-Module v-if="status === 4" />
  </div>
</template>

<script>
import UseMapState from '@/pages/useVuex/components/UseMapState';
import UseGetters from '@/pages/useVuex/components/UseGetters';
import UseMutations from '@/pages/useVuex/components/UseMutations';
import UseAction from '@/pages/useVuex/components/UseAction';
import UseModule from '@/pages/useVuex/components/UseModule';

import { ref } from 'vue';
const USE_VUX_STATUS = 'VuexStatus';
  export default {
    name: 'UseVuex',

    components: {
      UseMapState,
      UseGetters,
      UseMutations,
      UseAction,
      UseModule
    },

    setup() {
      const status = ref(-1);
      const statusHistory = localStorage.getItem(USE_VUX_STATUS);

      const buttonMenu = ref([
        {
          name: 'mapStatus用法',
          status: 0
        },
        {
          name: 'mapGetters用法',
          status: 1
        },
        {
          name: 'mutations用法',
          status: 2
        },
        {
          name: 'action用法',
          status: 3
        },
        {
          name: 'module用法',
          status: 4
        },
      ]);

      const buttonMenuClick = function(item) {
        status.value = item.status;
        localStorage.setItem(USE_VUX_STATUS, item.status)
      }

      if (statusHistory) {
        status.value = statusHistory * 1;
      } else {
        buttonMenuClick(buttonMenu.value[0])
      }



      return {
        status,
        buttonMenu,
        buttonMenuClick
      }
    },

    
  }
</script>
