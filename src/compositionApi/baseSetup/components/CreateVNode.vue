<script>
  import {
    h,
    ref,
    defineComponent
  } from 'vue';

  const TestSlot = defineComponent({
    render() {
      const {default: defaultSlot, headerSlot } = this.$slots;
      return (
        <div>
          
          <h1>Header {headerSlot && headerSlot()}</h1>
          <div>
            {defaultSlot && defaultSlot('cqc')}
          </div>
        </div>
      )
    }
  })

  export default {

    setup() {
      const counter = ref(0);
      const btnClick = function() {
        counter.value++;
      }
      return () => {
        const buttonProp = {
          onClick: btnClick
        }

        return h('div', [
            <div>
              <button { ...buttonProp }>btn</button>
            </div>
          ,

          <div>{counter.value}</div>,

          <TestSlot >
              {
                {
                  default: props => {
                    return (
                      <h2>default: {props}</h2>
                    )
                  },
                  headerSlot: () => {
                    return (
                      <span>jsx写法</span>
                    )
                  }
                  
                }
              }
          </TestSlot>,

          h(TestSlot, null, {
            default: props => {
              return (
                <div>
                  12456 {props}
                </div>
              )
            },

            headerSlot: () => {
              return (
                <span>
                  炒青菜(h函数写法)
                </span>
              )
            }
          }),

          <TestSlot 
            v-slots={
              {
                default: () => {
                  return (
                    <div>
                      cqc
                    </div>
                  )
                },
                headerSlot: () => {
                  return (
                    <span>v-slots 传入</span>
                  )
                }
              }
            } 
          />
        ])
      }
    }
  }
</script>
