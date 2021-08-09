<template>
  <div>
    <My-Teleport />
    <hr />
    <My-Direcive />
    <hr />
    <Create-VNode />
    <hr />
    <My-Practive />
    <Provide-Inject />
    <Coponent-Life />
    <My-Instance />
    <To-Refs />
    <div id="teleporttest">sssssssssssssssssss</div>

    <hr />
    <div>
      {{toRefsRef}}
    </div>
    {{toRefsInfo.name}}
    -
    {{toRefsInfo.age}}
    -
    {{toRefsInfo.like}}
    <button @click="toRefsInfoBtnClick">btn</button>
    <h1>setup 基本使用</h1>
    <div>
      ref
    </div>
    {{attrs.msg}}
    <button @click="btnClick">btn</button>
    {{counter}}
    <p>
      {{info.counter}}
    </p>
    <div>
      reactive
    </div>
    {{
      state
    }}
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  unref,
  // readonly,
  // isProxy,
  // isReactive
} from 'vue';

import ToRefs from '@/compositionApi/baseSetup/components/ToRefs';
import MyInstance from '@/compositionApi/baseSetup/components/Instance';
import CoponentLife from './components/生命周期.vue';
import ProvideInject from '@/compositionApi/baseSetup/components/Provide&Inject';
import MyPractive from '@/compositionApi/baseSetup/components/MyPractive';
import CreateVNode from '@/compositionApi/baseSetup/components/CreateVNode';
import MyDirecive from '@/compositionApi/baseSetup/components/MyDirecive';
import MyTeleport from '@/compositionApi/baseSetup/components/MyTeleport';

import {
  baseSetup
} from '@/compositionApi/js';
  export default {
    components: { 
      ToRefs,
      MyInstance,
      CoponentLife,
      ProvideInject,
      MyPractive,
      CreateVNode,
      MyDirecive,
      MyTeleport
    },

    // setup 参数
    setup(props, ctx) { 
      const {
        emit,
        attrs
      } = ctx;
      emit('setupStart', { name: 'BaseSetUp' }); // 发射事件

      const toRefsInfo = reactive({
        name: 'cqc',
        age: 25,
        like: {
          lesson: 'comput'
        }
      })

      const toRefsRef = ref('cqc')

      const toRefsInfoBtnClick = function() {
        const {
          age,
          like
        } = toRefs(toRefsInfo);

        age.value++;
        const value = unref(toRefsRef)
        like.value.lesson = '123'
        value

      }

      return {
        attrs,
        ...baseSetup(),
        toRefsInfo,
        toRefsInfoBtnClick,
        toRefsRef,
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>