<template>
  <div id="app">
    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
    <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import PieChart from './pieChart'
import BarChart from './barChart'
export default {
  components: {
    PieChart,
    BarChart
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
