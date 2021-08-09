<script>
import {
  h,
  ref,
  watchEffect
} from 'vue';

import { useScrollPosition } from '@/common/common.js';

  export default {

    setup() {
      const list = ref(null);
      const { scrollY, scrollX } = useScrollPosition();

      watchEffect(() => {
        // console.log(list.value);
      }, {
        flush: 'post'
      })

      return {
        list,
        scrollY,
        scrollX
      }
    },

    render() {
      const arr = Array.from(Array(20), () => 'cqc');
      const UItem = arr.map((o, i) => {
        return h('li',[o, i])
      });
      const UList = h('ul', { ref: 'list' }, UItem);

      const ScrollLabel = h('div', {
        className: 'scrollLabel'
      }, [`(${this.scrollX + ',' + this.scrollY})`]);


      return h(
        'div',
        [
          h('h2', { className: 'container'}, UList),
          ScrollLabel
        ]
      )
    }
  }
</script>

<style lang="less" scoped>

.container {
  width: 2000px;
}
.scrollLabel {
  width: 100px;
  height: 100px;
  background-color: aqua;
  position: fixed;
  right: 10px;
  bottom: 10px;
}
</style>