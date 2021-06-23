<template>
  <div>
    <h1>多个v-model</h1>
    <input
      placeholder="model1"
      :value="value"
      @input="valueChange"
    />
    <input
      placeholder="model2"
      :value="title"
      @input="titleChange"
    />
  </div>
</template>

<script>
function getInputValue(e) {
  return e.target.value
}

  export default {
    props: {
      value: {
        type: String,
        default: ''
      },

      title: {
        type: String,
        default: ''
      }
    },

    methods: {
      titleChange(e) {
        this.$emit('update:title', getInputValue(e))
      },

      valueChange(e) {
        this.$emit('update:value', getInputValue(e))
      }
    },
  }
</script>
