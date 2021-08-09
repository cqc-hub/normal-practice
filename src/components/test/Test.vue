<template>
  <div>
    <h1>
      gsap
    </h1>
    <Gsap-Js />
    <hr />
    <h1>
      animate.css
    </h1>
    <div class="cqc">
      cqc
    </div>
    <transition
      enter-active-class="animate__animated animate__rubberBand"
      appear
    >
      <div>
        transition enter-active-class
      </div>
    </transition>
    <hr />
    <h1 @click="isAnimationShow = !isAnimationShow">测试动画</h1>
    <transition appear name="cqc" mode="out-in">
      <Test-Animation :class="{
        absoutl: true
      }" v-if="isAnimationShow" />
      <div :class="{
        absoutl: true
      }" v-else>
        cqc
      </div>
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
        <VueRefs ref="cqc" />
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
import TestAnimation from '@/components/test/components/TestAnimation';
import GsapJs from '@/components/animation/GsapJs';
import { defineAsyncComponent } from 'vue';

const VueRefs = defineAsyncComponent(() => import('@/components/vueRefs/VueRefs.vue'))

export default {
  components: {
    Footer,
    MainBanner,
    AsyncComponent,
    VueRefs,
    TestAnimation,
    GsapJs
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

.absoutl {
  position: absolute;
}

.cqc {
  animation: fadeInDown 2s ease infinite;
}

/* 
  from -> active -> to
  开始 -> 持续 -> 结束
*/
.cqc-enter-active
 {
  animation: bounce .6s ease reverse;
}

.cqc-leave-active {
  animation: bounce .5s ease;
}

.cqc-enter-from,
.cqc-leave-to {
  opacity: 0;
}

.cqc-enter-active,
.cqc-leave-active {
  transition: opacity .4s ease;
}


@keyframes bounce {
  0% {
    transform: scale(1);
  }

  30% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(0);
  }
}
</style>
