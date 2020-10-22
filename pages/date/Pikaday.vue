<template>
  <vue-pikaday v-model="now" :options="options" placeholder="Pick a date" />
</template>

<script>
export default {
  data() {
    return {
      now: null,
      options: {
        format: 'YYYY/MM/DD',
        minDate: this.$moment().toDate(),
        maxDate: this.$moment().add(7, 'days').toDate()
      }
    }
  },
  methods: {}
}
</script>
