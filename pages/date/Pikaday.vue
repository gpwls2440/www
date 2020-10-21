<template>
  <vue-pikaday v-model="now" :options="options" placeholder="Pick a date" />
</template>

<script>
export default {
  data() {
    return {
      now: null,
      options: {
        format: 'YYYY/MM/DD'
      }
    }
  },
  methods: {}
}
</script>
