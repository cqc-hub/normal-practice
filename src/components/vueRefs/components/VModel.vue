<template>
  <div>
    <h1>单个v-model</h1>
    <div>传入数据: {{modelValue}}</div>
    <input 
      :value="modelValue"
      @input="intputChange"
    />

    <input v-model="value" />
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: String,
        default: ''
      }
    },

    // model: {
    //   prop: "msg",
    //   event: "update:msg",
    // },

    emits: ['update:modelValue'],

    methods: {
      intputChange(e) {
        this.$emit('update:modelValue', e.target.value)
      }
    },

    computed: {
      value: {
        get() {
          return this.modelValue
        },

        set(value) {
          this.intputChange({target: {value}})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>