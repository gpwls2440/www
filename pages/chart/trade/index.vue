<template>
  <div id="app">
    <div></div>
    <HighCandleChart></HighCandleChart>
    <FusionCandleChart></FusionCandleChart>
    <AmCandleChart></AmCandleChart>
  </div>
</template>

<script>
import HighCandleChart from './candleChart/HighCandleChart'
import FusionCandleChart from './candleChart/FusionCandleChart'
import AmCandleChart from './candleChart/AmCandleChart'

export default {
  components: {
    HighCandleChart,
    FusionCandleChart,
    AmCandleChart
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
