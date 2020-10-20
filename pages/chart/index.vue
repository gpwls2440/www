<template>
  <div id="app">
    <div>
      <PieChart style="width: 500px; height: 500px"></PieChart>
      <BarChart style="width: 500px; height: 500px"></BarChart>
      <MapChart style="width: 1000px; height: 500px"></MapChart>
      <TradingChart></TradingChart>
      <StockChart></StockChart>
    </div>
  </div>
</template>

<script>
import PieChart from './PieChart'
import BarChart from './BarChart'
import MapChart from './MapChart'
import TradingChart from './trade/TradingChart'
import StockChart from './StockChart'

export default {
  components: {
    PieChart,
    BarChart,
    MapChart,
    TradingChart,
    StockChart
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
