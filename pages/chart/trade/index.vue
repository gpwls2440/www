<template>
  <div id="app">
    <div>
      <router-link to="/chart/trade/machart">이동평균선 차트</router-link>
    </div>
    <HighCandleChart></HighCandleChart>
    <FusionCandleChart></FusionCandleChart>
    <AnyCandleChart></AnyCandleChart>
  </div>
</template>

<script>
import HighCandleChart from './candleChart/HighCandleChart'
import FusionCandleChart from './candleChart/FusionCandleChart'
import AnyCandleChart from './candleChart/AnyCandleChart'

export default {
  components: {
    HighCandleChart,
    FusionCandleChart,
    AnyCandleChart
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
