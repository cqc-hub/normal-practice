import {
    ref,
    reactive,
    readonly,
    isProxy,
    isReactive
} from 'vue';

export const baseSetup = function() {
  const btnClick = function() {
      counter.value++;
      isProxy(counter)
      const a = readonly({
          b: reactive({})
      })
      console.log(isReactive(a));
  };

  const state = reactive({
      name: 'cqc'
  })

  const counter = ref(100);
  const info = reactive({
      counter
  })

  const readonlyInfo = readonly(info);

  return {
            btnClick,
            counter,
            state,
            info,
            readonlyInfo
  }
}