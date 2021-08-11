<template>
  <div class="home">
    <h2>home</h2>
    <router-link
      v-slot="linkProps"
     to="/home/one"
     custom
     >
      <!-- <h2 @click="linkProps.navigate">toOne</h2> -->
      <h2 @click="e => linkClick(e, linkProps)">toOne</h2>
    </router-link>
    -
    <router-link to="/home/two">toTwo</router-link>
    <router-link to="/useStore">vuex 用法实例</router-link>

    <router-view />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
  export default {
    setup() {
      const router = useRouter();

      return {
        linkClick(e, linkProps) {
          linkProps
          router.push({
            path: '/About/cqc/25/wz',
            query: {
              queryData: 'queryData'
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;

  a {
    display: block;
  }
}

</style>