<template>
  <div>
    <h1>异步组件</h1>
    <suspense>
      <template #default>
        <!-- 默认显示组件 -->
        <Cate-Gory />
      </template>

      <template #fallback>
        <!-- default默认组件还没有加载出来时候显示 -->
        <LoadingCom />
      </template>
    </suspense>
    
  </div>
</template>

<script>
// 通过 import 导入的函数， 后续webpack将会独立打包
const utils = import("@/utils/utils");
import LoadingCom from '@/components/asyncComponent/components/LoadingCom'
import {
  defineAsyncComponent
} from 'vue'
// import CateGory from '@/components/asyncComponent/components/CateGory';

/**
 * todo: defineAsyncComponent  函数
 *  接口
 */
const CateGory = defineAsyncComponent(() => {  // 异步组件 import() 方式加载组件
  return import('@/components/asyncComponent/components/CateGory')
});

/* const CateGory = defineAsyncComponent({
  loader: () => import('@/components/asyncComponent/components/CateGory'),
  loadingComponent: LoadingCom,  // 占位组件 （loader还没加载完成时候显示）
  errorComponent: LoadingCom,  // 错误组件   loader 加载失败
  delay: 2000,  // 在显示loadingComponent之前要等待的事件
  timeout: 3000 //加载组件的时间超过了设定值，将显示错误组件
}) */

  export default {
    created () {
      this.init()
    },

    methods: {
      init() {
        console.log(defineAsyncComponent);
        utils.then(module => {
          const {
            sum 
          } = module

          console.log(sum(6,3));
        })
      }
    },

    components: {
      CateGory,
      LoadingCom
    },
  }
</script>

<style lang="scss" scoped>

</style>