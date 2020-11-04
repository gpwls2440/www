<template>
  <div id="app">
    <div>
      <ChartjsBarChart style="width: 400px; height: 400px"></ChartjsBarChart>
      <AmBarChart style="width: 500px; height: 500px"></AmBarChart>
    </div>
  </div>
</template>

<script>
import ChartjsBarChart from './ChartjsBarChart'
import AmBarChart from './AmBarChart'

export default {
  components: {
    ChartjsBarChart,
    AmBarChart
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
