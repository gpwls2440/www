<template>
  <div id="app">
    <PieChart style="width: 600px"></PieChart>
  </div>
</template>

<script>
import PieChart from './pieChart'

export default {
  components: {
    PieChart
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
