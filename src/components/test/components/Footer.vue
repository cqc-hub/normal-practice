<template>
  <div>
    <h2 @click="btnClick" :="$attrs" >footer</h2>
    <button 
      v-for="btn in tabs " 
      :key="btn"
      :class="{active: curr === btn}"
      @click="btnsClick(btn)"
    >
      {{btn}}
    </button>

    <component 
      :is="app"
    />
  </div>
</template>

<script>
import emitter from '@/utils/eventBus.js';

  export default {
    inheritAttrs: false, // 禁用非props attribute

    data() {
      return {
        tabs: ['btn1', 'btn2', 'btn3'],
        curr: 'btn1',
        app: ''
      }
    },

    methods: {
      btnClick() {
        const data =  {name: 'cqc', age: 35}
        this.$emit('btnClick',data);
        emitter.emit('cqc', data)
      },

      btnsClick(btn) {
        this.curr = btn;

      }
    },

    emits: {
      btnClick: (data) => {
        if (data.age < 30) {
          return false   // 返回false并不能阻止事件的派发  但是会在控制台输出警告
        }
        return true
      }
    }
  }
</script>

<style scoped>
.cqc, .active {
  color: red;
}
</style>