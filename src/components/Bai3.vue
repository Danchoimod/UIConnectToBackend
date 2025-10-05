<template>
  <div>
    <h1>{{ greeting }}</h1>
    <button @click="changeGreeting" v-bind:title="greeting">Thay đổi lời chào</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: 'Xin chào bạn!',
    }
  },
  methods: {
    changeGreeting() {
      this.greeting = 'Hello World!'
    },
  },
}
</script>

<style lang="scss" scoped></style>
