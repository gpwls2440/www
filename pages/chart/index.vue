<template>
  <div id="app">
    <div>
      <MapChart style="width: 800px; height: 500px"></MapChart>
      <SankeyChart style="width: 1000px; height: 500px"></SankeyChart>
      <BubbleChart style="width: 500px; height: 500px"></BubbleChart>
      <HighBubbleChart style="width: 500px; height: 500px"></HighBubbleChart>
    </div>
  </div>
</template>

<script>
import MapChart from './MapChart'
import SankeyChart from './SankeyChart'
import BubbleChart from './BubbleChart'
import HighBubbleChart from './HighBubbleChart'

export default {
  components: {
    MapChart,
    SankeyChart,
    BubbleChart,
    HighBubbleChart
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
