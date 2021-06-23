<template>
  <div>
    <h1 @click="isAnimationShow = !isAnimationShow">测试动画</h1>
    <transition name="cqc">
      <Test-Animation v-if="isAnimationShow" />
    </transition>

    <Main-Banner :ml="{...p, ml: '$attrs 传入'}">
      <template #slotName="scoped">
        <div>cqc{{scoped.data}}</div>
      </template>
    </Main-Banner>
    {{p}}
    <Footer @btnClick="btnClick" name-cqc="ssscc" class="cqc" />

    <div class="driver_line" />

    <Async-Component />
    
    <suspense>
      <template #default>
        <VueRefs />
      </template>

      <template #fallback>
        <div>正在加载中...</div>
      </template>
    </suspense>
  </div>
</template>

<script >
import Footer from '@/components/test/components/Footer.vue';
import MainBanner from '@/components/test/components/MainBanner.vue';
import AsyncComponent from '@/components/asyncComponent/AsyncComponent';
import TestAnimation from '@/components/test/components/TestAnimation'
import { defineAsyncComponent } from 'vue';

const VueRefs = defineAsyncComponent(() => import('@/components/vueRefs/VueRefs.vue'))

export default {
  components: {
    Footer,
    MainBanner,
    AsyncComponent,
    VueRefs,
    TestAnimation
  },

  provide() {
    return {
      p: () => this.p
    }
  },

  data() {
    return {
      p: {},
      isAnimationShow: true
    }
  },

  methods: {
    btnClick(e) {
      this.p = e;
    }
  }
};
</script>

<style lang="less" scoped>
.driver_line {
  height: 30px;
  width: 100%;
  background-color: antiquewhite;
  margin: 20px 0;
}

.cqc-enter-from,
.cqc-leave-to {
  opacity: 0;
}

.cqc-enter-to,
.cqc-leave-from {
  opacity: 1;
}

.cqc-enter-active,
.cqc-leave-active {
  transition: opacity 1s ease;
}

</style>
