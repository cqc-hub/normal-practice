import {
  ref,
} from 'vue';


export const useScrollPosition = function() {
   const scrollX = ref(0);
   const scrollY = ref(0);

   window.addEventListener('scroll', () => {
       const { scrollX: x, scrollY: y } = window;
       scrollX.value = Math.floor(x);
       scrollY.value = Math.floor(y);
   })

   return {
     scrollY,
     scrollX
   }
}