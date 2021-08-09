<template>
  <div class='layout'>
    <template v-if="false">
      <router-link 
      to="/home" 
      active-class="cqc-active-link"
      replace
      >
      home
      </router-link>
      -
      <router-link to="/about/cqc">about</router-link>
    </template>

    <router-view v-slot="props">
      <transition
        name="cqc"
        mode="out-in"
      >
      <keep-alive>
        <component :is="props.Component" />
      </keep-alive>
      </transition>
    </router-view>
    <My-Router v-if="false" />
  </div>
</template>

<script>
import MyRouter from '@/myRouter/MyRouter'
  export default {
    name: 'layout',

    components: {
      MyRouter,
    },

  }
</script>

<style lang="less" scoped>

.layout {
  width: 100%;
  height: 100vh;
  .cqc-active-link {
    color: red;
  }
}


.cqc-enter-from,
.cqc-leave-to {
  opacity: 0;
}


.cqc-enter-active,
.cqc-leave-active {
  transition: opacity .3s ease;
}

.cqc-enter-to,
.cqc-leave-from {
  opacity: 1;
}
</style>