<template>
  <div id="app">
    <PieChart></PieChart>
    <BarChart></BarChart>
  </div>
</template>

<script>
import PieChart from './pieChart'
import BarChart from './barChart'
export default {
  components: {
    PieChart,
    BarChart
  },
  data() {
    return {}
  }
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
