<script>
import {
  ref,
  getCurrentInstance
} from 'vue';
  export default {
    setup() {
      const text = ref('cqc');
      const ctx = getCurrentInstance();
      console.log(ctx.appContext.config.globalProperties);
      return () => {
        return (
          <div>
            <input 
              type="number" 
              value={text.value} 
              v-focus={text.value} 
              onChange={e => {
                const {target: {value}} = e;
                text.value = value;
              }}
            />

            <div v-formatter>
              炒青菜
            </div>
          </div>
        )
      }
    },

    directives: {
      focus: {
        mounted(el, bindings) {
          el.focus();
          el.style.backgroundColor = 'red';
          bindings.value;
          // console.log(bindings.value);
        },

        updated(el, bindings) {
          const value = bindings.value;
          el.style.marginLeft = (value || 0)+ 'px';
        }
      },


      formatter: {
        mounted(el) {
          el
          // console.log(el.textContent);
        }
      }
    }
  }
</script>